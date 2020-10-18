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
        ->add('user', EntityType::class, [
            'class' => User::class,
            'query_builder' => function (EntityRepository $er) use ($scm) {
                return $er->findByScm($scm);
            },
            'label' => false,
            'expanded' => true,
            'multiple' => false,
            'choice_label' => 'firstname',
            ])
        ->add('coefficient',null,[
            'attr' => ["placeholder" => "coefficient"],
            "label" => false
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
