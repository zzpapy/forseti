<?php

namespace App\Form;

use App\Entity\Scm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

class ScmType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logo')
            ->add('raison_sociale')
            ->add('adresse')
            ->add('cp')
            ->add('ville')
            ->add('siret')
            ->add('siren')
            ->add('debut_ex_compta', DateType::class, [
            ])
            ->add('fin_ex_compta', DateType::class, [
            ])
            ->add('ref_local')
            ->add('invariant_local')
            ->add('proprieter_local')
            ->add('siren_local')
            ->add('type_occup',ChoiceType::class,[
                'choices'  => [
                    'locataire' => true,
                    'propriétaire' => false,
                ],
                'mapped' => true,
                'expanded' => true,
                'label' => "Type d'occupation"
            ])
            ->add('mt_loyer_annu')
            ->add('mt_prev_charges')
            ->add('total_charge_annee_precedente')
            ->add('min_assoc')
            ->add('max_assoc')
            ->add('telephone')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Scm::class,
        ]);
    }
}
