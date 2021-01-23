<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BookRepository::class)
 */
class Book
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     * @Assert\NotBlank()
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=500)
     * @Assert\NotBlank()
     *  @Assert\Regex(
     *  pattern="/\d/",
     *  match=false,
     *  message="Dozwolone tylko litery!"
     * )
     */
    private $author;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $price_net;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $vat;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;
        return $this;
    }

    public function getPriceNet(): ?float
    {
        return $this->price_net;
    }

    public function setPriceNet(float $price_net): self
    {
        $this->price_net = $price_net;
        return $this;
    }

    public function getVat(): ?float
    {
        return $this->vat;
    }

    public function setVat(float $vat): self
    {
        $this->vat = $vat;
        return $this;
    }
}
