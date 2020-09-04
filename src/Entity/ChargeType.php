<?php

namespace App\Entity;

use App\Repository\ChargeTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChargeTypeRepository::class)
 */
class ChargeType
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
     * @ORM\Column(type="integer")
     */
    private $level;

    /**
     * @ORM\ManyToOne(targetEntity=ChargeType::class, inversedBy="chargeTypes")
     */
    private $parentType;

    /**
     * @ORM\OneToMany(targetEntity=ChargeType::class, mappedBy="parentType")
     */
    private $chargeTypes;

    /**
     * @ORM\OneToMany(targetEntity=Charge::class, mappedBy="type")
     */
    private $charges;

    public function __construct()
    {
        $this->chargeTypes = new ArrayCollection();
        $this->charges = new ArrayCollection();
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

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getParentType(): ?self
    {
        return $this->parentType;
    }

    public function setParentType(?self $parentType): self
    {
        $this->parentType = $parentType;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getChargeTypes(): Collection
    {
        return $this->chargeTypes;
    }

    public function addChargeType(self $chargeType): self
    {
        if (!$this->chargeTypes->contains($chargeType)) {
            $this->chargeTypes[] = $chargeType;
            $chargeType->setParentType($this);
        }

        return $this;
    }

    public function removeChargeType(self $chargeType): self
    {
        if ($this->chargeTypes->contains($chargeType)) {
            $this->chargeTypes->removeElement($chargeType);
            // set the owning side to null (unless already changed)
            if ($chargeType->getParentType() === $this) {
                $chargeType->setParentType(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Charge[]
     */
    public function getCharges(): Collection
    {
        return $this->charges;
    }

    public function addCharge(Charge $charge): self
    {
        if (!$this->charges->contains($charge)) {
            $this->charges[] = $charge;
            $charge->setType($this);
        }

        return $this;
    }

    public function removeCharge(Charge $charge): self
    {
        if ($this->charges->contains($charge)) {
            $this->charges->removeElement($charge);
            // set the owning side to null (unless already changed)
            if ($charge->getType() === $this) {
                $charge->setType(null);
            }
        }

        return $this;
    }
}
