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
    private $raison_sociale;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $adresse;

    /**
     * @ORM\Column(type="integer")
     */
    private $cp;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ville;

    /**
     * @ORM\Column(type="bigint")
     */
    private $siret;

    /**
     * @ORM\Column(type="bigint")
     */
    private $siren;

    /**
     * @ORM\Column(type="datetime")
     */
    private $debut_ex_compta;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fin_ex_compta;

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
    private $proprieter_local;

    /**
     * @ORM\Column(type="bigint")
     */
    private $siren_local;

    /**
     * @ORM\Column(type="boolean")
     */
    private $type_occup;

    /**
     * @ORM\Column(type="float")
     */
    private $mt_loyer_annu;

    /**
     * @ORM\Column(type="float")
     */
    private $mt_prev_charges;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $total_charge_annee_precedente;

    /**
     * @ORM\Column(type="integer")
     */
    private $min_assoc;

    /**
     * @ORM\Column(type="integer")
     */
    private $max_assoc;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $telephone;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="scm", orphanRemoval=true)
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Charge::class, mappedBy="scm", orphanRemoval=true)
     */
    private $charges;

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

    public function getRaisonSociale(): ?string
    {
        return $this->raison_sociale;
    }

    public function setRaisonSociale(string $raison_sociale): self
    {
        $this->raison_sociale = $raison_sociale;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCp(): ?int
    {
        return $this->cp;
    }

    public function setCp(int $cp): self
    {
        $this->cp = $cp;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getSiret(): ?int
    {
        return $this->siret;
    }

    public function setSiret(int $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    public function getSiren(): ?int
    {
        return $this->siren;
    }

    public function setSiren(int $siren): self
    {
        $this->siren = $siren;

        return $this;
    }

    public function getDebutExCompta(): ?\DateTimeInterface
    {
        return $this->debut_ex_compta;
    }

    public function setDebutExCompta(\DateTimeInterface $debut_ex_compta): self
    {
        $this->debut_ex_compta = $debut_ex_compta;

        return $this;
    }

    public function getFinExCompta(): ?\DateTimeInterface
    {
        return $this->fin_ex_compta;
    }

    public function setFinExCompta(\DateTimeInterface $fin_ex_compta): self
    {
        $this->fin_ex_compta = $fin_ex_compta;

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

    public function getProprieterLocal(): ?string
    {
        return $this->proprieter_local;
    }

    public function setProprieterLocal(string $proprieter_local): self
    {
        $this->proprieter_local = $proprieter_local;

        return $this;
    }

    public function getSirenLocal(): ?int
    {
        return $this->siren_local;
    }

    public function setSirenLocal(int $siren_local): self
    {
        $this->siren_local = $siren_local;

        return $this;
    }

    public function getTypeOccup(): ?bool
    {
        return $this->type_occup;
    }

    public function setTypeOccup(bool $type_occup): self
    {
        $this->type_occup = $type_occup;

        return $this;
    }

    public function getMtLoyerAnnu(): ?float
    {
        return $this->mt_loyer_annu;
    }

    public function setMtLoyerAnnu(float $mt_loyer_annu): self
    {
        $this->mt_loyer_annu = $mt_loyer_annu;

        return $this;
    }

    public function getMtPrevCharges(): ?float
    {
        return $this->mt_prev_charges;
    }

    public function setMtPrevCharges(float $mt_prev_charges): self
    {
        $this->mt_prev_charges = $mt_prev_charges;

        return $this;
    }

    public function getTotalChargeAnneePrecedente(): ?float
    {
        return $this->total_charge_annee_precedente;
    }

    public function setTotalChargeAnneePrecedente(?float $total_charge_annee_precedente): self
    {
        $this->total_charge_annee_precedente = $total_charge_annee_precedente;

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

    public function getTelephone(): ?int
    {
        return $this->telephone;
    }

    public function setTelephone(?int $telephone): self
    {
        $this->telephone = $telephone;

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
}
