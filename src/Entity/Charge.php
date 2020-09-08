<?php

namespace App\Entity;

use App\Repository\ChargeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChargeRepository::class)
 */
class Charge
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label;

    /**
     * @ORM\Column(type="bigint")
     */
    private $total;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $payedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $paymentAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isMonthly;

    /**
     * @ORM\OneToMany(targetEntity=CoefficientSpecifique::class, mappedBy="charge", orphanRemoval=true)
     */
    private $coefficientSpecifiques;

    /**
     * @ORM\ManyToOne(targetEntity=ChargeType::class, inversedBy="charges")
     * @ORM\JoinColumn(nullable=false)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity=Scm::class, inversedBy="charges")
     * @ORM\JoinColumn(nullable=false)
     */
    private $scm;

  

    public function __construct()
    {
        $this->coefficientSpecifiques = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getTotal(): ?string
    {
        return $this->total;
    }

    public function setTotal(string $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPayedAt(): ?\DateTimeInterface
    {
        return $this->payedAt;
    }

    public function setPayedAt(?\DateTimeInterface $payedAt): self
    {
        $this->payedAt = $payedAt;

        return $this;
    }

    public function getPaymentAt(): ?\DateTimeInterface
    {
        return $this->paymentAt;
    }

    public function setPaymentAt(?\DateTimeInterface $paymentAt): self
    {
        $this->paymentAt = $paymentAt;

        return $this;
    }

    public function getIsMonthly(): ?bool
    {
        return $this->isMonthly;
    }

    public function setIsMonthly(bool $isMonthly): self
    {
        $this->isMonthly = $isMonthly;

        return $this;
    }

    /**
     * @return Collection|CoefficientSpecifique[]
     */
    public function getCoefficientSpecifiques(): Collection
    {
        return $this->coefficientSpecifiques;
    }

    public function addCoefficientSpecifique(CoefficientSpecifique $coefficientSpecifique): self
    {
        if (!$this->coefficientSpecifiques->contains($coefficientSpecifique)) {
            $this->coefficientSpecifiques[] = $coefficientSpecifique;
            $coefficientSpecifique->setCharge($this);
        }

        return $this;
    }

    public function removeCoefficientSpecifique(CoefficientSpecifique $coefficientSpecifique): self
    {
        if ($this->coefficientSpecifiques->contains($coefficientSpecifique)) {
            $this->coefficientSpecifiques->removeElement($coefficientSpecifique);
            // set the owning side to null (unless already changed)
            if ($coefficientSpecifique->getCharge() === $this) {
                $coefficientSpecifique->setCharge(null);
            }
        }

        return $this;
    }

    public function getType(): ?ChargeType
    {
        return $this->type;
    }

    public function setType(?ChargeType $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getScm(): ?Scm
    {
        return $this->scm;
    }

    public function setScm(?Scm $scm): self
    {
        $this->scm = $scm;

        return $this;
    }

    
}
