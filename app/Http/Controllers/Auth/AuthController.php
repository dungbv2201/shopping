<?php

namespace App\Http\Controllers\Auth;

use App\User;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $http = new Client();

        try {
            $response = $http->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username'      => $request->email,
                    'password'      => $request->password
                ]
            ]);
            $user     = User::where('email', $request->email)->first();
            return response()->json([
                                        'user' => $user,
                                        'auth' => json_decode($response->getBody())
                                    ]);
        } catch (BadResponseException $exception) {
            if ($exception->getCode() === 400) {
                return response()->json('Invalid request.Please enter username or password', $exception->getCode());
            }
            if ($exception->getCode() === 401) {
                return response()->json('Your credentials is incorrect. Please try again', $exception->getCode());
            }
            return response()->json('Some thing went wrong in the server', $exception->getCode());
        }
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json('Logged out successfully!');
    }
}
