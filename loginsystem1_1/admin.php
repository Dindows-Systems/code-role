<?php
require_once("php/core.php");

$objCore = new Core();

$objCore->initSessionInfo();
$objCore->initFormController();

if($objCore->getSessionInfo()->isLoggedIn() && $objCore->isAdmin()){
  	$usersdata = $objCore->getUsersData(); 
  	echo "<a href=\"php/corecontroller.php?logoutaction=1\">[Logout]</a>";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN">
<html>
    <head>
        <title>PHP Login System</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">      
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script type="text/javascript" language="javascript" src="javascript/jquery-1.3.2.js"></script>
        <script type="text/javascript" language="javascript" src="javascript/admin.js"></script>
        <script type="text/javascript" src="http://www.google.com/jsapi"></script>
  		<script type="text/javascript">
    		google.load('visualization', '1', {packages: ['geomap']});
    	</script>
    </head>

    <body>
		<a href="public_html" class="backlink">Back</a>
		<h1>Admin Panel</h1>
		<div id="adminpanel" class="adminpanel">
	        
        	
			<h3>Registered Users Data - <span id="countusers"><?php echo count($usersdata)?></span> Registered Users</h3>
			<div id="mapstart" style="cursor:pointer;">map</div>
			<div id="visualization" class="map" style="display:none;" style="height:370px;"></div>
			<br/>
			<?php if(count($usersdata)>0){?>
			<table id="userslist" class="admin">
			<thead>
        	<tr>
        		<th>
        			email
        		</th>
        		<th>
        			name
        		</th>
        		<th>
        			country
        		</th>
        		<th>
        			ip
        		</th>
        		<th>
        			no. of logins
        		</th>
        		<th>
        			signup date
        		</th>
        		<th>
        			blocked
        		</th>
        		<th>
        			admin
        		</th>
        		
        	</tr>
			</thead>
			<tbody>
			<?php 
        	for ($i=0;$i<count($usersdata);$i++){
        		if($usersdata[$i]['usr_is_blocked']=='1'){?>
        			<tr id="tr_<?php echo $usersdata[$i]['pk_user'];?>" class="statusblocked"> 
        		<?php }
        		else{
        			if($usersdata[$i]['usr_is_admin']=='1'){
        			?>
        				<tr id="tr_<?php echo $usersdata[$i]['pk_user'];?>" class="statusadmin">
        			<?php }else{?>
        				<tr id="tr_<?php echo $usersdata[$i]['pk_user'];?>">
        			<?php }}?>	 
        		
        		<td>
        			<?php echo $usersdata[$i]['email']; ?>
        		</td>
        		<td>
        			<?php echo $usersdata[$i]['flname']; ?>
        		</td>
        		<td>
        			<?php echo $usersdata[$i]['country_name']; ?>
        		</td>
        		<td>
        			<?php echo $usersdata[$i]['usr_ip']; ?>
        		</td>
        		<td>
        			<?php echo $usersdata[$i]['usr_nmb_logins']; ?>
        		</td>
        		<td>
        			<?php echo $usersdata[$i]['usr_signup_date']; ?>
        		</td>
        		<td>
        			<div class="admin_no"><?php echo $usersdata[$i]['usr_is_blocked']; ?></div>
        			<div class="_op_admin admin_change"></div>
        			<input type="hidden" value="<?php echo $usersdata[$i]['pk_user'];?>" />
        			<input type="hidden" value="block" />
        		</td>
        		<td>
        			<div class="admin_no"><?php echo $usersdata[$i]['usr_is_admin']; ?></div>
        			<div class="_op_admin admin_change"></div>
        			<input type="hidden" value="<?php echo $usersdata[$i]['pk_user'];?>" />
        			<input type="hidden" value="admin" />
        		</td>
        		<td>
        			<div class="_op_admin admin_delete"></div>
        			<input type="hidden" value="<?php echo $usersdata[$i]['pk_user'];?>" />
        			<input type="hidden" value="delete" />
        		</td>
        	</tr>
        	<?php
        	}	
        	?>
			</tbody>
        	</table>
        	<?php }?>
        </div>
        
        
	</body>
		
    
</html>
<?php	
}
else{
  	header("Location: public_html/index.php");
}
unset($objCore);
?>