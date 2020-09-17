<?php

namespace App\Controller;

use App\Service\ChargeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ChargeType;

class ChargeController extends AbstractController
{

    private $chargeManager;

    public function __construct(ChargeManager $chargeManager)
    {
        $this->chargeManager = $chargeManager;
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
    public function ajaxChargeType(Request $request){
        $transacId = $request->get('transactionid');
        $chargeTypeId = $request->get('chargetypeid');
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode(['transactionid' => $transacId, 'chargetypeid'=> $chargeTypeId]));

        return $response;
    }

    private function orderParentChildChargeType($typeList){
        foreach ($typeList as $key => $type){
            if($type->getLevel() > 1){
                $parentId = $type->getParentType()->getId();
                if(is_array($typeList[$parentId - 1])){
                    $typeList[$parentId - 1]['children'][] = $type;
                }else{
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
