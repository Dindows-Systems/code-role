<?php
require_once('class.twitter.php');
$twitter = new Twitter($_GET['screen_name']);
$twitter->getRGB();
?>