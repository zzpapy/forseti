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
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

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
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = new User();
        $scm = new Scm();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        $formScm = $this->createForm(ScmType::class, $scm);
        $formScm->handleRequest($request);
        $submittedToken = $request->request->get('token');
        
        if ($form->isSubmitted() && $this->isCsrfTokenValid('register', $submittedToken)) {
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($scm);
            $users = $scm->getUsers();
            foreach ($users as $assoc) {
                $pass = $assoc->getPassword();
                $assoc->setPassword(
                    $passwordEncoder->encodePassword(
                        $assoc,
                        $pass
                        )
                    );
                $entityManager->persist($assoc);
                // dd($assoc);
            }
            // $entityManager->flush();
            
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
     * @Route("/registerUser", name="app_register_user")
     */
    public function registerUser(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // generate a signed url and email it to the user
            // $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
            //     (new TemplatedEmail())
            //         ->from(new Address('contact@agentom.com', 'Team Forseti'))
            //         ->to($user->getEmail())
            //         ->subject('Please Confirm your Email')
            //         ->htmlTemplate('registration/confirmation_email.html.twig')
            // );
            // do anything else you need here, like send an email

            return $this->redirectToRoute('home');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
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
