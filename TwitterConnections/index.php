<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <title>Twitter Connections - Codrops </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="stylesheet" href="css/style.css" type="text/css" charset="utf-8"/>
        <script type="text/javascript" src="jquery-1.3.2.js"></script>
    </head>
    <style>
        body{
            margin:0px;
            padding:0px;
            font-family:Arial;
        }
        .content{
            width:700px;
            height:450px;
            margin: 50px auto 10px auto;
            padding:20px;
            background-color:#f0f0f0;
            -moz-border-radius:20px;
            -webkit-border-radius:20px;
            -khtml-border-radius:20px;
            -moz-box-shadow: 0 2px 4px #999;
            -webkit-box-shadow: 0 2px 4px #999;
        }
        .column{
            width:50%;
            margin-top:20px;
            float:left;
        }
        .column p{
            margin:0px 0px 20px 0px;
            padding:5px;
        }
        .logo{
            background:transparent url(100Followers.png) no-repeat top left;
            width:359px;
            height:78px;
            position:absolute;
            top:10px;
            left:300px;
        }
        .button{
            background: #222 url(overlay.png) repeat-x;
            display: inline-block;
            padding: 3px 5px 5px 5px;
            font-size:12px;
            color: #fff;
            text-decoration: none;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-box-shadow: 0 1px 3px #999;
            -webkit-box-shadow: 0 1px 3px #999;
            text-shadow: 0 -1px 1px #222;
            position: relative;
            cursor: pointer;

        }
        .column ul{
            width:250px;
        }
        .column ul li{
            margin:10px;
        }
        .column input{
            border:1px solid #ccc;
            padding:4px 4px 6px 4px;
        }
        .column label{
            font-size:11px;
            font-weight:bold;
            padding:5px;
        }
        .button:hover{
            background-color:#000;
        }
        .footer{
            width:200px;
            margin:4px auto;
        }
        a.back{
            background:transparent url(codrops_back.png) no-repeat center center;
            width:200px;
            height:42px;
            float:left;
        }
    </style>
    <body>
        <div class="logo"></div>
        <div class="content">
            <div class="column">
                <h4>How to use:</h4>
                <ul>
                    <li>Type your username and get your most recent followers or the people you are following</li>
                    <li>Hover over the icons of the users to get more information</li>
                    <li>Navigate through the set using the arrows </li>
                    <li>Click on the refresh button to retrieve the latest set</li>
                </ul>
            </div>
            <div class="column">
                <label>Your Twitter username:</label>
                <p>
					<input id="username" type="text"/>
                    <a class="button" id="followers">Followers</a>
                </p>

                <div class="jf-container">
                    <h5><span id="title" class="username"></span> 
					<span id="refresh" class="refresh" title="refresh"></span></h5>
                    <div id="jf-grid" class="jf-grid">
                        
                    </div>
                    <div class="jf-nav">
                        <a id="rightbtn" class="right" style="display:none;"></a>
                        <a id="leftbtn" class="left" style="display:none;"></a>            
                    </div>
                </div>

            </div>
        </div>
        <div class="footer">
        <a class="back" href="http://www.tympanus.net/"></a>
        </div>
	
	<script src="jquery-1.3.2.js" type="text/javascript"></script>
    <script src="jquery.TwitterConnections.js" type="text/javascript"></script>
	<script src='jquery.qtip-1.0.0-rc3.min.js' type='text/javascript'></script>
    <script>
        $("#followers").TwitterConnections({
			//screen_name         	: 'codrops', 	
			type                	: 'Followers'
		});
    </script>	
    </body>
</html>