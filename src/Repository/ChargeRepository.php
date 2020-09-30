<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Charge;
use App\Entity\ChargeType;
use Doctrine\ORM\Query\Expr\Join;
use App\Entity\CoefficientSpecifique;
use App\Form\CoefficientSpecifiqueType;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Charge|null find($id, $lockMode = null, $lockVersion = null)
 * @method Charge|null findOneBy(array $criteria, array $orderBy = null)
 * @method Charge[]    findAll()
 * @method Charge[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChargeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Charge::class);
    }

    // /**
    //  * @return Charge[] Returns an array of Charge objects
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


    /**
     * SELECT SUM(c.total) as 'total', ct.label FROM charge as c
     *    INNER JOIN charge_type as ct ON c.type_id = ct.id
     *    WHERE c.scm_id = 1 AND c.payed_at > '2019-12-31 00:00:00' AND c.payed_at < NOW() GROUP BY c.type_id ORDER BY c.type_id ASC;
     */
    public function getTotalPerChargeType($scm_id, $startDate, $endDate)
    {
        return $this->createQueryBuilder('c')
            ->select('SUM(c.total) as total', 'ct.label')
            ->innerjoin(ChargeType::class, 'ct', Join::WITH, 'c.type = ct.id')
            ->andWhere('c.scm = :scm_id')
            ->andWhere('c.payedAt > :start')
            ->andWhere('c.payedAt < :end')
            ->groupBy('c.type')
            ->orderBy('c.type')
            ->setParameter('scm_id', $scm_id)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->getArrayResult();
    }

    public function getTotalCharge($scm_id, $startDate, $endDate)
    {
        return $this->createQueryBuilder('c')
            ->select('SUM(c.total) as total')
            ->andWhere('c.scm = :scm_id')
            ->andWhere('c.payedAt > :start')
            ->andWhere('c.payedAt < :end')
            ->setParameter('scm_id', $scm_id)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()->getSingleResult()['total'];
    }

    /**
     * SELECT SUM(c.id) total, ct.label, MONTH(payed_at) mois FROM charge c
     * INNER JOIN charge_type ct on c.type_id = ct.id
     * WHERE c.scm_id = 1 GROUP BY MONTH(payed_at), c.type_id;
     */
    public function getTotalChargePerMonthPerType($scm_id, $startDate, $endDate)
    {
        return $this->createQueryBuilder('c')
            ->select('SUM(c.total) as total', 'ct.label', 'MONTH(c.payedAt) as mois')
            ->innerjoin(ChargeType::class, 'ct', Join::WITH, 'c.type = ct.id')
            ->andWhere('c.scm = :scm_id')
            ->andWhere('c.payedAt > :start')
            ->andWhere('c.payedAt < :end')
            ->groupBy('mois, c.type')
            ->orderBy('mois')
            ->setParameter('scm_id', $scm_id)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * SELECT SUM(ABS (c.total)), ct.label
     *FROM charge c
     *INNER JOIN	charge_type ct
     *ON c.type_id = ct.id
     *WHERE c.scm_id = 58
     *GROUP BY label
     */

    public function getTotalChargePerType($scm_id)
    {
        return $this->createQueryBuilder('c')
            ->select('SUM(ABS(c.total)) as total, ct.label')
            ->innerjoin(ChargeType::class, 'ct', Join::WITH, 'c.type = ct.id')
            ->andWhere('c.scm = :scm_id')
            ->setParameter('scm_id', $scm_id)
            ->groupBy('ct.label')
            ->getQuery()
            ->getArrayResult();
    }

    public function getTotalChargePerMonth($scm_id, $startDate, $endDate)
    {
        return $this->createQueryBuilder('c')
            ->select('SUM(ABS(c.total)) as total', 'MONTH(c.payedAt) as mois')
            ->andWhere('c.scm = :scm_id')
            ->andWhere('c.payedAt > :start')
            ->andWhere('c.payedAt < :end')
            ->groupBy('mois, c.type')
            ->orderBy('mois')
            ->setParameter('scm_id', $scm_id)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->groupBy('mois')
            ->getQuery()
            ->getArrayResult();
    }

    public function getTotalChargePerCoeffSpe()
    {
        return $this->createQueryBuilder('c')
            ->select( 'c.label','ABS(c.total) as total', 'u.firstname','ABS((cs.coefficient * c.total / 100 )) AS sum')
            ->innerjoin(CoefficientSpecifique::class, 'cs', Join::WITH, 'cs.charge = c.id')
            ->innerjoin(User::class, 'u', Join::WITH, 'cs.user = u.id')
            ->orderBy('u.firstname')
            ->getQuery()
            ->getArrayResult();
    }


}
