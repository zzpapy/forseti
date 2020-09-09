<?php

namespace App\Entity;

use App\Repository\ScmRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScmRepository::class)
 */
class Scm
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $logo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $company_name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="integer")
     */
    private $zip_code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $siret;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $siren;

    /**
     * @ORM\Column(type="datetime")
     */
    private $accountingExerciceStartAt;

    /**
     * @ORM\Column(type="datetime")
     */
    private $accountingExerciceEndAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ref_local;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $invariant_local;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $local_owner;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $local_siren;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $typeTenantOwner;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $amountAnuallyRent;

    /**
     * @ORM\Column(type="integer")
     */
    private $AmountPreviousYearAccountingCharge;

    /**
     * @ORM\Column(type="integer")
     */
    private $min_assoc;

    /**
     * @ORM\Column(type="integer")
     */
    private $max_assoc;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="scm", orphanRemoval=true)
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Charge::class, mappedBy="scm", orphanRemoval=true)
     */
    private $charges;

    /**
     * @ORM\Column(type="integer")
     */
    private $forecast_charge;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $phone;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->charges = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getCompanyName(): ?string
    {
        return $this->company_name;
    }

    public function setCompanyName(string $company_name): self
    {
        $this->company_name = $company_name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipCode(): ?int
    {
        return $this->zip_code;
    }

    public function setZipCode(int $zip_code): self
    {
        $this->zip_code = $zip_code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getSiren(): ?string
    {
        return $this->siren;
    }

    public function setSiren(string $siren): self
    {
        $this->siren = $siren;

        return $this;
    }

    public function getAccountingExerciceStartAt(): ?\DateTimeInterface
    {
        return $this->accountingExerciceStartAt;
    }

    public function setAccountingExerciceStartAt(\DateTimeInterface $accountingExerciceStartAt): self
    {
        $this->accountingExerciceStartAt = $accountingExerciceStartAt;

        return $this;
    }

    public function getAccountingExerciceEndAt(): ?\DateTimeInterface
    {
        return $this->accountingExerciceEndAt;
    }

    public function setAccountingExerciceEndAt(\DateTimeInterface $accountingExerciceEndAt): self
    {
        $this->accountingExerciceEndAt = $accountingExerciceEndAt;

        return $this;
    }

    public function getRefLocal(): ?string
    {
        return $this->ref_local;
    }

    public function setRefLocal(string $ref_local): self
    {
        $this->ref_local = $ref_local;

        return $this;
    }

    public function getInvariantLocal(): ?string
    {
        return $this->invariant_local;
    }

    public function setInvariantLocal(string $invariant_local): self
    {
        $this->invariant_local = $invariant_local;

        return $this;
    }

    public function getLocalOwner(): ?string
    {
        return $this->local_owner;
    }

    public function setLocalOwner(string $local_owner): self
    {
        $this->local_owner = $local_owner;

        return $this;
    }

    public function getLocalSiren(): ?string
    {
        return $this->local_siren;
    }

    public function setLocalSiren(string $local_siren): self
    {
        $this->local_siren = $local_siren;

        return $this;
    }

    public function getTypeTenantOwner(): ?string
    {
        return $this->typeTenantOwner;
    }

    public function setTypeTenantOwner(string $typeTenantOwner): self
    {
        $this->typeTenantOwner = $typeTenantOwner;

        return $this;
    }

    public function getAmountAnuallyRent(): ?int
    {
        return $this->amountAnuallyRent;
    }

    public function setAmountAnuallyRent(?int $amountAnuallyRent): self
    {
        $this->amountAnuallyRent = $amountAnuallyRent;

        return $this;
    }

    public function getAmountPreviousYearAccountingCharge(): ?int
    {
        return $this->AmountPreviousYearAccountingCharge;
    }

    public function setAmountPreviousYearAccountingCharge(int $AmountPreviousYearAccountingCharge): self
    {
        $this->AmountPreviousYearAccountingCharge = $AmountPreviousYearAccountingCharge;

        return $this;
    }

    public function getMinAssoc(): ?int
    {
        return $this->min_assoc;
    }

    public function setMinAssoc(int $min_assoc): self
    {
        $this->min_assoc = $min_assoc;

        return $this;
    }

    public function getMaxAssoc(): ?int
    {
        return $this->max_assoc;
    }

    public function setMaxAssoc(int $max_assoc): self
    {
        $this->max_assoc = $max_assoc;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setScm($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getScm() === $this) {
                $user->setScm(null);
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
            $charge->setScm($this);
        }

        return $this;
    }

    public function removeCharge(Charge $charge): self
    {
        if ($this->charges->contains($charge)) {
            $this->charges->removeElement($charge);
            // set the owning side to null (unless already changed)
            if ($charge->getScm() === $this) {
                $charge->setScm(null);
            }
        }

        return $this;
    }

    public function getForecastCharge(): ?int
    {
        return $this->forecast_charge;
    }

    public function setForecastCharge(int $forecast_charge): self
    {
        $this->forecast_charge = $forecast_charge;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(?int $phone): self
    {
        $this->phone = $phone;

        return $this;
    }
}
