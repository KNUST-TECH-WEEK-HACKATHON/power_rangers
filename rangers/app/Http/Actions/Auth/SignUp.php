<?php

namespace App\Http\Actions\Auth;

use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SignUp {

    public function handle(SignUpRequest $request) {
        

        try {

            $user = User::create([
                'email' => $request->email,
                'password' => $request->password,
                'name' => $request->name,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Sign In Successfull',
                'data'    => [
                    'token' => $user->createToken($user->email . env('APP_KEY'))->plainTextToken,
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