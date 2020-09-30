<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Charge;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\EntityRepository;
use App\Entity\CoefficientSpecifique;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CoefficientSpecifiqueType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('coefficient')
            ->add('user', EntityType::class, [
                'class' => User::class,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('u')
                        ->orderBy('u.firstname', 'ASC');
                },
                'expanded' => true,
                'multiple' => false,
                'choice_label' => 'firstname',
            ])
            ->add('charge', EntityType::class, [
                'class' => Charge::class,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('c')
                        ->leftjoin(CoefficientSpecifique::class, 'cs', Join::WITH, 'cs.charge = c.id')
                        ->andWhere('cs.charge IS NULL')
                        ->orderBy('c.label', 'DESC');
                },
                'expanded' => true,
                'multiple' => false,
                'choice_label' => 'label',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => CoefficientSpecifique::class,
        ]);
    }
}
