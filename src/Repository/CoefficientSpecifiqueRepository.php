<?php

namespace App\Repository;

use App\Entity\Charge;
use Doctrine\ORM\Query\Expr\Join;
use App\Entity\CoefficientSpecifique;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method CoefficientSpecifique|null find($id, $lockMode = null, $lockVersion = null)
 * @method CoefficientSpecifique|null findOneBy(array $criteria, array $orderBy = null)
 * @method CoefficientSpecifique[]    findAll()
 * @method CoefficientSpecifique[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoefficientSpecifiqueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CoefficientSpecifique::class);
    }

    // /**
    //  * @return CoefficientSpecifique[] Returns an array of CoefficientSpecifique objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CoefficientSpecifique
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    
}
