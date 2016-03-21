<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <title>PHP/MySQL Contact Form with jQuery</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="description" content="PHP/MySQL Contact Form with jQuery" />
        <meta name="keywords" content="contact form, php, mysql, jquery" />
        <link rel="stylesheet" href="css/style2.css" type="text/css" media="screen"/>
        <style>
            a.back{
                width:184px;
                height:32px;
                position:absolute;
                bottom:10px;
                left:10px;
                background:transparent url(back.png) no-repeat top left;
            }
            a.switchstyle{
                width:184px;
                height:32px;
                position:absolute;
                top:10px;
                left:10px;
                background:transparent url(switchstyle.png) no-repeat top left;
            }
        </style>
    </head>
    <body>
        <div id="contact">
            <h1>Contact us</h1>
            <form id="ContactForm" action="">
                <p>
                    <label>Name</label>
                    <input id="name" name="name" class="inplaceError" maxlength="120" type="text" autocomplete="off"/>
					<span class="error" style="display:none;"></span>
                </p>
                <p>
                    <label>Email</label>
                    <input id="email" name="email" class="inplaceError" maxlength="120" type="text" autocomplete="off"/>
					<span class="error" style="display:none;"></span>
                </p>
                <p>
                    <label>Website<span>(optional)</span></label>
                    <input id="website" name="website" class="inplaceError" maxlength="120" type="text" autocomplete="off"/>
                </p>
                <p>
                    <label>Your message<br /> <span>300 characters allowed</span></label>
                    <textarea id="message" name="message" class="inplaceError" cols="6" rows="5" autocomplete="off"></textarea>
					<span class="error" style="display:none;"></span>
                </p>
                <p class="submit">
                    <input id="send" type="button" value="Submit"/>
                    <span id="loader" class="loader" style="display:none;"></span>
					<span id="success_message" class="success"></span>
                </p>
				<input id="newcontact" name="newcontact" type="hidden" value="1"></input>
            </form>
        </div>
        <div class="envelope">
            <img id="envelope" src="images/envelope.png" alt="envelope" width="246" height="175" style="display:none;"/>
        </div>
        <div><a class="back" href="http://tympanus.net/codrops"></a></div>
        <div><a class="switchstyle" href="index1.php"></a></div>
        <!-- The JavaScript -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script src="javascript/jquery.contact.js" type="text/javascript"></script>
    </body>
</html>