<?php

namespace App\Form;

use App\Entity\Charge;
use App\Form\CoefficientSpecifiqueType;
use Symfony\Component\Form\AbstractType;
use App\Entity\ChargeType as EntityChargeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class ChargeFormType extends AbstractType
{
   
    public function buildForm(FormBuilderInterface $builder, array $options)
    { 
       
        $builder
            ->add('label',null,[
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
                "allow_delete"=>true,
                "by_reference"=>false,
                'entry_options'=>[
                    'label'=>false,
                ],
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
