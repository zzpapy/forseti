<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserAdminType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfileController extends AbstractController
{
    /**
     * @Route("/profile_admin", name="profile_user")
     */
    public function index()
    {
        return $this->render('profile/index.html.twig', [
            'controller_name' => 'ProfileController',
            
        ]);
    }
    /**
     * @Route("/profile/{id<\d+>}", name="profile_admin")
     */
    public function profileAdmin(Request $request,User $user)
    {
        
        $form = $this->createForm(UserAdminType::class, $user);
        $form->remove('password');
        return $this->render('profile/profile_admin.html.twig', [
            'controller_name' => 'ProfileController',
            'form' => $form->createView()
        ]);
    }
}
