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
            ->add('coefficient',null,[
                'label' => "coefficient spécifique"
            ])
            ->add('user', EntityType::class, [
                'class' => User::class,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('u')
                        ->orderBy('u.firstname', 'ASC');
                },
                'label' => 'Associé',
                'expanded' => false,
                'multiple' => false,
                'choice_label' => 'firstname',
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
