<?php

namespace App\Http\Actions\Auth;

use App\Http\Requests\SignInRequest;
use Illuminate\Support\Facades\Auth;

class SignIn {

    public function handle(SignInRequest $request) {
        

        try {

            if(!Auth::guard('web')->attempt([
                'email'     => $request->email,
                'password'  => $request->password,
            ])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password, please provide the right credentials and try again',
                    'data'    => []
                ]);
            }

            $user = Auth::user();

            return response()->json([
                'success' => true,
                'message' => 'Sign In Successfull',
                'data'    => [
                    'token' =>  $user->createToken($user->email . env('APP_KEY'))->plainTextToken,
                ]
                ]);

        }
        catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occured, please try again later',
                'data'    => []
            ]);
        }
    }
}