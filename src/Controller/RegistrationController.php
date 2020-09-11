<?php

namespace App\Controller;

use App\Entity\Scm;
use App\Entity\User;
use App\Form\ScmType;
use App\Entity\Config;
use App\Form\ConfigType;
use App\Security\EmailVerifier;
use App\Form\RegistrationFormType;
use Symfony\Component\Mime\Address;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class RegistrationController extends AbstractController
{
    private $emailVerifier;
    private $slugger;

    public function __construct(EmailVerifier $emailVerifier, SluggerInterface $slugger)
    {
        $this->emailVerifier = $emailVerifier;
        $this->slugger = $slugger;
    }

    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        if($this->getUser()){
            return $this->redirectToRoute('home');
        }

        $user = new User();
        $scm = new Scm();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        $formScm = $this->createForm(ScmType::class, $scm);
        $formScm->handleRequest($request);
        $submittedToken = $request->request->get('token');

        if ($form->isSubmitted()) {

            $entityManager = $this->getDoctrine()->getManager();

            $scmLogo = $request->files->get("logo");

            $scm->setLogo($this->recordPhoto($scmLogo, $scm->getCompanyName()));

            $entityManager->persist($scm);

            $users = $scm->getUsers();
            foreach ($users as $key => $assoc) {
                $pass = $assoc->getPassword();

                $postedFiles = $request->files->get('scm');

                $userAvatar = $postedFiles['users']['_' . $key . '_']['picture'];

                $assoc->setPicture($this->recordPhoto($userAvatar, $assoc->getEmail()));

                $assoc->setPassword(
                    $passwordEncoder->encodePassword(
                        $assoc,
                        $pass
                    )
                );
                $entityManager->persist($assoc);
            }

            $userAdminAvatar = $request->files->get("picture");

            $user->setPicture($this->recordPhoto($userAdminAvatar, $user->getEmail()));

            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );
            $user->setRoles(["ROLE_ADMIN"]);
            $user->setScm($scm);
            $entityManager->persist($user);
            $entityManager->flush();

            // generate a signed url and email it to the user
            $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
                (new TemplatedEmail())
                    ->from(new Address('contact@agentom.com', 'Team Forseti'))
                    ->to($user->getEmail())
                    ->subject('Please Confirm your Email')
                    ->htmlTemplate('registration/confirmation_email.html.twig')
            );
            // do anything else you need here, like send an email

            return $this->redirectToRoute('home');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
            'formScm' => $formScm->createView()
        ]);
    }


    /**
     * @Route("/verify/email", name="app_verify_email")
     */
    public function verifyUserEmail(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $exception->getReason());

            return $this->redirectToRoute('app_register');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('app_login');
    }

    /**
     * @param $photo
     * @param string $name
     * @return string $newFilename
     */
    private function recordPhoto($photo, string $name)
    {
        if ($photo) {
            $safeFilenameUser = $this->slugger->slug($name);
            $newFilename = $safeFilenameUser . '-' . uniqid() . '.' . $photo->guessExtension();
            try {
                $photo->move(
                    $this->getParameter('photo'),
                    $newFilename
                );
            } catch (FileException $e) {
            }
            return $newFilename;
        }
        return null;
    }
}
