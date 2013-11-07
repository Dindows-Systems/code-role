<?php
$location 	= 'albums';
$album_name	= $_GET['album_name'];
$files 		= glob($location . '/' . $album_name . '/*.{jpg,gif,png}', GLOB_BRACE);
$encoded 	= json_encode($files);
echo $encoded;
unset($encoded);