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
            foreach ($totalCoeffUsersPerMonth as $key => $total) {

                //on prende tout les totaux mensuels et on crée les objets
                //CoefficientGeneral correspondant
                $coefficientGeneralAdmin = new CoefficientGeneral();
                $coefAdmin = $total["total"];
                $coefficientGeneralAdmin->setUser($userAdmin);
                $dateObj   = \DateTime::createFromFormat('m',$total["mois"]);
                $coefficientGeneralAdmin->setMonth($dateObj);
                //on set le coef en faisant la différence avec 100
                $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);

                //on stock les coeffs pour l'admin
                $this->entityManager->persist($coefficientGeneralAdmin);
                $this->entityManager->flush();
            }
        }
        else{
            foreach ($totalCoeffUsersPerMonth as $key => $total) {//si collection

                //on récup chaque objet de la collection
                $coefficientGeneralAdmin = $coeffCollection[$key];
                
                $coefAdmin = $total["total"];

                //on vérif si la valeur actuelle est différente de la valeur total en cours
                if($coefficientGeneralAdmin->getCoefficient() != $coefAdmin){// si oui
                    //on modifie la valeur de l'objet
                    $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);

                    //on stock en bdd
                    $this->entityManager->persist($coefficientGeneralAdmin);
                    $this->entityManager->flush();
                }
               
                dump($coefficientGeneralAdmin->getCoefficient() != $coefAdmin);
            }
        }
    
    }
}