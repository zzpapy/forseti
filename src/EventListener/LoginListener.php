<?php

namespace App\EventListener;

use App\Service\BankinApiManager;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class LoginListener
{
    private $bankin;
    private $session;

    public function __construct(BankinApiManager $bankin, SessionInterface $session)
    {
        $this->bankin = $bankin;
        $this->session = $session;
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        $user = $event->getAuthenticationToken()->getUser();
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            $apiUser = $user->getApiUser();
            $apiResponse = $this->bankin->authenticateApiUser($apiUser->getEmail(), $apiUser->getPassword());
            $this->session->set('bankin_api_auth_token', $apiResponse['access_token']);
        }
    }
}