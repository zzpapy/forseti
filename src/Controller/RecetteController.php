<?php

namespace App\Controller;

use App\Entity\Scm;
use App\Entity\User;
use App\Entity\Recette;
use App\Form\RecetteType;
use App\Service\ChargeManager;
use App\Service\RecetteManager;
use App\Controller\BankinApiController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RecetteController extends BankinApiController
{
    /**
     * @Route("/recette", name="app_recette")
     */
   
        public function recette(ChargeManager $chargeManager)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $this->reconnectApiUser();
        $transactionList = $chargeManager->getTransactionToSynchronise('onlyRecette');
        $userRep = $this->getDoctrine()->getRepository(User::class);
        $users = $userRep->findBy([
            "scm" => $this->getUser()->getScm()->getId()
        ]);
        if ($transactionList) {
            $transactionListKeys = array_keys($transactionList[0]);

            return $this->render('recette/recette.html.twig', [
                'transaction_list' => $transactionList,
                'transaction_list_keys' => $transactionListKeys,
                "users" => $users
            ]);
        }else{
            return $this->redirectToRoute('app_recette_dashboard');
        }

    }

    /**
     * @Route("/recette/liste-recette/{id}", name="app_recette_list")
     *
     */
    public function RecetteList(Scm $scm){
        $recettes = $this->getDoctrine()->getRepository(Recette::class)->findBy([
            "scm" => $scm
        ]);
            // dd($recettes);
            foreach ($recettes as $key => $value) {
                // dd($value->getUser()->getFirstName());
            }
        return $this->render('recette/recette_list.html.twig', [
            'recettes' => $recettes
        ]);
    }

     /**
     * @Route("/recette/modif-recette/{id}", name="app_recette_update")
     *
     */
    public function ChargeUpdate(Recette $recette, Request $request){
        $formRecette = $this->createForm(RecetteType::class, $recette);
       
        $formRecette->handleRequest($request);
        
        if ($formRecette->isSubmitted() && $formRecette->isValid()) {
            
               
            $entityManager = $this->getDoctrine()->getManager();
            
            
            $entityManager->persist($recette);
            $entityManager->flush();
            return $this->redirectToRoute('app_recette_list', ['id' => $this->getUser()->getScm()->getId()]);
        }
        
    return $this->render('recette/recette_update.html.twig', [
        'recette' => $recette,
        'formRecette' => $formRecette->createView()
    ]);
}

    /**
     * @Route("/recette/dashboard", name="app_recette_dashboard")
     *
     */
    public function dashboard(RecetteManager $recetteManager){
        $scm = $this->getUser()->getScm();

        $totalRecetteUsers = $recetteManager->getTotalRecetteUsers($scm);
        $totalRecetteNullUser = $recetteManager->getTotalRecetteNullUsers($scm);
        $totalRecetteNullUser[0]["id"] = 0;
        $totalRecetteNullUser[0]["firstname"] = "Non attribué";
        array_push($totalRecetteUsers,$totalRecetteNullUser[0]);
        return $this->render('recette/recette_dashboard.html.twig', [
            "totalRecetteUsers" => $totalRecetteUsers,
        ]);
    }

      /**
     * @Route("/ajax/user_recette/{transactionid}", name="app_ajax_user_recette_default")
     * @Route("/ajax/user_recette/{transactionid}/{user_id}", name="app_ajax_user_recette")
     * @Route("/ajax/user_recette/{transactionid}/{user_id}/{all}", name="app_ajax_user_recette")
     */
    public function ajaxuser_recette(Request $request, RecetteManager $recetteManager,ChargeManager $chargeManager)
    {
        $userRep = $this->getDoctrine()->getRepository(USER::class);
        $all = $request->get('all');
        $scm = $this->getUser()->getScm();
        $userId = $request->get('user_id');
        $transacId = $request->get('transactionid');
        $user = $userRep->find($userId);
        $authToken = $this->session->get('bankin_api_auth_token');
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $transaction = $this->bankinApiManager->getTransaction($authToken, $transacId);

        $authToken = $this->session->get('bankin_api_auth_token');
        if($all){
            $description = $request->get('description');
            $transactions = $chargeManager->getTransactionToSynchronise('onlyRecette');
            
            $user = $userRep->find($userId);
            $rowToDelete = [];
            foreach ($transactions as $transac) {
                // dd($transac);
                if ($transac['description'] == $description) {
                    $scm = $this->getUser()->getScm();

                    $recette = new Recette();

                    $recette->setUser($user);
                    $recette->setBankinTransactionId($transac["id"]);
                    $recette->setTotal($transac["amount"]);
                    $recette->setLabel($description);
                    $recette->setScm($scm);
                    $em = $this->getDoctrine()->getManager();
                    if(null == $user){
                        $mess = "à bien stockée";
                    }
                    else{
                        if($user){
                            $mess = " a bien été attribué à ".$user->getFirstName()." ".$user->getLastname();
                        }
                        else{
                            $mess = " a bien été attribué stcockée sans attribution. ";
                        }
                    }

                    $em = $this->getDoctrine()->getManager();

                    $em->persist($recette);
                    $em->flush();

                    $rowToDelete[] = $transac['id'];
                }
            }
            if($user){
                $message = "La transaction n°$transacId et ses occurences ont bien été attribuées à ".$user->getFirstName()." ".$user->getLastName();
            }
            else{
                $message = "La transaction n°$transacId et ses occurences ont bien été stockées sans attributions.";
            }
            $response->setContent(json_encode([
                'count' => count($transactions) - count($rowToDelete),
                'transactionids' => $rowToDelete,
                'msg' => $message

            ]));
            return $response;
            
        }
        else{
                $recette = new Recette();
        
                $recette->setUser($user);
                $recette->setBankinTransactionId($transacId);
                $recette->setTotal($transaction["amount"]);
                $recette->setLabel($transaction["description"]);
                $recette->setScm($scm);
                $em = $this->getDoctrine()->getManager();
                if(null == $user){
                    $mess = "à bien stockée";
                }
                else{
                    $mess = " a bien été attribué à ".$user->getFirstName()." ".$user->getLastname();
                }
                $em->persist($recette);
                $em->flush();
        
                $rowToDelete = $transaction['id'];
        
                $response->setContent(json_encode([
                    'transactionid' => $transacId,
                    'userId' => $userId,
                    'msg' => "La transaction n°$transacId : " . $recette->getLabel() .$mess
        
                ]));
                return $response;
            }    
        }
}
