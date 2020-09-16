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
    public function index()
    {
        $authToken = $this->session->get('bankin_api_auth_token');
        $listTransactions = $this->bankinApiManager->listTransactionsJson($authToken);

        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'listTransactions' => $listTransactions
        ]);
    }
}
