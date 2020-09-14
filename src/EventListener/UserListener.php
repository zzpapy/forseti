<?php

namespace App\EventListener;

use App\Entity\ApiUser;
use App\Entity\User;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\EntityManagerInterface;

use App\Service\BankinApiManager;

class UserListener
{
    private $bankin;
    private $entityManager;

    public function __construct(BankinApiManager $bankin, EntityManagerInterface $entityManager){
        $this->bankin = $bankin;
        $this->entityManager = $entityManager;
    }

    public function postPersist(User $user, LifecycleEventArgs $event){
        if(in_array('ROLE_ADMIN',$user->getRoles())){
            $apiPassword = uniqid();
            $apiResponse = $this->bankin->createApiUser($user->getEmail(),$apiPassword);

            $apiUser = new ApiUser();

            $apiUser->setEmail($user->getEmail());
            $apiUser->setPassword($apiPassword);
            $apiUser->setResourceUri($apiResponse['resource_uri']);
            $apiUser->setUuid($apiResponse['uuid']);
            $apiUser->setUser($user);

            $this->entityManager->persist($apiUser);
            $this->entityManager->flush();
        }
    }
}