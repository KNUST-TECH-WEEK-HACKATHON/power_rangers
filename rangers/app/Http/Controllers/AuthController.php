<?php

namespace App\Http\Controllers;

use App\Http\Actions\Auth\SignUp;
use App\Http\Actions\Auth\SignIn;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    public function signIn(SignIn $action, SignInRequest $request) {
        return $action->handle($request);
    }

    public function signUp(SignUp $action, SignUpRequest $request) {
        return $action->handle($request);
    }
}
