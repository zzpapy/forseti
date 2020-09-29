<?php


namespace App\Service;

use App\Entity\Recette;
use App\Repository\BankAccountRepository;
use App\Repository\RecetteRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\BankinApiManager;
use Symfony\Component\Validator\Constraints\Date;

class RecetteManager
{
    private $chargeRepository;
   

    public function __construct( SessionInterface $session, RecetteRepository $recetteRep)
    {
        $this->session = $session;

        $this->recetteRep = $recetteRep;
    }   

    public function getTotalRecetteUsers($scm){
        
        $dateStart = date('Y-m-d', strtotime($scm->getAccountingExerciceStartAt()->format('Y-m-d'). '-1 days'));
        $dateEnd = date('Y-m-d', strtotime($scm->getAccountingExerciceEndAt()->format('Y-m-d') . '+1 days'));
        $results = $this->recetteRep->getTotalRecetteUsers($scm,$dateStart,$dateEnd);
        
        return $results;
    }

    public function getTotalRecetteNullUsers($scm){
        
        $dateStart = date('Y-m-d', strtotime($scm->getAccountingExerciceStartAt()->format('Y-m-d'). '-1 days'));
        $dateEnd = date('Y-m-d', strtotime($scm->getAccountingExerciceEndAt()->format('Y-m-d') . '+1 days'));
        $results = $this->recetteRep->getTotalRecetteNullUsers($scm,$dateStart,$dateEnd);
        
        return $results;
    }
}