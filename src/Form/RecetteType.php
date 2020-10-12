<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Recette;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class RecetteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('label')
            ->add('createdAt', DateType::class, [
                    'widget' => 'single_text',
                    'label' => 'Date'
                ])
            ->add('total',TextType::class,[
                'attr' =>[
                    // 'disabled' => true,
                ],
                'label' => 'Montant'
            ])
            ->add('user', EntityType::class, [
                'class' => User::class,                
                'label' => 'Associés',
                'expanded' => false,
                'multiple' => false,
                'choice_label' => 'firstname',
            ])
            // ->add('scm', EntityType::class, [
            //     'class' => EntityScmType::class,                
            //     'label' => 'type',
            //     'expanded' => false,
            //     'multiple' => false,
            //     'choice_label' => 'label',
            // ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Recette::class,
        ]);
    }
}
