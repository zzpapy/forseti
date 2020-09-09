<?php

namespace App\Form;

use App\Entity\Scm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Validator\Constraints\File;

class ScmType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logo', FileType::class, [
                'label' => 'logo',
                // unmapped means that this field is not associated to any entity property
                'mapped' => false,

                // make it optional so you don't have to re-upload the PDF file
                // every time you edit the Product details
                'required' => false,

                // unmapped fields can't define their validation using annotations
                // in the associated entity, so you can use the PHP constraint classes
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ],
                        'mimeTypesMessage' => 'Please upload a valid PDF document',
                    ])
                ],
            ])
            ->add('company_name', TextType::class)
            ->add('address', TextType::class)
            ->add('zip_code', TextType::class)
            ->add('city', CountryType::class, [
                'preferred_choices' => ['FR'],
            ])
            ->add('siret', TextType::class)
            ->add('siren', TextType::class)
            ->add('accountingExerciceStartAt', DateType::class, ['widget' => 'single_text'])
            ->add('accountingExerciceEndAt', DateType::class, ['widget' => 'single_text'])
            ->add('ref_local', TextType::class)
            ->add('invariant_local', TextType::class)
            ->add('local_owner', TextType::class)
            ->add('local_siren', TextType::class)
            ->add('typeTenantOwner',ChoiceType::class,[
                'choices'  => [
                    'Locataire' => 'locataire',
                    'Propriétaire' => 'propriétaire',
                ],
                'mapped' => true,
                'expanded' => true,
                'label' => "Type d'occupation"
            ])
            ->add('amountAnuallyRent', MoneyType::class)
            ->add('forecast_charge', MoneyType::class)
            ->add('AmountPreviousYearAccountingCharge', MoneyType::class)
            ->add('min_assoc', NumberType::class)
            ->add('max_assoc', NumberType::class)
            ->add('phone', TelType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Scm::class,
        ]);
    }
}
