<?php

namespace App\Entity;

use App\Repository\CoefficientSpecifiqueRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CoefficientSpecifiqueRepository::class)
 */
class CoefficientSpecifique
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $coefficient;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="coefficientSpecifique", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Charge::class, inversedBy="coefficientSpecifiques")
     * @ORM\JoinColumn(nullable=false)
     */
    private $charge;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCoefficient(): ?float
    {
        return $this->coefficient;
    }

    public function setCoefficient(float $coefficient): self
    {
        $this->coefficient = $coefficient;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCharge(): ?Charge
    {
        return $this->charge;
    }

    public function setCharge(?Charge $charge): self
    {
        $this->charge = $charge;

        return $this;
    }
}
