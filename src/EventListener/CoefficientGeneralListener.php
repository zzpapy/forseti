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
        $users = $coefficientGeneral->getUser()->getScm()->getUsers();
        foreach ($users as $key => $user) {
            if(in_array('ROLE_ADMIN',$user->getRoles())){
                $userAdmin = $user;                
            }
        }
        $totalCoeffUsersPerMonth = $this->repo->getTotalUserCoefPerMonth($coefficientGeneral->getUser()->getScm(),$userAdmin);
        $coeffCollection = $userAdmin->getCoefficientGeneral()->getValues();
        if(empty($coeffCollection)){
            foreach ($totalCoeffUsersPerMonth as $key => $total) {
                $coefficientGeneralAdmin = new CoefficientGeneral();
                $coefAdmin = $total["total"];
                $coefficientGeneralAdmin->setUser($userAdmin);
                $dateObj   = \DateTime::createFromFormat('m',$total["mois"]);
                $coefficientGeneralAdmin->setMonth($dateObj);
                $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);
                dd($coefAdmin);
                // dd($coefficientGeneralAdmin);
                $this->entityManager->persist($coefficientGeneralAdmin);
                $this->entityManager->flush();
            }
        }
        else{
            foreach ($totalCoeffUsersPerMonth as $key => $total) {
                $coefficientGeneralAdmin = $coeffCollection[$key];
                $coefAdmin = $total["total"];
                if($coefficientGeneralAdmin->getCoefficient() != $coefAdmin){
                    $coefficientGeneralAdmin->setCoefficient(100 - $coefAdmin);
                    $this->entityManager->persist($coefficientGeneralAdmin);
                    $this->entityManager->flush();
                }
               
                dump($coefficientGeneralAdmin->getCoefficient() != $coefAdmin);
            }
            // dd($coefficientGeneralAdmin);
        }
        //     if($userAdmin){
        //         $userCollection = $userAdmin->getCoefficientGeneral();
        //         // dd($userCollection->getValues());
        //         $test = $this->repo->getTotalUserCoefPerMonth($coefficientGeneral->getUser()->getScm(),$user);
                
        //         // dd(count($test));
        //         foreach ($test as  $coef) {
        //             $coefficientGeneralAdmin = new CoefficientGeneral();
        //             $coefAdmin = $coef["total"];
        //             $coefficientGeneralAdmin->setUser($user);
        //             $dateObj   = \DateTime::createFromFormat('m',$coef["mois"]);
        //             $coefficientGeneralAdmin->setMonth($dateObj);
        //             $coefficientGeneralAdmin->setCoefficient($coefAdmin);
        //             $this->entityManager->persist($coefficientGeneralAdmin);
        //             $this->entityManager->flush();
        //         }
        //     }
        //     // dd($coefficientGeneral);
        // }
    
    }
}