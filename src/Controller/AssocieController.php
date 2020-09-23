<?php

namespace App\Controller;

use App\Entity\CoefficientGeneral;
use App\Entity\User;
use App\Form\CoefficientGeneralType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
        $allUsers = $this->scm->getUsers()->getValues();

        if (count($assoc)) { // si on en a : on crée un formulaire pour les coef

            //on init tab pour forms traitement
            $formArray = [];

            //on init un tab pour les forms views
            $formArrayView = []; 
            
            
            //on crée le form pour chaque assoc
            foreach ($assoc as $myAssoc) {
                //on stock le form
                $formArray['user_' . $myAssoc->getId()] = $this->createForm(CoefficientGeneralType::class);

                //on récupère le post si il y en a
                $formArray['user_' . $myAssoc->getId()]->handleRequest($request);

                //on stock le form au bon format pour l'affichage
                $formArrayView['user_' . $myAssoc->getId()] = $formArray['user_' . $myAssoc->getId()]->createView();
            }
            
            if(null !== $request->request->get("user_id")){ //on vérif si ev post existe
                $user_id = $request->request->get("user_id");

                //on récupère l'id de l'user pour récupérer l'objet user
                $id = intval(str_replace("user_", "", $user_id));

                //on récupére l'objet user
                $user = $this->getDoctrine()->getRepository(User::class)->find($id);

                
                //on récupére l'éventuelle collection de coefs que l'on formate en tableau
                $collectionCoefs = $user->getCoefficientGeneral()->filter(function($element) {
                                    return $element;
                                });
                if ($formArray[$user_id]->isSubmitted() && $formArray[$user_id]->isValid()) {
                    
                    if(count($collectionCoefs)){//si collection

                        //on formate en tableau la collection
                        $collectionCoefs = $collectionCoefs->getValues();

                        //on génére un tableau de clés du tableau assoc de données du form
                        $keys = array_keys($formArray[$user_id]->getData());
                        foreach ($collectionCoefs as $key => $coefficientGeneral) {

                            //on récupérela valeure du mois pour récupérer la nouvelle valeure du post
                            $index = date_format($coefficientGeneral->getMonth(), "n");
                            
                            
                            //on vérifie que la nouvelle valeure est différente de l'actuelle
                            if($formArray[$user_id]->getData()[$keys[$index-1]] != $coefficientGeneral->getCoefficient()){
                                //si nouvelle valeure on update le coefficient en récupérant la nouvelle valeure par son index
                                $coefficientGeneral->setCoefficient($formArray[$user_id]->getData()[$keys[$index-1]]);
                                //on stock en bdd
                                $em = $this->getDoctrine()->getManager();
                                $em->persist($coefficientGeneral);
                                $em->flush();
                            }
                        }
                    }
                    else{

                        //on init un index pour générer le mois en int
                        $index = 1;
                        foreach ($formArray[$user_id]->getData() as $coefficientGeneralRow) {
    
                            //on crée un nouvel objet CoefficientGeneral
                            $coefficientGeneral = new CoefficientGeneral();
    
                            //on format le mois en DateTime
                            $dateObj   = \DateTime::createFromFormat('m', $index);
    
                            //on set l'objet CoefficientGeneral
                            $coefficientGeneral->setCoefficient($coefficientGeneralRow);
                            $coefficientGeneral->setMonth($dateObj);
                            $coefficientGeneral->setUser($user);
    
                            //on stock en bdd
                            $em = $this->getDoctrine()->getManager();
                            $em->persist($coefficientGeneral);
                            $em->flush();
                            $index++;
                        }
                    }
                    return $this->redirectToRoute('app_associe');
                    
                }
            }
            $tabCoefsUsers = [];
            foreach ($assoc as $key => $ceoffsuser) {
                $listCeoffsuser = $ceoffsuser->getCoefficientGeneral();
                $listCeoffsuser = $listCeoffsuser->filter(function($element) {
                    return $element;
                });
                $listCeoffsuser = $listCeoffsuser->getValues();
                $tabCoefsUsers[$key] = $listCeoffsuser;
                // dump($listCeoffsuser);
            }
            // dd($assoc);

            return $this->render('associe/associe.html.twig', [
                'controller_name' => 'AssocieController',
                'assoc_form_list' => $formArrayView,
                'tabAssoc' =>$tabCoefsUsers,
                'allUsers' =>$allUsers
            ]);
        } else { // sinon on redirige vers un formulaire de créa des associés
            // TODO
        }


    }
}