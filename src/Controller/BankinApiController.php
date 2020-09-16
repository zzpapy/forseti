<?php

namespace App\Controller;

use App\Entity\BankAccount;
use App\Service\BankinApiManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;

class BankinApiController extends AbstractController
{
    private $session;
    private $bankinApiManager;

    public function __construct(SessionInterface $session, BankinApiManager $bankinApiManager)
    {
        $this->session = $session;
        $this->bankinApiManager = $bankinApiManager;
    }


    /**
     * @Route("/bankin", name="bankin_app")
     */
    public function index(HttpClientInterface $bankin)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        
        $bankList = $this->bankinApiManager->listAllBanks();

        return $this->render('bankin/bank_list.html.twig', [
            'controller_name' => 'BankinApiController',
            'bank_list' => $bankList,
        ]);
    }


    /**
     * @Route("/bankin/setbank/{bankid}", name="setbank_bankin_app")
     */
    public function setbank(Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $authToken = $this->session->get('bankin_api_auth_token');

        $bankId = $request->get('bankid');

        $redirectBankinUrl = $this->bankinApiManager->connectItem($authToken, $bankId);

        return $this->redirect($redirectBankinUrl);
    }

    /**
     * @Route("/bankin/accountlist", name="accountlist_bankin_app")
     */
    public function accountlist(Request $request)
    {
        if($request->get('success')){
            $authToken = $this->session->get('bankin_api_auth_token');
            $accountList = $this->bankinApiManager->listAccounts($authToken);
            return $this->render('bankin/account_list.html.twig', [
                'controller_name' => 'BankinApiController',
                'account_list' => $accountList,
            ]);
        }else{
            // TODO: redirect page erreur
            return false;
        }
    }

    /**
     * @Route("/bankin/saveaccount/{accountid}", name="saveaccount_bankin_app")
     */
    public function saveAccount(Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $authToken = $this->session->get('bankin_api_auth_token');

        $account = $this->bankinApiManager->listAccounts($authToken,$request->get('accountid'));

        $scmBankAccount = new BankAccount();

        $scmBankAccount->setBankinAccountId($account['id']);
        $scmBankAccount->setAccountName($account['name']);

        $bankInfos = $this->bankinApiManager->getSingleBank($account['bank']['id']);

        $scmBankAccount->setBankinId($bankInfos['id']);
        $scmBankAccount->setBankName($bankInfos['name']);
        $scmBankAccount->setLogoUrl($bankInfos['logo_url']);

        $scmBankAccount->setScm($this->getUser()->getScm());

        $em = $this->getDoctrine()->getManager();

        $em->persist($scmBankAccount);
        $em->flush();
        $listTransactions = $this->bankinApiManager->listTransactions($authToken);
      
        return $this->redirectToRoute('dashboard',["listTransactions" => $listTransactions]);
    }
}
