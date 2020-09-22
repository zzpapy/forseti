<?php

namespace App\Controller;

use App\Form\CoefficientGeneralType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AssocieController extends AbstractController
{

    /**
     * @Route("/associe", name="app_associe")
     */
    public function index(Request $request)
    {
        // Récup la scm
        $this->scm = $this->getUser()->getScm();
        // Récup les associés de cette scm
        $assoc = $this->scm->getAssocies();

        if (count($assoc)) { // si on en a : on crée un formulaire pour les coef
            $formArray = [];

            foreach ($assoc as $myAssoc) {
                $formArray['user_' . $myAssoc->getId()] = $this->createForm(CoefficientGeneralType::class)->createView();
            }

            return $this->render('associe/associe.html.twig', [
                'controller_name' => 'AssocieController',
                'assoc_form_list' => $formArray,
            ]);
        } else { // sinon on redirige vers un formulaire de créa des associés
            // TODO
        }


    }
}
