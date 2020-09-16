<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserAdminType;
use App\Form\ChangePasswordFormType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ProfileController extends RegistrationController
{
    /**
     * @Route("/profile/{id<\d+>}", name="app_profile")
     */
    public function index(Request $request, User $user, UserPasswordEncoderInterface $passwordEncoder)
    {
        if ($this->getUser()->getId() != $request->get("id")) {
            return $this->redirectToRoute('app_logout');
        }
        $form = $this->createForm(UserAdminType::class, $user);

        $form->remove('email');
        $form->remove('password');

        $form->add('submit', SubmitType::class, array('label' => 'Valider'));

        $form->handleRequest($request);

        $passForm = $this->createForm(ChangePasswordFormType::class, null);

        $passForm->add('submit', SubmitType::class, array('label' => 'Valider'));

        $passForm->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $userPicture = $request->files->get("picture");
            if (!is_null($userPicture)) {
                $user->setPicture($this->recordPhoto($userPicture, $user->getEmail()));
            }
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->redirectToRoute('app_profile', ['id' => $user->getId()]);
        }
        if ($passForm->isSubmitted() && $passForm->isValid()) {
            $encodedPassword = $passwordEncoder->encodePassword(
                $user,
                $passForm->get('password')->getData()
            );

            $user->setPassword($encodedPassword);
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('app_profile', ['id' => $user->getId()]);
        }

        $scmEntity = $user->getScm();

        return $this->render('profile/profile.html.twig', [
            'controller_name' => 'ProfileController',
            'edit_profile' => $form->createView(),
            'edit_password' => $passForm->createView(),
            'scm' => $scmEntity
        ]);
    }

}
