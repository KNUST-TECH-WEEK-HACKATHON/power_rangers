<?php

namespace App\Http\Actions\Upload;

use App\Http\Requests\GetUploadFilesRequest;
use App\Models\UploadFile;
use Illuminate\Support\Facades\Auth;

class GetUploadFiles {

    public function handle(GetUploadFilesRequest $request) {
        

        // return $request;
        // try {

            return response()->json([
                'success' => true,
                'message' => 'Files Retrieved Successfully',
                'data'    => UploadFile::where('user_id', Auth::user()->id)->where('upload_id', $request->upload_id)->get(),
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