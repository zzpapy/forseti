<?php


namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class BankinApiManager
{

    const LIMIT = 500;

    private $bankin;
    private $urlGenerator;

    public function __construct(HttpClientInterface $bankin, UrlGeneratorInterface $urlGenerator)
    {
        $this->bankin = $bankin;
        $this->urlGenerator = $urlGenerator;
    }

    public function createApiUser(string $email, string $password)
    {
        $response = $this->bankin->request('POST', '/v2/users', [
            'json' => ['email' => $email,
                'password' => $password,],
        ]);

        return $response->toArray();
    }

    public function authenticateApiUser(string $email, string $password)
    {
        $response = $this->bankin->request('POST', '/v2/authenticate', [
            'json' => ['email' => $email,
                'password' => $password,],
        ]);

        return $response->toArray();
    }

    public function listAllBanks($country_code = 'FR', $paginate = false, $next_url = "")
    {

        if ($paginate) {
            $response = $this->bankin->request('GET', $next_url);
        } else {
            $response = $this->bankin->request('GET', '/v2/banks?limit=500');
        }

        $bank_list = $response->toArray();

        if (isset($bank_list['resources'])) {

            $bankListPrettyfied = [];

            foreach ($bank_list['resources'] as $banksByCountry) {
                if ($banksByCountry['country_code'] == $country_code) {
                    foreach ($banksByCountry['parent_banks'] as $key => $parentBank) {
                        $bankListPrettyfied[$key]['text'] = $parentBank['name'];
                        $bankListPrettyfied[$key]['selectable'] = false;
                        foreach ($parentBank['banks'] as $childkey => $childBank) {
                            $bankListPrettyfied[$key]['nodes'][$childkey]['href'] = $this->urlGenerator->generate('setbank_bankin_app', array('bankid' => $childBank['id']));
                            $bankListPrettyfied[$key]['nodes'][$childkey]['text'] = $childBank['name'];
                        }
                    }

                    return json_encode($bankListPrettyfied);
                }
            }
        }
        return null;
    }

    public function connectItem($authToken, $bankId)
    {
        $response = $this->bankin->request('GET', "/v2/connect/items/add/url?bank_id=$bankId", [
            'headers' => [
                'Authorization' => "Bearer $authToken",
            ]
        ]);

        return $response->toArray()['redirect_url'];
    }

    public function listAccounts($authToken, $accountId = null)
    {
        $response = $this->bankin->request('GET', (is_null($accountId)) ? "/v2/accounts" : "/v2/accounts/$accountId", [
            'headers' => [
                'Authorization' => "Bearer $authToken",
            ]
        ]);

        if (isset($response->toArray()['resources'])) {
            $accountListPrettyfied = [];
            foreach ($response->toArray()['resources'] as $key => $account) {
                $accountListPrettyfied[$key]['text'] = $account['name'];
                $accountListPrettyfied[$key]['href'] = $this->urlGenerator->generate('saveaccount_bankin_app', ['accountid' => $account['id']]);
            }
        }

        return (is_null($accountId)) ? json_encode($accountListPrettyfied) : $response->toArray();
    }

    public function getSingleBank($bankId)
    {
        $response = $this->bankin->request('GET', "/v2/banks/$bankId");

        return $response->toArray();
    }

    public function listTransactionsByAccountByDate($authToken, $bankAccountId, $dateSince, $dateUntil, $limit = 500, $paginateUrl = false)
    {
        $url = ($paginateUrl !== false)?  $paginateUrl : "/v2/accounts/$bankAccountId/transactions?limit=$limit&since=$dateSince&until=$dateUntil";

        $response = $this->bankin->request('GET', $url, [
            'headers' => [
                'Authorization' => "Bearer $authToken"
            ]
        ]);

        $result = $response->toArray()['resources'];

        if(isset($response->toArray()['pagination']) && isset($response->toArray()['pagination']['next_uri']) && !is_null($response->toArray()['pagination']['next_uri'])){
            $result = array_merge($result, $this->listTransactionsByAccountByDate($authToken, $bankAccountId, $dateSince, $dateUntil, $limit, $response->toArray()['pagination']['next_uri']));
        }

        return $result;
    }

    public function getTransaction($authToken, $transactionId){

        $response = $this->bankin->request('GET', "/v2/transactions/$transactionId", [
            'headers' => [
                'Authorization' => "Bearer $authToken"
            ]
        ]);

        return $response->toArray();
    }

}