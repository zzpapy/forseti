<?php

namespace App\Form;

use App\Entity\Scm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ScmType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logo')
            ->add('company_name')
            ->add('address')
            ->add('zip_code')
            ->add('city')
            ->add('siret')
            ->add('siren')
            ->add('accountingExerciceStartAt', DateType::class, [
            ])
            ->add('accountingExerciceEndAt', DateType::class, [
                ])
            ->add('ref_local')
            ->add('invariant_local')
            ->add('local_owner')
            ->add('local_siren')
            ->add('typeTenantOwner',ChoiceType::class,[
                'choices'  => [
                    'locataire' => true,
                    'propriétaire' => false,
                ],
                'mapped' => true,
                'expanded' => true,
                'label' => "Type d'occupation"
            ])
            ->add('amountAnuallyRent')
            ->add('forecast_charge')
            ->add('AmountPreviousYearAccountingCharge')
            ->add('min_assoc')
            ->add('max_assoc')
            ->add('phone')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Scm::class,
        ]);
    }
}
