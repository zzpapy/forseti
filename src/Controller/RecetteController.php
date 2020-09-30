<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Recette;
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
            "totalRecetteNullUser" => $totalRecetteNullUser
        ]);
    }

      /**
     * @Route("/ajax/user_recette/{transactionid}", name="app_ajax_user_recette_default")
     * @Route("/ajax/user_recette/{transactionid}/{user_id}", name="app_ajax_user_recette")
     * @Route("/ajax/user_recette/{transactionid}/{user_id}/{all}", name="app_ajax_user_recette")
     */
    public function ajaxuser_recette(Request $request, RecetteManager $recetteManager)
    {
        $transacId = $request->get('transactionid');
        $userId = $request->get('user_id');
        $all = $request->get('all');
        $userRep = $this->getDoctrine()->getRepository(USER::class);
        $user = $userRep->find($userId);
        $scm = $this->getUser()->getScm();
        
        $authToken = $this->session->get('bankin_api_auth_token');
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        
        $transaction = $this->bankinApiManager->getTransaction($authToken, $transacId);
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
