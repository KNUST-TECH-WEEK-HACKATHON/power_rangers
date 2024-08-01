<?php

namespace App\Http\Actions\Upload;

use App\Http\Requests\UploadFilesRequest;
use App\Models\Upload;
use App\Models\UploadFile;
use Illuminate\Support\Facades\Auth;

class UploadFiles {

    public function handle(UploadFilesRequest $request) {
        

        // return $request;
        // try {

            $count = Upload::where('user_id', Auth::user()->id)->count();

            $upload = Upload::create([
                'name' => 'upload_' . ($count + 1),
                'user_id' => Auth::user()->id,
            ]);


            foreach ($request->file('files') as $file) {
                if ($path = $file->store('uploads')) {
                    UploadFile::create([
                        'user_id' => Auth::user()->id,
                        'upload_id' => $upload->id,
                        'file' => $path,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Files Uploaded Successfully',
                'data'    => []
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