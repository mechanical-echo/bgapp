<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            
            $path = base_path('frontend/public/music/' . $request->playlist);
            
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            
            $file->move($path, $filename);
            
            return response()->json([
                'message' => 'File uploaded successfully',
                'path' => 'music/'. $request->playlist .'/' . $filename
            ]);
        }
        
        return response()->json(['message' => 'No file uploaded'], 400);
    }
}