<?php

namespace App\Form;

use App\Entity\Book;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\{NumberType, SubmitType, TextType};

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, ['label'=>'Tytuł'])
            ->add('author', TextType::class, ['label'=>'Autor'])
            ->add('price_net', NumberType::class, [
                'label'=>'Cena netto',
                'invalid_message'=>'Dozwolone tylko liczby!'
                ])
            ->add('vat', NumberType::class, [
                'label'=>'VAT %',
                'invalid_message'=>'Dozwolone tylko liczby!'
                ])
            ->add('save', SubmitType::class, [
                'attr'=>['class'=>'btn btn-create float-right mt-5'],
                'label'=>'Dodaj'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
        ]);
    }
}
