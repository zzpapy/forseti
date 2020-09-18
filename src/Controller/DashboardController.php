<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DashboardController extends BankinApiController
{
    /**
     * @Route("/dashboard", name="app_dashboard")
     */
    public function dashboard()
    {
        $authToken = $this->session->get('bankin_api_auth_token');
        $accountId = $this->session->get('bank_account_id');

        $listTransactions = $this->bankinApiManager->listTransactionsJson($authToken, $accountId);

        return $this->render('dashboard/dashboard.html.twig', [
            'controller_name' => 'DashboardController',
            'listTransactions' => $listTransactions
        ]);
    }
}
