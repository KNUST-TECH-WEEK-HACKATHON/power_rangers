<?php

namespace App\Http\Controllers;

use App\Http\Actions\Upload\GetModel;
use App\Http\Actions\Upload\GetUploads;
use App\Http\Actions\Upload\GetUploadFiles;
use App\Http\Actions\Upload\UploadFiles;
use App\Http\Requests\GetImageRequest;
use App\Http\Requests\GetUploadsRequest;
use App\Http\Requests\GetUploadFilesRequest;
use App\Http\Requests\UploadFilesRequest;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    //

    public function upload(UploadFiles $action, UploadFilesRequest $request) {
        return $action->handle($request);
    }

    public function getUpload(GetUploads $action, GetUploadsRequest $request) {
        return $action->handle($request);
    }

    public function getFiles(GetUploadFiles $action, GetUploadFilesRequest $request) {
        return $action->handle($request);
    }

    public function model(GetModel $action, GetImageRequest $request) {
        return $action->handle($request);
    }
}
