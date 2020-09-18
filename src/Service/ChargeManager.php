<?php


namespace App\Service;


use App\Repository\BankAccountRepository;
use App\Repository\ChargeRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\BankinApiManager;
use Symfony\Component\Validator\Constraints\Date;

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
        $bankAccount = $this->accountRepository->find($this->bankAccountId);
        $scm = $bankAccount->getScm();
        $dateSince = $scm->getAccountingExerciceStartAt();
        $dateUntil = $scm->getAccountingExerciceEndAt();


        $transactionList = $this->bankinApiManager->listTransactionsByAccountByDate($this->session->get('bankin_api_auth_token'), $this->bankinAccountId, $dateSince->format('Y-m-d'), $dateUntil->format('Y-m-d'));

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

        $query = $this->chargeRepository->createQueryBuilder('c')->getQuery();
        $charges = $query->getArrayResult();
        $chargeIds = array_column($charges, 'bankin_transaction_id');

        $chargeList = [];

        if (count($transactionList)) {
            foreach ($transactionList as $transac) {
                if ($transac['amount'] < 0 && !in_array($transac['id'],$chargeIds)) {
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

    public function calculatePercentCharge(){
        $bankAccount = $this->accountRepository->find($this->bankAccountId);
        $scm = $bankAccount->getScm();
        $dateStart = date('Y-m-d', strtotime($scm->getAccountingExerciceStartAt()->format('Y-m-d'). '-1 days'));
        $dateEnd = date('Y-m-d', strtotime($scm->getAccountingExerciceEndAt()->format('Y-m-d') . '+1 days'));

        $detailCharge = $this->chargeRepository->getTotalPerChargeType($scm->getId(),$dateStart,$dateEnd);
        $total = $this->chargeRepository->getTotalCharge($scm->getId(),$dateStart,$dateEnd);
        if(count($detailCharge) && !is_null($total)){
            foreach ($detailCharge as $key => $detail){
                $detailCharge[$key]['total'] = abs($detail['total']);
                $detailCharge[$key]['percent'] = round(abs($detail['total'])*100/abs($total));
            }
            return $detailCharge;
        }
        return false;
    }

    public function getChargePerMonthPerType(){
        $bankAccount = $this->accountRepository->find($this->bankAccountId);
        $scm = $bankAccount->getScm();
        $dateStart = date('Y-m-d', strtotime($scm->getAccountingExerciceStartAt()->format('Y-m-d'). '-1 days'));
        $dateEnd = date('Y-m-d', strtotime($scm->getAccountingExerciceEndAt()->format('Y-m-d') . '+1 days'));
        $results = $this->chargeRepository->getTotalChargePerMonthPerType($scm->getId(),$dateStart,$dateEnd);

        $formattedResults = [];
        foreach ($results as $key => $result){
            $formattedResults[$result['label']][$result['mois']] = abs($result['total']);
        }
        return $formattedResults;
    }
}