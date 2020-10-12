<?php

namespace App\Controller;

use App\Entity\Scm;
use App\Entity\User;
use App\Entity\Charge;
use App\Entity\ChargeType;
use App\Form\ChargeFormType;
use App\Service\ChargeManager;
use App\Entity\CoefficientGeneral;
use App\Repository\UserRepository;
use App\Controller\BankinApiController;
use App\Form\CoefficientSpecifiqueType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ChargeController extends BankinApiController
{

    /**
     * @Route("/charge", name="app_charge")
     */
    public function charge(ChargeManager $chargeManager)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $this->reconnectApiUser();
        $transactionList = $chargeManager->getTransactionToSynchronise('onlyCharge');

        if ($transactionList) {
            $transactionListKeys = array_keys($transactionList[0]);

            $typeList = $this->getDoctrine()->getRepository(ChargeType::class)->findAll();

            $typeList = $this->orderParentChildChargeType($typeList);

            return $this->render('charge/charge.html.twig', [
                'controller_name' => 'ChargeController',
                'transaction_list' => $transactionList,
                'transaction_list_keys' => $transactionListKeys,
                'type_list' => $typeList
            ]);
        }else{
            return $this->redirectToRoute('app_charge_dashboard');
        }

    }

    /**
     * @Route("/charge/dashboard", name="app_charge_dashboard")
     *
     */
    public function dashboard(ChargeManager $chargeManager){
        $totalDetail = $chargeManager->calculatePercentCharge();

        $totalDetail2 = $chargeManager->getChargePerMonthPerType();

        $totalTab =[];

        foreach ($totalDetail2 as $key => $typeCharge) {
            $totalTab[$key] = array_sum (  $typeCharge );
        }
        $UserRepository = $products = $this->getDoctrine()->getRepository(User::class);

        $users = $UserRepository->findBy(["scm" => $this->getUser()->getScm()]);

        $usersCoefs = [];

        foreach ($users as $user) {
            $usersCoefs[$user->getId()] = $user->getCoefficientGeneral()->toArray();
        }

        return $this->render('charge/charge_dashboard.html.twig', [
            'controller_name' => 'ChargeController',
            'total_detail_per_type' => $totalDetail,
            'total_detail_per_type_per_month' => $totalDetail2,
            'users' => $users,
            'usersCoefs' => $usersCoefs,
            'totalTab' => $totalTab
        ]);
    }

     /**
     * @Route("/charge/liste-charges/{id}", name="app_charge_list")
     *
     */
    public function ChargeList(Scm $scm){
        $charges = $this->getDoctrine()->getRepository(Charge::class)->findBy([
            "scm" => $scm
        ]);

        return $this->render('charge/charge_list.html.twig', [
            'charges' => $charges
        ]);
    }

     /**
     * @Route("/charge/modif-charge/{id}", name="app_charge_update")
     *
     */
    public function ChargeUpdate(Charge $charge, Request $request){
       
            $formCharge = $this->createForm(ChargeFormType::class, $charge);
            $scmSess = $this->session->set("scm",$this->getUser()->getScm());
            $formCharge->handleRequest($request);
            
            if ($formCharge->isSubmitted() && $formCharge->isValid()) {
                
                $entityManager = $this->getDoctrine()->getManager();
                dump(count($formCharge->getData()->getCoefficientSpecifiques()));
                
                foreach ($formCharge->getData()->getCoefficientSpecifiques() as $value) {
                    $entityManager->persist($value);
                }
    
                $entityManager->persist($charge);
                $entityManager->flush();
                return $this->redirectToRoute('app_charge_list', ['id' => $this->getUser()->getScm()->getId()]);
            }
        return $this->render('charge/charge_update.html.twig', [
            'charge' => $charge,
            'formCharge' => $formCharge->createView()
        ]);
    }

    /**
     * @Route("/ajax/chargetype/{transactionid}", name="app_ajax_chargetype_default")
     * @Route("/ajax/chargetype/{transactionid}/{chargetypeid}", name="app_ajax_chargetype")
     * @Route("/ajax/chargetype/{transactionid}/{chargetypeid}/{all}", name="app_ajax_chargetype")
     */
    public function ajaxChargeType(Request $request, ChargeManager $chargeManager)
    {
        $transacId = $request->get('transactionid');
        $chargeTypeId = $request->get('chargetypeid');
        $all = $request->get('all');

        $authToken = $this->session->get('bankin_api_auth_token');

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $transaction = $this->bankinApiManager->getTransaction($authToken, $transacId);

        if ($all) {
            $transactions = $chargeManager->getTransactionToSynchronise('onlyCharge');

            $rowToDelete = [];

            foreach ($transactions as $transac) {
                if ($transac['description'] == $transaction['description']) {
                    $scm = $this->getUser()->getScm();
                    $chargeType = $this->getDoctrine()->getRepository(ChargeType::class)->find($chargeTypeId);

                    $charge = new Charge();

                    $charge->setScm($scm);
                    $charge->setBankAccount($scm->getBankAccount());
                    $charge->setBankinTransactionId($transac['id']);
                    $charge->setLabel($transac['description']);
                    $charge->setPayedAt(new \DateTime($transac['date']));
                    $charge->setTotal($transac['amount']);
                    $charge->setType($chargeType);
                    $charge->setCreatedAt(new \DateTime());

                    $em = $this->getDoctrine()->getManager();

                    $em->persist($charge);
                    $em->flush();

                    $rowToDelete[] = $transac['id'];
                }
            }
            $response->setContent(json_encode([
                'count' => count($transactions) - count($rowToDelete),
                'transactionids' => $rowToDelete,
                'chargetypeid' => $chargeTypeId,
                'msg' => "La transaction n°$transacId et ses occurences ont bien été catégorisées dans '" . $chargeType->getLabel() . "'"

            ]));
        } else {
            $scm = $this->getUser()->getScm();
            $chargeType = $this->getDoctrine()->getRepository(ChargeType::class)->find($chargeTypeId);

            $charge = new Charge();

            $charge->setScm($scm);
            $charge->setBankAccount($scm->getBankAccount());
            $charge->setBankinTransactionId($transacId);
            $charge->setLabel($transaction['description']);
            $charge->setPayedAt(new \DateTime($transaction['date']));
            $charge->setTotal($transaction['amount']);
            $charge->setType($chargeType);
            $charge->setCreatedAt(new \DateTime());

            $em = $this->getDoctrine()->getManager();

            $em->persist($charge);
            $em->flush();

            $response->setContent(json_encode([
                'transactionid' => $transacId,
                'chargetypeid' => $chargeTypeId,
                'msg' => "La transaction n°$transacId a bien été catégorisée dans " . $chargeType->getLabel()

            ]));
        }


        return $response;
    }
    
    private function orderParentChildChargeType($typeList)
    {
        foreach ($typeList as $key => $type) {
            if ($type->getLevel() > 1) {
                $parentId = $type->getParentType()->getId();
                if (is_array($typeList[$parentId - 1])) {
                    $typeList[$parentId - 1]['children'][] = $type;
                } else {
                    $typeList[$parentId - 1] = [
                        $typeList[$parentId - 1],
                        'children' => [$type],

                    ];
                }
                unset($typeList[$key]);
            }
        }
        return $typeList;
    }
}
