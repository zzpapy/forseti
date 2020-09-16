<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", name="dashboard")
     */
    public function index(Request $request)
    {
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'listTransactions' => $request->get("listTransactions")
        ]);
    }
}
