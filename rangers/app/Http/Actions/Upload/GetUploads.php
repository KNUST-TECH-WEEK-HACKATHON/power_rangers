<?php

namespace App\Http\Actions\Upload;

use App\Http\Requests\GetUploadsRequest;
use App\Http\Requests\UploadFilesRequest;
use App\Models\Upload;
use Illuminate\Support\Facades\Auth;

class GetUploads {

    public function handle(GetUploadsRequest $request) {
        

        // return $request;
        // try {


            return response()->json([
                'success' => true,
                'message' => 'Files retrieved Successfully',
                'data'    => Upload::where('user_id', Auth::user()->id)->get(),
            ]);

        // }
        // catch(\Exception $e) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'An error occured, please try again later',
        //         'data'    => []
        //     ]);
        // }
    }
}