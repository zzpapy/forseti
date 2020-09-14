<?php


namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


class BankinApiManager
{

    const LIMIT = 500;

    private $bankin;

    public function __construct(HttpClientInterface $bankin)
    {
        $this->bankin = $bankin;
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
            foreach ($bank_list['resources'] as $banksByCountry) {
                if ($banksByCountry['country_code'] == $country_code) {
                    return $banksByCountry['parent_banks'];
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

        return (is_null($accountId)) ? $response->toArray()['resources'] : $response->toArray();
    }

    public function getSingleBank($bankId)
    {
        $response = $this->bankin->request('GET', "/v2/banks/$bankId");

        return $response->toArray();
    }

}