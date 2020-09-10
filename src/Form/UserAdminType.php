<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class UserAdminType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => ['placeholder' => 'Email']
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'The password fields must match.',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'first_options'  => ['label' => 'Password', 'attr' => ['placeholder' => 'Mot de passe']],
                'second_options' => ['label' => 'Repeat Password', 'attr' => ['placeholder' => 'Confirmer']],
            ])
            ->add('firstname', TextType::class, [
                'attr' => ['placeholder' => 'Prénom']
            ])
            ->add('lastname', TextType::class, [
                'attr' => ['placeholder' => 'Nom']
            ])
            ->add('address', TextType::class, [
                'attr' => ['placeholder' => 'Adresse']
            ])
            ->add('zipcode', TextType::class, [
                'attr' => ['placeholder' => 'Code Postal']
            ])
            ->add('city', TextType::class, [
                'attr' => ['placeholder' => 'Ville']
            ])
            ->add('state', TextType::class, [
                'required' => false,
                'attr' => ['placeholder' => 'Région']
            ])
            ->add('country', TextType::class, [
                'attr' => ['placeholder' => 'Pays']
            ])
            ->add('picture', FileType::class, [
                'label' => 'Image de profil',
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
            ->add('nbPart', IntegerType::class, [
                'attr' => ['placeholder' => 'Nombre de parts']
            ])
            ->add('telephone', TelType::class,[
                "attr"=>[
                    'placeholder'=>'Téléphone',
                    'data-mask'=>'+33 (0)9 99 99 99 99'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
