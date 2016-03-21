<?php

$objMapPhoto = new MapPhoto();
$objMapPhoto->getPlaces();

class MapPhoto{

	public function __construct(){ }
	
	public function getPlaces(){
		
		$album 		= simplexml_load_file('album.xml');
		
		$albumName	= $album->name;
		$description= $album->description;
		
		foreach( $album->places->place as $place )
		{
			
			$location 		= $place->location;
			$lat 			= $location->lat;
			$lng 			= $location->lng;
			
			$name			= $place->name;
			
			$photosArr		= array();
			foreach( $place->photos->photo as $photo )
			{
				$photosArr[]	= array(
					'index'			=> (integer)count($photosArr),
					'thumb' 		=> (string)$photo->thumb,
					'source' 		=> (string)$photo->source,
					'description' 	=> (string)$photo->description,
					'lat'			=> (float)$photo->location->lat,
					'lng'			=> (float)$photo->location->lng
				);
			}
			
			$placesArr[]	= array( 'name' => (string)$name, 'lat' => (float)$lat, 'lng' => (float)$lng, 'photos' => $photosArr );
			
		}
		
		$encoded = json_encode( array( 'name' => (string)$albumName, 'description' => (string)$description, 'places' => $placesArr ) );
		echo $encoded;

	}
}