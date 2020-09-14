<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserAdminType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class ProfileController extends AbstractController
{

    private $slugger;

    public function __construct( SluggerInterface $slugger)
    {
        $this->slugger = $slugger;
    }
   
    /**
     * @Route("/profile/{id<\d+>}", name="profile")
     */
    public function index(Request $request,User $user)
    {
        if($this->getUser()->getId() != $request->get("id")){
            return $this->redirectToRoute('app_logout');
        }
        $form = $this->createForm(UserAdminType::class, $user);
        $form->remove('password');
        $form->add('submit', SubmitType::class, array('label' => 'envoyer'));
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userPicture = $request->files->get("user_admin")["picture"];
            // dd($request->files->get("user_admin")["picture"]);

            $user->setPicture($this->recordPhoto($userPicture, $user->getEmail()));
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
        }
        return $this->render('profile/profile.html.twig', [
            'controller_name' => 'ProfileController',
            'form' => $form->createView()
        ]);
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
