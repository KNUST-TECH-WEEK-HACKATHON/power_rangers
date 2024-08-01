<?php

namespace App\Http\Actions\Upload;

use App\Http\Requests\GetImageRequest;
use App\Http\Resources\DiagnosisResource;
use App\Models\UploadFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GetModel
{
    public function handle(GetImageRequest $request)
    {
        try {
           

            $file = UploadFile::where('id', $request->id)->first();
            
            $imagePath = storage_path( 'app/' . $file->file);
    
            // Make the request to the external API
            $response = Http::attach(
                'image', file_get_contents($imagePath), "modle_update"
            )->post('https://habi.fly.dev/model/submit/');

    
            if ($response->successful()) {
                // $diagnosisData = $response->json();
                
    
                return response()->json([
                    'success' => true,
                    'message' => 'Files Retrieved Successfully',
                    'data'    => []
                ]);

            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Unexpected Error',
                    'data'    => []
                ]);
            }
        } catch (\Exception $exception) {
            report($exception);
            return response()->json([
                'success' => false,
                'message' => 'Unexpected Error',
                'data'    => []
            ]);
        }
    }
    
}