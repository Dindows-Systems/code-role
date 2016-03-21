<?
require_once("constants.php");

class DB{
	
	private $link;
	
	public function __construct(){
		$this->link = mysqli_connect(DB_SERVER, DB_USER, DB_PASS,DB_NAME);
		if (mysqli_connect_errno()) {
			exit();
		}
	}
	
	public function __destruct() {
		$this->disconnect();
	}
	
	public function disconnect(){
		mysqli_close($this->link);
	}

	public function execute(){
		if(isset($_GET['load'])){
			$this->processLoadConfiguration();
		}
		else if(isset($_GET['save'])){ 
			if(isset($_GET['bgred'])&&isset($_GET['bggreen'])&&isset($_GET['bgblue']))
				$this->processSaveConfiguration("body",$_GET['bgred'],$_GET['bggreen'],$_GET['bgblue']);
			elseif(isset($_GET['spanred'])&&isset($_GET['spangreen'])&&isset($_GET['spanblue'])&&isset($_GET['spansize']))
				$this->processSaveConfiguration("span",$_GET['spanred'],$_GET['spangreen'],$_GET['spanblue'],$_GET['spansize']);
			elseif(isset($_GET['h1red'])&&isset($_GET['h1green'])&&isset($_GET['h1blue'])&&isset($_GET['h1size']))
				$this->processSaveConfiguration("h1",$_GET['h1red'],$_GET['h1green'],$_GET['h1blue'],$_GET['h1size']);			
			elseif(isset($_GET['h2red'])&&isset($_GET['h2green'])&&isset($_GET['h2blue'])&&isset($_GET['h2size']))
				$this->processSaveConfiguration("h2",$_GET['h2red'],$_GET['h2green'],$_GET['h2blue'],$_GET['h2size']);
			elseif(isset($_GET['h3red'])&&isset($_GET['h3green'])&&isset($_GET['h3blue'])&&isset($_GET['h3size']))
				$this->processSaveConfiguration("h3",$_GET['h3red'],$_GET['h3green'],$_GET['h3blue'],$_GET['h3size']);
			elseif(isset($_GET['pred'])&&isset($_GET['pgreen'])&&isset($_GET['pblue'])&&isset($_GET['psize']))
				$this->processSaveConfiguration("p",$_GET['pred'],$_GET['pgreen'],$_GET['pblue'],$_GET['psize']);
			elseif(isset($_GET['containerred'])&&isset($_GET['containergreen'])&&isset($_GET['containerblue']))
				$this->processSaveConfiguration("container",$_GET['containerred'],$_GET['containergreen'],$_GET['containerblue']);
			elseif(isset($_GET['bgimage']))
				$this->processSaveConfiguration("bgimage","","","","",$_GET['bgimage']);
									
		}
		else{
			header("Location: ../slider/index.php");
		}
	}
	
	public function processLoadConfiguration(){
		$key = $this->ip_address_to_number($this->getRealIpAddr());
		$testq = "select * from config WHERE pk_user = '$key'";
		$res = mysqli_query($this->link,$testq);
		if(!$res || (mysqli_num_rows($res) < 1)){
			mysqli_free_result($res);
			$testqinsert = "INSERT INTO config(pk_user) VALUES('$key')";
			mysqli_query($this->link,$testqinsert);
		}
		
		$query = "SELECT * FROM config WHERE pk_user = '$key'";		
		$results = mysqli_query($this->link,$query);
		
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			$json = array("result" => -1);
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
			return;
		}
		/* Return result array */
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		mysqli_free_result($results);
		
		$json = array(
				"result" => 1, 
				"style" => array(
							array("color" => "bgred","value"     		=> $dbarray['bgred']),
							array("color" => "bggreen","value"   		=> $dbarray['bggreen']),
							array("color" => "bgblue","value"    		=> $dbarray['bgblue']),
							array("color" => "spanred","value"   		=> $dbarray['spanred']),
							array("color" => "spangreen","value" 		=> $dbarray['spangreen']),
							array("color" => "spanblue","value"  		=> $dbarray['spanblue']),
							array("size"  => "spansize","value"  		=> $dbarray['spansize']),
							array("color" => "h1red","value"     		=> $dbarray['h1red']),
							array("color" => "h1green","value"   		=> $dbarray['h1green']),
							array("color" => "h1blue","value"    		=> $dbarray['h1blue']),
							array("size"  => "h1size","value"    		=> $dbarray['h1size']),
							array("color" => "h2red","value"     		=> $dbarray['h2red']),
							array("color" => "h2green","value"  		=> $dbarray['h2green']),
							array("color" => "h2blue","value"    		=> $dbarray['h2blue']),
							array("size"  => "h2size","value"    		=> $dbarray['h2size']),
							array("color" => "h3red","value"     		=> $dbarray['h3red']),
							array("color" => "h3green","value"   		=> $dbarray['h3green']),
							array("color" => "h3blue","value"    		=> $dbarray['h3blue']),
							array("size"  => "h3size","value"    		=> $dbarray['h3size']),
							array("color" => "pred","value"     		=> $dbarray['pred']),
							array("color" => "pgreen","value"    		=> $dbarray['pgreen']),
							array("color" => "pblue","value"     		=> $dbarray['pblue']),
							array("size"  => "psize","value"     		=> $dbarray['psize']),
							array("color" => "containerred","value" 	=> $dbarray['containerred']),
							array("color" => "containergreen","value" 	=> $dbarray['containergreen']),
							array("color" => "containerblue","value" 	=> $dbarray['containerblue']),
							array("bgimage" => "bgimage","value" 		=> $dbarray['bgimage'])
							)
				);
							
		$encoded = json_encode($json);
		echo $encoded;
		unset($encoded);
	}

	public function processSaveConfiguration($elem,$red,$green,$blue,$size = 0,$bgimage){
			$key = $this->ip_address_to_number($this->getRealIpAddr());
			
			$query="";
			switch($elem){
				case "body":
					$query = "update config set bgred = '$red' ,bggreen = '$green',bgblue = '$blue' WHERE pk_user = '$key'";
					break;
				case "span":
					$query = "update config set spanred = '$red' ,spangreen = '$green',spanblue = '$blue', spansize = '$size' WHERE pk_user = '$key'";
					break;
				case "h1":
					$query = "update config set h1red = '$red' ,h1green = '$green',h1blue = '$blue', h1size = '$size' WHERE pk_user = '$key'";
					break;
				case "h2":
					$query = "update config set h2red = '$red' ,h2green = '$green',h2blue = '$blue', h2size = '$size' WHERE pk_user = '$key'";
					break;
				case "h3":
					$query = "update config set h3red = '$red' ,h3green = '$green',h3blue = '$blue', h3size = '$size' WHERE pk_user = '$key'";
					break;
				case "p":
					$query = "update config set pred = '$red' ,pgreen = '$green',pblue = '$blue', psize = '$size' WHERE pk_user = '$key'";
					break;	
				case "container":
					$query = "update config set containerred = '$red' ,containergreen = '$green',containerblue = '$blue' WHERE pk_user = '$key'";
					break;	
				case "bgimage":
					$query = "update config set bgimage = '$bgimage' WHERE pk_user = '$key'";
					break;				
				default:
					$query = "update config set bgred = '$red' ,bggreen = '$green',bgblue = '$blue' WHERE pk_user = '$key'";		
			}
			
			mysqli_query($this->link,$query);
			
			if(mysqli_errno($this->link)){
				$json = array("result" => -1);
				$encoded = json_encode($json);
				echo $encoded;
				unset($encoded);
			}
			else{
				$json = array("result" => 1);
				$encoded = json_encode($json);
				echo $encoded;
				unset($encoded);
			}
	}
	
	public function getRealIpAddr(){
	    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
	    {
	      $ip=$_SERVER['HTTP_CLIENT_IP'];
	    }
	    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
	    {
	      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
	    }
	    else
	    {
	      $ip=$_SERVER['REMOTE_ADDR'];
	    }
	    return $ip;
	}
	public function ip_address_to_number($IPaddress){
		if ($IPaddress == "") {
		return 0;
		} else {
		$ips = split ("\.", "$IPaddress");
		return ($ips[3] + $ips[2] * 256 + $ips[1] * 256 * 256 + $ips[0] * 256 * 256 * 256);
		}
	}

}; 
?>
