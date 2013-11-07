<?php
require_once('class.twitter100.php');
$twitter = new Twitter100($_GET['screen_name']);
$twitter->getUsers($_GET['type']);
?>