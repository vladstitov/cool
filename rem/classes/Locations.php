<?php
class Locations {
    var $folder;
    function __construct(){
        $this->folder = $_SERVER['DOCUMENT_ROOT'].'/locations/l_';
    }

    public function process($a,$data){
        if(count($a)<1) return null;
        $result=null;
        switch($a[0]){
            case 'save':
                $result= $this->saveLocation($data);
                break;
            case 'get':
                $result =  $this->getLocation();
                break;

        }

        return $result;
    }
    private function getLocation(){
        if(!isset($_SESSION['ip'])) return null;		
        $filename=$this->folder.$_SESSION['ip'].'.json';
        if(!file_exists( $filename)){
			$res=new stdClass();
			 $res->result= 'not exists';
			 return 	json_encode($res);
		}
        return file_get_contents($filename);
    }
    private function saveLocation($data){
        if(!isset($_SESSION['ip']) || !isset($data['location']))return null;
        $result= new stdClass();
        $filename=$this->folder.$_SESSION['ip'].'.json';
       // $loc=$data['location'];

        if(file_put_contents($filename,json_encode($data)))   $result->result='success';
        else {
            $result->result='fail';
            $result->msg='Can t save '.$filename ;
        }
        return json_encode($result);
    }
} 