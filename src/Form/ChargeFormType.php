<?php

namespace App\Form;

use App\Entity\Charge;
use App\Form\CoefficientSpecifiqueType;
use Symfony\Component\Form\AbstractType;
use App\Entity\ChargeType as EntityChargeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ChargeFormType extends AbstractType
{
   
    public function buildForm(FormBuilderInterface $builder, array $options)
    { 
       
        $builder
            ->add('label',TextType::class,[
                'label' => "Label"
            ])
            ->add('type', EntityType::class, [
                'class' => EntityChargeType::class,                
                'label' => 'type',
                'expanded' => false,
                'multiple' => false,
                'choice_label' => 'label',
            ])
            ->add('coefficientSpecifiques', CollectionType::class,[
                'entry_type'=> CoefficientSpecifiqueType::class,
                'block_name'=>'user_list',                
                "allow_add"=>true,
                "label" => false,
                "allow_delete"=>true,
                "by_reference"=>false,
                'entry_options'=>[
                    'label'=>false,
                ],
            ])
            ->add('total',IntegerType::class,[
                'label' => "Montant"
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Charge::class,
            'scm' => null,
        ]);
    }
}
