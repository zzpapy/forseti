<?php

namespace App\Controller;

use App\Entity\Scm;
use App\Form\ScmType;
use App\Controller\RegistrationController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ScmController extends RegistrationController
{
    /**
     * @Route("/scm/{id<\d+>}", name="app_scm")
     */
    public function index( Request $request, Scm $scm = null)
    {

        // dd($scm);
        $formScm = $this->createForm(ScmType::class, $scm);
        $formScm->remove("users");
        $formScm->handleRequest($request);

        if ($formScm->isSubmitted() && $formScm->isValid()) {

            $entityManager = $this->getDoctrine()->getManager();

            $scmLogo = $request->files->get("logo");

            if (!is_null($scmLogo)) {
                $scm->setLogo($this->recordPhoto($scmLogo, $scm->getCompanyName()));
            }

            $entityManager->persist($scm);

        }
        return $this->render('scm/index.html.twig', [
            'controller_name' => 'ScmController',
            'formScm' => $formScm->createView()
        ]);
    }
}
