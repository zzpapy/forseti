<?php


namespace App\Service;


use App\Repository\BankAccountRepository;
use App\Repository\ChargeRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\BankinApiManager;

class ChargeManager
{
    private $session;

    private $bankinApiManager;

    private $chargeRepository;
    private $accountRepository;

    private $bankAccountId;
    private $bankinAccountId;

    public function __construct(BankinApiManager $bankinApiManager, SessionInterface $session, ChargeRepository $chargeRepository, BankAccountRepository $accountRepository)
    {
        $this->session = $session;

        $this->bankinApiManager = $bankinApiManager;

        $this->chargeRepository = $chargeRepository;
        $this->accountRepository = $accountRepository;

        $this->bankAccountId = $this->session->get('bank_account_id');
        $this->bankinAccountId = $this->session->get('bankin_account_id');
    }

    public function getTransactionToSynchronise($filter = null)
    {

        $charges = $this->chargeRepository->findBy(['bank_account' => $this->bankAccountId], ['payedAt' => 'DESC']);

        if (count($charges)) {
            $dateSince = $charges[0]->getPayedAt();
        } else {
            $bankAccount = $this->accountRepository->find($this->bankAccountId);
            $scm = $bankAccount->getScm();
            $dateSince = $scm->getAccountingExerciceStartAt();
        }

        $transactionList = $this->bankinApiManager->listTransactionsByAccountByDate($this->session->get('bankin_api_auth_token'), $this->bankinAccountId, $dateSince->format('Y-m-d'));

        switch ($filter) {
            case 'onlyCharge':
                return $this->filterOnlyCharge($transactionList);
            case 'onlyRecette':
                return $this->filterOnlyRecette($transactionList);
            default :
                return $transactionList;
        }
    }

    private function filterOnlyCharge($transactionList)
    {

        $chargeList = [];

        if (count($transactionList)) {

            foreach ($transactionList as $transac) {
                if ($transac['amount'] < 0) {
                    $chargeList[] = [
                        'id' => $transac['id'],
                        'amount' => $transac['amount'],
                        'date' => $transac['date'],
                        'description' => $transac['description'],
                    ];
                }
            }
        }
        return $chargeList;
    }

    private function filterOnlyRecette($transactionList)
    {

        $chargeList = [];

        if (count($transactionList)) {

            foreach ($transactionList as $transac) {
                if ($transac['amount'] > 0) {
                    $chargeList[] = $transac;
                }
            }
        }
        return $chargeList;
    }
}