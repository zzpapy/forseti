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
            ->add('coefficient_january', NumberType::class,[                
                    'html5' => true
            ])
            ->add('coefficient_february', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_march', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_april', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_may', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_june', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_july', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_august', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_september', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_october', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_november', NumberType::class,[                
                    'html5' => true
                ])
            ->add('coefficient_december', NumberType::class,[                
                    'html5' => true
                ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}