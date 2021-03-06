<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Charge;
use Doctrine\ORM\Query\Expr\Join;
use App\Entity\CoefficientSpecifique;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findByScm($scm)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.scm = :scm')
            ->setParameter('scm', $scm)
        ;
    }

    public function getCalcCoeffSpe($user)
    {
        return $this->createQueryBuilder('u')
            ->select( 'u.id','cs.id AS coeff_id' ,'ch.label','ABS((cs.coefficient * ch.total / 100))AS total_calc',' ABS(ch.total) AS total,cs.coefficient as coeff')
            ->leftjoin(CoefficientSpecifique::class, 'cs', Join::WITH, 'cs.user = u.id')
            ->innerjoin(User::class, 'us', Join::WITH, 'us.id = cs.user')
            ->innerjoin(Charge::class, 'ch', Join::WITH, 'cs.charge = ch.id')
            ->andWhere('cs.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getArrayResult();
    }
    
    
}
