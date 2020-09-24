<?php

namespace App\EventListener;

use App\Entity\User;
use App\Entity\CoefficientGeneral;
use App\Repository\CoefficientGeneralRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\Event\LifecycleEventArgs;


class CoefficientGeneralListener
{
    private $entityManager;
    private $repo;

    public function __construct( EntityManagerInterface $entityManager, CoefficientGeneralRepository $repo){
        $this->entityManager = $entityManager;
        $this->repo = $repo;
    }

    public function postUpdate(CoefficientGeneral $coefficientGeneral, LifecycleEventArgs $event){

        //Récup des utilisateurs de la scm

        $users = $coefficientGeneral->getUser()->getScm()->getUsers();
        foreach ($users as $key => $user) {
            //Récup de l'admin
            if(in_array('ROLE_ADMIN',$user->getRoles())){
                $userAdmin = $user;                
            }
        }

        //requête pour récup le total des coefs par mois pour tous le users
        $totalCoeffUsersPerMonth = $this->repo->getTotalUserCoefPerMonth($coefficientGeneral->getUser()->getScm(),$userAdmin);

        //récup éventuelle collection de coef de l'admin
        $coeffCollection = $userAdmin->getCoefficientGeneral()->getValues();
        if(empty($coeffCollection)){//si pas de collection
            
                //on crée un nouvel objet CoefficientGeneral
                $coefficientGeneralAdmin = new CoefficientGeneral();

                //on récup le num du mois
                $month = $coefficientGeneral->getMonth();

                //on récupère l'entrée du totla des coefs en fct du mois
                $index = date_format($coefficientGeneral->getMonth(), "n");
                $coefAdmin = $totalCoeffUsersPerMonth[$index-1]["total"];

                //on set l'objet CoefficientGeneralAdmin
                $coefficientGeneralAdmin->setUser($userAdmin);
                $coefficientGeneralAdmin->setMonth($month);
                $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);
                
                
                //on stock le coeff pour l'admin
                $this->entityManager->persist($coefficientGeneralAdmin);
                $this->entityManager->flush();
        }
        else{
            // dd($coefficientGeneral);
            $index = date_format($coefficientGeneral->getMonth(), "n");
            // foreach ($totalCoeffUsersPerMonth as $key => $total) {//si collection

                //on récup chaque objet de la collection
                $coefficientGeneralAdmin = $coeffCollection[$index-1];
                
                $coefAdmin = $totalCoeffUsersPerMonth[$index-1]["total"];

                //on vérif si la valeur actuelle est différente de la valeur total en cours
                if($coefficientGeneralAdmin->getCoefficient() != $coefAdmin){// si oui
                    //on modifie la valeur de l'objet
                    $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);

                    //on stock en bdd
                    $this->entityManager->persist($coefficientGeneralAdmin);
                    $this->entityManager->flush();
                }
            // }
        }
    
    }
}