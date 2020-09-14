<?php

namespace App\Entity;

use App\Repository\BankAccountRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BankAccountRepository::class)
 */
class BankAccount
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
    private $bank_name;

    /**
     * @ORM\Column(type="integer")
     */
    private $bankin_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $logo_url;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $bankin_account_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $account_name;

    /**
     * @ORM\OneToOne(targetEntity=Scm::class, inversedBy="bankAccount", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $scm;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBankName(): ?string
    {
        return $this->bank_name;
    }

    public function setBankName(string $bank_name): self
    {
        $this->bank_name = $bank_name;

        return $this;
    }

    public function getBankinId(): ?int
    {
        return $this->bankin_id;
    }

    public function setBankinId(int $bankin_id): self
    {
        $this->bankin_id = $bankin_id;

        return $this;
    }

    public function getLogoUrl(): ?string
    {
        return $this->logo_url;
    }

    public function setLogoUrl(?string $logo_url): self
    {
        $this->logo_url = $logo_url;

        return $this;
    }

    public function getBankinAccountId(): ?int
    {
        return $this->bankin_account_id;
    }

    public function setBankinAccountId(?int $bankin_account_id): self
    {
        $this->bankin_account_id = $bankin_account_id;

        return $this;
    }

    public function getAccountName(): ?string
    {
        return $this->account_name;
    }

    public function setAccountName(?string $account_name): self
    {
        $this->account_name = $account_name;

        return $this;
    }

    public function getScm(): ?Scm
    {
        return $this->scm;
    }

    public function setScm(Scm $scm): self
    {
        $this->scm = $scm;

        return $this;
    }
}
