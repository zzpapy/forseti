<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CoefficientGeneralType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user_id', HiddenType::class)
            ->add('coefficient_january', NumberType::class)
            ->add('coefficient_february', NumberType::class)
            ->add('coefficient_march', NumberType::class)
            ->add('coefficient_april', NumberType::class)
            ->add('coefficient_may', NumberType::class)
            ->add('coefficient_june', NumberType::class)
            ->add('coefficient_july', NumberType::class)
            ->add('coefficient_august', NumberType::class)
            ->add('coefficient_september', NumberType::class)
            ->add('coefficient_october', NumberType::class)
            ->add('coefficient_november', NumberType::class)
            ->add('coefficient_december', NumberType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
