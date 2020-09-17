<?php

namespace App\Controller;

use App\Service\ChargeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ChargeType;
use App\Service\BankinApiManager;
use App\Entity\Charge;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class ChargeController extends AbstractController
{

    private $chargeManager;
    private $bankinApiManager;
    private $session;

    public function __construct(ChargeManager $chargeManager, BankinApiManager $bankinApiManager, SessionInterface $session)
    {
        $this->chargeManager = $chargeManager;
        $this->bankinApiManager = $bankinApiManager;
        $this->session = $session;
    }

    /**
     * @Route("/charge", name="app_charge")
     */
    public function index()
    {

        $transactionList = $this->chargeManager->getTransactionToSynchronise('onlyCharge');


        $transactionListKeys = array_keys($transactionList[0]);

        $typeList = $this->getDoctrine()->getRepository(ChargeType::class)->findAll();

        $typeList = $this->orderParentChildChargeType($typeList);

        return $this->render('charge/charge.html.twig', [
            'controller_name' => 'ChargeController',
            'transaction_list' => $transactionList,
            'transaction_list_keys' => $transactionListKeys,
            'type_list' => $typeList
        ]);
    }

    /**
     * @Route("/ajax/chargetype/{transactionid}", name="app_ajax_chargetype_default")
     * @Route("/ajax/chargetype/{transactionid}/{chargetypeid}", name="app_ajax_chargetype")
     */
    public function ajaxChargeType(Request $request)
    {
        $transacId = $request->get('transactionid');
        $chargeTypeId = $request->get('chargetypeid');

        $authToken = $this->session->get('bankin_api_auth_token');
        $transaction = $this->bankinApiManager->getTransaction($authToken, $transacId);

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


        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode([
            'transactionid' => $transacId,
            'chargetypeid' => $chargeTypeId,
            'msg' => "La transaction n°$transacId a bien été catégorisée dans " . $chargeType->getLabel()

        ]));

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
