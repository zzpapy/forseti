<?php

namespace App\Controller;

use App\Entity\Scm;
use App\Entity\User;
use App\Form\UserAdminType;
use App\Entity\CoefficientGeneral;
use App\Form\CoefficientGeneralType;
use App\Repository\ChargeRepository;
use App\Controller\RegistrationController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CoefficientGeneralRepository;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AssocieController extends RegistrationController
{

    /**
     * @Route("/associe", name="app_associe")
     */
    public function index(Request $request, CoefficientGeneralRepository $coeffRepo, ChargeRepository $chargeRepo)
    {
        // Récup la scm
       $response = new Response;
        $this->scm = $this->getUser()->getScm();
        //tableau des mois

        $moisTab = ["","Janvier","Février","Mars","Avril","Mai","Juin","juillet","Août","septembre","Octobre","Novembre","Décembre"];
        // Récup les associés de cette scm
        $assoc = $this->scm->getAssocies();
        $allUsers = $this->scm->getUsers()->getValues();

        //on récup le total des coefs des users
        $totalCoeffUsersPerMonth = $coeffRepo->getTotalUserCoefPerMonth($this->scm,$this->getUser());
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
                $error = "";
                if ($formArray[$user_id]->isSubmitted() && $formArray[$user_id]->isValid()) {
                    
                    if(count($collectionCoefs)){//si collection
                        
                        //on vérifiei si il ya une valeur négative ds le post
                        if(min($formArray[$user_id]->getData()) < 0){
                            $response->setContent(json_encode([
                                "error" => "Coefficient négatif impossible",
                            ]));
                            return $response;
                        }
                        //on formate en tableau la collection
                        $collectionCoefs = $collectionCoefs->getValues();
                        //on génére un tableau de clés du tableau assoc de données du form
                        $keys = array_keys($formArray[$user_id]->getData());
                        $bool = false;
                        $coeff = [];
                        foreach ($collectionCoefs as $key => $coefficientGeneral) {

                            //on récupére la valeure du mois pour récupérer la nouvelle valeure du post
                            $index = date_format($coefficientGeneral->getMonth(), "n");
                            
                            $totalCoeff = $totalCoeffUsersPerMonth[$index-1]["total"];
                            //on vérifie que la nouvelle valeur est différente de l'actuelle
                            
                            if($formArray[$user_id]->getData()[$keys[$index-1]] != $coefficientGeneral->getCoefficient()){
                                //vérif si le total des coef est sup à 100           
                                if(($totalCoeff - $coefficientGeneral->getCoefficient()) + $formArray[$user_id]->getData()[$keys[$index-1]] <= 100 && $formArray[$user_id]->getData()[$keys[$index-1]] >= 0){
                                    $coefficientGeneral->setCoefficient($formArray[$user_id]->getData()[$keys[$index-1]]);
                                }
                                else{//on génere une erreur
                                    $reste = 100 - $totalCoeff;
                                    $pluriel = $totalCoeff > 1 ? "s" : "";
                                    $coefficientGeneral->setCoefficient(0);
                                    if($formArray[$user_id]->getData()[$keys[$index-1]] < 0){
                                        $error = "coefficient negatif impossible";
                                        }
                                        else{
                                            $mois = $moisTab[date_format($coefficientGeneral->getMonth(), "n")];
                                            $error = "le coefficient du mois de ". $mois." est trop élevé";
                                        }
                                }
                                $bool = true;
                                //si nouvelle valeur on update le coefficient en récupérant la nouvelle valeure par son index
                                //on stock en bdd
                                $em = $this->getDoctrine()->getManager();
                                $em->persist($coefficientGeneral);
                                $em->flush();
                            }
                            //on génère un tableau avec tous les coeff de l'user pout la réponse
                            $coeff[$index] =[
                                "month" => $coefficientGeneral->getMonth(),
                                "coeff" => $coefficientGeneral->getCoefficient(),
                                "success" => 'mise à jour réalisée avec succés !!!',
                                "user_id" => $user_id
                            ];
                           
                        }
                        //on vérif si $bool false (pas de modification) on retourne les errurs
                        if($bool == false){
                            $response->setStatusCode(Response::HTTP_NOT_FOUND);
                            $response->setContent(json_encode([
                                "error" => "Aucune modification",
                            ]));
                            return $response;
                        }
                        //si erreur on retourne erreur
                        $totalCoeffUsersPerMonth = $coeffRepo->getTotalUserCoefPerMonth($this->scm,$this->getUser());
                        $totalChargePerMonth = $chargeRepo->getTotalChargePerMonth($this->scm,'2020-01601','2020-12-31');
                        if($error != ""){
                            $response->setStatusCode(Response::HTTP_NOT_FOUND);
                            $response->setContent(json_encode([
                                "coeff" => $coeff,
                                "totalCoeff" => $totalCoeffUsersPerMonth,
                                "error" => $error,
                                "totalChargeMonth" => $totalChargePerMonth
                            ]));
                            return $response;
                        }
                        $response->setContent(json_encode([
                            "coeff" => $coeff,
                            "success" => 'mise à jour réalisée avec succés !!!',
                            "totalCoeff" => $totalCoeffUsersPerMonth,
                            "totalChargeMonth" => $totalChargePerMonth
                        ]));
                        return $response;
                    }
                    else{

                        //on init un index pour générer le mois en int
                        $index = 1;
                        foreach ($formArray[$user_id]->getData() as $coefficientGeneralRow) {
                           
                            if(min($formArray[$user_id]->getData()) < 0){
                                $response->setStatusCode(Response::HTTP_NOT_FOUND);
                                $response->setContent(json_encode([
                                    "error" => "Coefficient négatif impossible",
                                ]));
                                return $response;
                            }
                            //on vérif qu'il n'ya pas de valeure neg ds le post
                            //on crée un nouvel objet CoefficientGeneral
                            $coefficientGeneral = new CoefficientGeneral();
                            
                            //on format le mois en DateTime
                            $dateObj   = \DateTime::createFromFormat('m', $index);
                            
                            $totalCoeff = $totalCoeffUsersPerMonth;
                            
                            //on vérif si il ya déjà des coefs entregistrés
                            if(count($totalCoeff)){
                                $totalCoeff = $totalCoeff[$index-1]["total"];
                                //on set l'objet CoefficientGeneral si positif et total inf à 100
                                if($totalCoeff + $coefficientGeneralRow <= 100 && $coefficientGeneralRow >= 0){
                                    $coefficientGeneral->setCoefficient($coefficientGeneralRow);
                                }
                                else{
                                    $coefficientGeneral->setCoefficient(0);
                                    if($totalCoeff + $coefficientGeneralRow <= 100 && $coefficientGeneralRow < 0){
                                        $error = "coefficient negatif impossible";
                                        }
                                        else{
                                            $mois = $moisTab[date_format($dateObj, "n")];
                                            $error = "le coefficient du mois de ". $mois."est trop élevé";
                                        }
                                }
                            }
                            elseif($coefficientGeneralRow <= 100 && $coefficientGeneralRow >= 0){
                                $coefficientGeneral->setCoefficient($coefficientGeneralRow);
                            }
                            else{                                    
                                $coefficientGeneral->setCoefficient(0);
                                if($totalCoeff + $coefficientGeneralRow <= 100 && $coefficientGeneralRow < 0){
                                    $error = "coefficient negatif impossible";
                                }
                                else{
                                    $mois = $moisTab[date_format($dateObj, "n")];
                                    $error = "le coefficient du mois de ". $mois." est trop élevé";
                                }
                            }
                           
                            $coefficientGeneral->setMonth($dateObj);
                            $coefficientGeneral->setUser($user);
                            
                            //on stock en bdd
                            $em = $this->getDoctrine()->getManager();
                            $em->persist($coefficientGeneral);
                            $em->flush();

                            //on génère un tableau avec tous les coeff de l'user pout la réponse
                            $coeff[$index] =[
                                "month" => $coefficientGeneral->getMonth(),
                                "coeff" => $coefficientGeneral->getCoefficient(),
                                "user_id" => $user_id
                            ];
                            $index++;
                            
                        }
                        //on récupère la liste des sommes des coeffs mise à jour
                        $totalCoeffUsersPerMonth = $coeffRepo->getTotalUserCoefPerMonth($this->scm,$this->getUser());
                        $totalChargePerMonth = $chargeRepo->getTotalChargePerMonth($this->scm,'2020-01601','2020-12-31');
                        //gestion des erreurs
                        if($error != ""){
                            $response->setStatusCode(Response::HTTP_NOT_FOUND);
                            $response->setContent(json_encode([
                                "coeff" => $coeff,
                                "totalCoeff" => $totalCoeffUsersPerMonth,
                                "error" => $error,
                                "totalChargeMonth"
                            ]));
                            return $response;
                        }
                        $response->setContent(json_encode([
                            "coeff" => $coeff,
                            "totalCoeff" => $totalCoeffUsersPerMonth,
                            "success" => 'success', 'mise à jour réussie !!!',
                            "totalChargeMonth"
                        ]));
                        return $response;
                    }
                    
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
            }

            $totalChargePerMonth = $chargeRepo->getTotalChargePerMonth($this->scm,'2020-01601','2020-12-31');
            
            return $this->render('associe/associe.html.twig', [
                'controller_name' => 'AssocieController',
                'assoc_form_list' => $formArrayView,
                'tabAssoc' => $tabCoefsUsers,
                'allUsers' => $allUsers,
                'totalChargeMonth' => $totalChargePerMonth,
                'totelCoeffsPerMonth' => $totalCoeffUsersPerMonth
            ]);
        } else { // sinon on redirige vers un formulaire de créa des associés
            return $this->redirectToRoute('app_associe_create_user', ['id' => $this->scm->getId()]);
        }


    }

    /**
     * @Route("/associe/create/{id<\d+>}", name="app_associe_create_user")
     */
    public function createUser(Request $request, UserPasswordEncoderInterface $passwordEncoder, Scm $scm)
    {
        // dd($scm);
        $user = new User();
        $form = $this->createForm(UserAdminType::class, $user);
        $form->add('submit', SubmitType::class, array('label' => 'Valider'));
        $form->handleRequest($request);
        // dd($form->get("password"));
        if ($form->isSubmitted() && $form->isValid()){
            $pass = $form->get("password")->get("first")->getData();
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $pass
                    )
                );
                // dd($pass);
            $userPicture = $request->files->get("picture");
            if (!is_null($userPicture)) {
                $user->setPicture($this->recordPhoto($userPicture, $user->getEmail()));
            }
            $user->setScm($scm);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->redirectToRoute('app_associe');
        }
        return $this->render('associe/create_user.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
