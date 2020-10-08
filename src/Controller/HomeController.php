<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\ChargeType;
use App\Service\ChargeManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends BankinApiController
{
    // private $session;

    // protected function __construct(SessionInterface $session)
    // {
    //     $this->session = $session;
    // }

    /**
     * @Route("/home", name="home")
     */
    public function index(ChargeManager $chargeManager)
    {
        $renderBankinConf = false;

        if(in_array('ROLE_ADMIN', $this->getUser()->getRoles()) && is_null($this->session->get('bank_account_id'))){
            $renderBankinConf = true;
        }

        $totalDetail = $chargeManager->calculatePercentCharge();

        $totalDetail2 = $chargeManager->getChargePerMonthPerType();

        $totalTab =[];

        foreach ($totalDetail2 as $key => $typeCharge) {
            $totalTab[$key] = array_sum (  $typeCharge );
        }
        $UserRepository = $this->getDoctrine()->getRepository(User::class);

        $users = $UserRepository->findBy(["scm" => $this->getUser()->getScm()]);

        $usersCoefs = [];

        foreach ($users as $user) {
            $usersCoefs[$user->getId()] = $user->getCoefficientGeneral()->toArray();
        }
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $this->reconnectApiUser();
        $transactionList = $chargeManager->getTransactionToSynchronise('onlyCharge');

        if($transactionList){
            $isTransaction = true;
        }
        else{
            $isTransaction = false;
        }

        return $this->render('home/index.html.twig', [
            'render_bankin_conf' => $renderBankinConf,
            'total_detail_per_type' => $totalDetail,
            'total_detail_per_type_per_month' => $totalDetail2,
            'users' => $users,
            'usersCoefs' => $usersCoefs,
            'totalTab' => $totalTab,
            'is_transaction' => $isTransaction,
            'transaction_list' => $transactionList
        ]);
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
