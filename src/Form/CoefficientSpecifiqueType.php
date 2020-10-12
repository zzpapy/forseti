<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\ORM\EntityRepository;
use App\Entity\CoefficientSpecifique;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CoefficientSpecifiqueType extends AbstractType
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
        ->add('coefficient',null,[
                'label' => "coefficient spécifique"
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
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => CoefficientSpecifique::class,
        ]);
    }
}
