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
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class RecetteType extends AbstractType
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $scm =$this->session->get('scm');
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
                'query_builder' => function (EntityRepository $er) use ($scm) {
                        $er = $er->findByScm($scm);
                    return $er;
                },
                'label' => 'Associé',
                'expanded' => true,
                'multiple' => false,
                'choice_label' => 'firstname',
                ])
                ;
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Recette::class,
        ]);
    }
}
