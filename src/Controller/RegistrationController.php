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

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, SluggerInterface $slugger): Response
    { 
        $user = new User();
        $scm = new Scm();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        $formScm = $this->createForm(ScmType::class, $scm);
        $formScm->handleRequest($request);
        $submittedToken = $request->request->get('token');
        
        if ($form->isSubmitted()) {
            
            $entityManager = $this->getDoctrine()->getManager();
            
            $logo = $request->files->get("logo");
            if ($logo) {
                $originalFilename = pathinfo($logo->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilenameLogo = $safeFilename.'-'.uniqid().'.'.$logo->guessExtension();
                try {
                    $logo->move(
                        $this->getParameter('photo'),
                        $newFilenameLogo
                    );
                } catch (FileException $e) {
                }
                $scm->setLogo($newFilenameLogo);
            }
            $entityManager->persist($scm);
            $users = $scm->getUsers();
            foreach ($users as $assoc) {
                $pass = $assoc->getPassword();
                $avatar = $assoc->getPicture();
                $assoc->setPassword(
                    $passwordEncoder->encodePassword(
                        $assoc,
                        $pass
                        )
                    );
                $entityManager->persist($assoc);
            }
            $photo = $request->files->get("picture");

            if ($photo) {
                $originalFilename = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$photo->guessExtension();
                try {
                    $photo->move(
                        $this->getParameter('photo'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }
                $user->setPicture($newFilename);
            }
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
}
