<?php

namespace App\Controller;

use App\Entity\BankAccount;
use App\Service\BankinApiManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;

class TestApiController extends AbstractController
{
    private $session;
    private $bankinApiManager;

    public function __construct(SessionInterface $session, BankinApiManager $bankinApiManager)
    {
        $this->session = $session;
        $this->bankinApiManager = $bankinApiManager;
    }


    /**
     * @Route("/test/api", name="test_api")
     */
    public function index(HttpClientInterface $bankin)
    {
        $bankList = $this->bankinApiManager->listAllBanks();

        return $this->render('test_api/index.html.twig', [
            'controller_name' => 'TestApiController',
            'bank_list' => $bankList,
        ]);
    }


    /**
     * @Route("/test/connect/{bankid}", name="test_connect")
     */
    public function connect(Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $authToken = $this->session->get('bankin_api_auth_token');

        $bankId = $request->get('bankid');

        $redirectBankinUrl = $this->bankinApiManager->connectItem($authToken, $bankId);

        return $this->redirect($redirectBankinUrl);
    }

    /**
     * @Route("/test/success", name="test_success")
     */
    public function success(Request $request)
    {
        if($request->get('success')){
            $authToken = $this->session->get('bankin_api_auth_token');
            $accountList = $this->bankinApiManager->listAccounts($authToken);
            return $this->render('test_api/account_list.html.twig', [
                'controller_name' => 'TestApiController',
                'account_list' => $accountList,
            ]);
        }else{
            // TODO: redirect page erreur
            return false;
        }
    }

    /**
     * @Route("/test/saveaccount/{accountid}", name="test_save_account")
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

        return $this->redirectToRoute('home');

    }
}
