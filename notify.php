<?php
include "vmail.inc.php";
date_default_timezone_set("America/Toronto");
$email = urldecode($_GET['email']);
$lat = urldecode($_GET['lat']);
$lng = urldecode($_GET['lng']);

//function vmail($to,$title,$body,$from,$files=null,$info=null,$returnpath='')
$body="$lat, $lng";


vmail($email,'From '.date('Y-n-j g:ia'),$body,'<no-reply@timzhong.com>');
echo "<div id='notice'>Your location has been sent. Thank you.</div>";