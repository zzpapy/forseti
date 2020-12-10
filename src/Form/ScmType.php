<?php

namespace App\Form;

use App\Entity\Scm;
use App\Form\UserAdminType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class ScmType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logo', FileType::class, [
                'label' => 'logo',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ],
                        'mimeTypesMessage' => 'Veuillez uploader une image valide (jpeg,png ou gif)',
                    ])
                ],
            ])
            ->add('company_name', TextType::class)
            ->add('address', TextType::class)
            ->add('zip_code', TextType::class)
            ->add('city', TextType::class)
            ->add('siret', TextType::class)
            ->add('siren', TextType::class)
            ->add('accountingExerciceStartAt', DateType::class, ['widget' => 'single_text'])
            ->add('accountingExerciceEndAt', DateType::class, ['widget' => 'single_text'])
            ->add('ref_local', TextType::class)
            ->add('invariant_local', TextType::class)
            ->add('local_owner', TextType::class)
            ->add('local_siren', NumberType::class)
            ->add('typeTenantOwner',ChoiceType::class,[
                'choices'  => [
                    'Locataire' => 'locataire',
                    'Propriétaire' => 'propriétaire',
                ],
                'mapped' => true,
                'expanded' => true,
                'label' => "Type d'occupation"
            ])
            ->add('amountAnuallyRent', MoneyType::class, [
                'currency' => '',
            ])
            ->add('forecast_charge', MoneyType::class, [
                'currency' => '',
            ])
            ->add('AmountPreviousYearAccountingCharge', MoneyType::class, [
                'currency' => '',
            ])
            ->add('min_assoc', NumberType::class)
            ->add('max_assoc', NumberType::class)
            ->add('phone', TelType::class)
            ->add("users", CollectionType::class,[
                'entry_type'=> UserAdminType::class,
                'block_name'=>'user_list',
                "allow_add"=>true,
                "allow_delete"=>true,
                "by_reference"=>false,
                'entry_options'=>[
                    'label'=>false,
                ]


            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Scm::class,
        ]);
    }
}
