<?php
$ar = scandir('imgs');
$imgs = array();
foreach($ar as $filename){
    if(pathinfo($filename, PATHINFO_EXTENSION) =='jpg') $imgs[]= 'js/videopuzzle/imgs/'.$filename;
}
header('Content-Type: application/json');
echo json_encode($imgs);
?>