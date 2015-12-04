<?php
if(!isset($_GET['url'])) exit;
$url=$_GET['url'];
$c=curl_init($url);
//curl_setopt ($c, CURLOPT_HEADER, 0);
$out=curl_exec($c);
// curl_close($c);
 
// echo $url;
?>