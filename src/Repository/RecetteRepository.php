<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Recette;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Recette|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recette|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recette[]    findAll()
 * @method Recette[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecetteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recette::class);
    }

    // /**
    //  * @return Recette[] Returns an array of Recette objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Recette
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function getTotalRecetteUsers($scm_id,$startDate,$endDate)
    {
        return $this->createQueryBuilder('r')
            ->select('SUM(r.total) as total','u.firstname','u.id')
            ->innerjoin(User::class, 'u', Join::WITH, 'u.scm = :scm_id')
            ->andWhere('r.user = u.id')
            ->andWhere('r.createdAt > :start')
            ->andWhere('r.createdAt < :end')
            ->andWhere('r.user IS NULL')
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->setParameter('scm_id', $scm_id)
            ->groupBy('u.id')
            ->getQuery()
            ->getArrayResult();
    }
}
