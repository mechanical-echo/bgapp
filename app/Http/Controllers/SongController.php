<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use getID3;

class SongController extends Controller
{
    public function getMorning()
    {
        $path = base_path('frontend/public/music/morning');   
        return $this->getSongs($path);
    }

    public function getDay()
    {
        $path = base_path('frontend/public/music/day');   
        return $this->getSongs($path);
    }

    public function getNight()
    {
        $path = base_path('frontend/public/music/night');   
        return $this->getSongs($path);
    }

    public function getSongs(string $path){

        $files = File::files($path);
        
        $songs = [];
        $getID3 = new getID3();
        
        foreach ($files as $file) {
            if ($file->getExtension() === 'mp3') {
                $fileInfo = $getID3->analyze($file->getPathname());
                
                $imageData = null;
                if (!empty($fileInfo['comments']['picture'][0]['data'])) {
                    $imageData = base64_encode($fileInfo['comments']['picture'][0]['data']);
                    $mimeType = $fileInfo['comments']['picture'][0]['image_mime'];
                }
                
                // Extract duration
                $duration = isset($fileInfo['playtime_seconds']) ? round($fileInfo['playtime_seconds']) : null;
                
                $songs[] = [
                    'filename' => $file->getFilenameWithoutExtension(),
                    'title' => $fileInfo['tags']['id3v2']['title'][0] ?? null,
                    'artist' => $fileInfo['tags']['id3v2']['artist'][0] ?? null,
                    'album' => $fileInfo['tags']['id3v2']['album'][0] ?? null,
                    'coverArt' => $imageData ? "data:$mimeType;base64,$imageData" : null,
                    'duration' => $duration, // Add duration here
                    'selected' => false,
                ];
            }
        }

        return response()->json($songs);
    }
}