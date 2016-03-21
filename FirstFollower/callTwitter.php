<?php
require_once('class.TwitterFirstFollower.php');
$twitter = new TwitterFirstFollower($_GET['screen_name']);
$twitter->getFirstFollower();
?>