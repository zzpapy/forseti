<?php

namespace App\Repository;

use App\Entity\Scm;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Scm|null find($id, $lockMode = null, $lockVersion = null)
 * @method Scm|null findOneBy(array $criteria, array $orderBy = null)
 * @method Scm[]    findAll()
 * @method Scm[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScmRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Scm::class);
    }

    // /**
    //  * @return Scm[] Returns an array of Scm objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Scm
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
