<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\Query\Expr\Join;
use App\Entity\CoefficientGeneral;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method CoefficientGeneral|null find($id, $lockMode = null, $lockVersion = null)
 * @method CoefficientGeneral|null findOneBy(array $criteria, array $orderBy = null)
 * @method CoefficientGeneral[]    findAll()
 * @method CoefficientGeneral[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoefficientGeneralRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CoefficientGeneral::class);
    }

    // /**
    //  * @return CoefficientGeneral[] Returns an array of CoefficientGeneral objects
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
    public function findOneBySomeField($value): ?CoefficientGeneral
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    /**
     * SELECT MONTH(c.month) AS month, SUM(coefficient) AS total
     *FROM coefficient_general c
     *INNER JOIN user 
     *ON c.user_id = user.id
     *WHERE  JSON_LENGTH(roles) = 0 
     *AND scm_id = 58
     *GROUP BY month
     * 
     */

    public function getTotalUserCoefPerMonth($scm,$admin)
    { 
        return $this->createQueryBuilder('c')
            ->select('MONTH(c.month) AS mois, SUM(c.coefficient) as total ')
            ->innerJoin(User::class, 'u', Join::WITH, ' c.user = u.id ')
            ->groupBy('mois')
            ->andWhere('u.id != :admin')
            ->setParameter('admin', $admin)
            ->andWhere('u.scm = :scm')
            ->setParameter('scm', $scm)
            ->orderBy('mois','ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * SELECT AVG(c.coefficient),u.id
     *FROM coefficient_general c
     *INNER JOIN user u
     *ON u.id = c.user_id
     *WHERE c.user_id != 69
     *GROUP BY u.id
     */

    public function getAvgCoeffPerUser($scm,$admin)
    { 
        return $this->createQueryBuilder('c')
            ->select('AVG(c.coefficient) , u.id')
            ->innerJoin(User::class, 'u', Join::WITH, ' c.user = u.id ')
            ->groupBy('u.id')
            ->andWhere('u.scm = :scm')
            ->setParameter('scm', $scm)
            ->getQuery()
            ->getResult()
        ;
    }
}
