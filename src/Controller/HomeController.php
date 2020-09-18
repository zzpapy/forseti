<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class HomeController extends AbstractController
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    /**
     * @Route("/home", name="home")
     */
    public function index()
    {
        $renderBankinConf = false;

        if(in_array('ROLE_ADMIN', $this->getUser()->getRoles()) && is_null($this->session->get('bank_account_id'))){
            $renderBankinConf = true;
        }

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'render_bankin_conf' => $renderBankinConf,
        ]);
    }
}
