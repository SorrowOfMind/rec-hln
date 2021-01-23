<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Book;
use App\Repository\BookRepository;
use App\Form\BookType;

use function App\Utilities\calculateGrossPrice;

#[Route('/book', name: 'book_')]
class BookController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(BookRepository $bookRepo)
    {
        $books = $bookRepo->findAll();
        return $this->render('book/index.html.twig', ['books'=>$books]);
    }

    #[Route('/create', name:'create', methods: ['GET', 'POST'])]
    public function create(Request $request)
    {
        $book = new Book();

        $form = $this->createForm(BookType::class, $book);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){
            $book = $form->getData();
            
            $em = $this->getDoctrine()->getManager();
            $em->persist($book);
            $em->flush();

            return $this->redirectToRoute('book_index');
        }
        return $this->render('book/create.html.twig', ['form'=>$form->createView()]);
    }

    #[Route('/show/{id}', name: 'show', methods: ['GET'])]
    public function show(Book $book)
    {
        //funckja do obliczania ceny brutto -> /Utilities
        $netPrice = $book->getPriceNet();
        $vat = $book->getVat();
        $grossPrice = calculateGrossPrice($netPrice, $vat);

        return $this->render('book/show.html.twig', [
            'book' => $book, 
            'grossPrice'=>$grossPrice
        ]);
    }

    #[Route('/edit/{id}', name:'edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, $id, BookRepository $bookRepo)
    {
        $book = $bookRepo->find($id);
        if (!$id) throw $this->createNotFoundException('Nie znaleziono książki o ID: ' . $id);

        $form = $this->createForm(BookType::class, $book);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            //pokaż wiadomość o edycji książki => wiadomość zniknie po 2s (ustawiony timer w JS)
            $this->addFlash('notice', 'Zedytowano książkę!');

            return $this->redirectToRoute('book_index');
        }
        return $this->render('book/edit.html.twig', ['form'=>$form->createView()]);
    }

    #[Route('/delete/{id}', name:'delete', methods: ['DELETE'])]
    public function delete($id, BookRepository $bookRepo)
    {
        $book = $bookRepo->find($id);
        if (!$id) throw $this->createNotFoundException('Nie znaleziono książki o ID: ' . $id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($book);
        $em->flush();

        //pokaż wiadomość o usunięciu książki => wiadomość zniknie po 2s (ustawiony timer w JS)
        $this->addFlash('notice', 'Usunięto książkę!');

        return $this->redirectToRoute('book_index');
    }
}
