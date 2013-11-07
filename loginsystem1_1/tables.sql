
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS Country;
#
#  Table structure for Countries table
#
CREATE TABLE Country(
		country_code 				char(2) not null,
		country_name 				varchar(60) not null,
		primary key(country_code)
)type=innodb DEFAULT CHARACTER SET utf8	COLLATE utf8_general_ci;
#
#  Table structure for Users table
#
CREATE TABLE users(
		pk_user 					int unsigned not null auto_increment,
		email 						varchar(120) not null,
		flname 						varchar(100) not null,
		password 					varchar(64) not null,
		country_code				char(2) not null,
		usr_ip                      varchar(15),
		usr_nmb_logins 				int(10) unsigned not null default 0,
		usr_signup_date 			timestamp not null default CURRENT_TIMESTAMP,
		usr_userid 					varchar(32),
		usr_confirm_hash 			varchar(255) not null,					# for the account confirmation
		usr_is_confirmed 			tinyint(1) not null default 0, 			# after confirming its set to 1
		usr_resetpassword_hash		varchar(255) not null,					# when the user resets password (forgot password)
		usr_is_blocked  			tinyint(1) not null default 0, 			# blocked or not
		usr_is_admin    			tinyint(1) not null default 0, 			# admin or not
		foreign key(country_code) 	references Country(country_code),
		unique index(email),
		primary key(pk_user)
)type=innodb DEFAULT CHARACTER SET utf8	COLLATE utf8_general_ci;

/*ADMIN*/
/*you should manually set usr_is_admin to 1 in case you want your user to be admin*/

insert into Country(country_code,country_name) values("n","?");
insert into Country(country_code,country_name) values("ad","Andorra");
insert into Country(country_code,country_name) values("ae","United Arab Emirates");
insert into Country(country_code,country_name) values("af","Afghanistan");
insert into Country(country_code,country_name) values("ag","Antigua and Barbuda");
insert into Country(country_code,country_name) values("ai","Anguilla");
insert into Country(country_code,country_name) values("al","Albania");
insert into Country(country_code,country_name) values("am","Armenia");
insert into Country(country_code,country_name) values("an","Netherlands Antilles");
insert into Country(country_code,country_name) values("ao","Angola");
insert into Country(country_code,country_name) values("ap","Asia/Pacific Region");
insert into Country(country_code,country_name) values("aq","Antarctica");
insert into Country(country_code,country_name) values("ar","Argentina");
insert into Country(country_code,country_name) values("as","American Samoa");
insert into Country(country_code,country_name) values("at","Austria");
insert into Country(country_code,country_name) values("au","Australia");
insert into Country(country_code,country_name) values("aw","Aruba");
insert into Country(country_code,country_name) values("ax","Aland Islands");
insert into Country(country_code,country_name) values("az","Azerbaijan");
insert into Country(country_code,country_name) values("ba","Bosnia and Herzegovina");
insert into Country(country_code,country_name) values("bb","Barbados");
insert into Country(country_code,country_name) values("bd","Bangladesh");
insert into Country(country_code,country_name) values("be","Belgium");
insert into Country(country_code,country_name) values("bf","Burkina Faso");
insert into Country(country_code,country_name) values("bg","Bulgaria");
insert into Country(country_code,country_name) values("bh","Bahrain");
insert into Country(country_code,country_name) values("bi","Burundi");
insert into Country(country_code,country_name) values("bj","Benin");
insert into Country(country_code,country_name) values("bm","Bermuda");
insert into Country(country_code,country_name) values("bn","Brunei Darussalam");
insert into Country(country_code,country_name) values("bo","Bolivia");
insert into Country(country_code,country_name) values("br","Brazil");
insert into Country(country_code,country_name) values("bs","Bahamas");
insert into Country(country_code,country_name) values("bt","Bhutan");
insert into Country(country_code,country_name) values("bv","Bouvet Island");
insert into Country(country_code,country_name) values("bw","Botswana");
insert into Country(country_code,country_name) values("by","Belarus");
insert into Country(country_code,country_name) values("bz","Belize");
insert into Country(country_code,country_name) values("ca","Canada");
insert into Country(country_code,country_name) values("cc","Cocos (Keeling) Islands");
insert into Country(country_code,country_name) values("cd","Congo, The Democratic Republic of the");
insert into Country(country_code,country_name) values("cf","Central African Republic");
insert into Country(country_code,country_name) values("cg","Congo");
insert into Country(country_code,country_name) values("ch","Switzerland");
insert into Country(country_code,country_name) values("ci","Cote d'Ivoire");
insert into Country(country_code,country_name) values("ck","Cook Islands");
insert into Country(country_code,country_name) values("cl","Chile");
insert into Country(country_code,country_name) values("cm","Cameroon");
insert into Country(country_code,country_name) values("cn","China");
insert into Country(country_code,country_name) values("co","Colombia");
insert into Country(country_code,country_name) values("cr","Costa Rica");
insert into Country(country_code,country_name) values("cu","Cuba");
insert into Country(country_code,country_name) values("cv","Cape Verde");
insert into Country(country_code,country_name) values("cx","Christmas Island");
insert into Country(country_code,country_name) values("cy","Cyprus");
insert into Country(country_code,country_name) values("cz","Czech Republic");
insert into Country(country_code,country_name) values("de","Germany");
insert into Country(country_code,country_name) values("dj","Djibouti");
insert into Country(country_code,country_name) values("dk","Denmark");
insert into Country(country_code,country_name) values("dm","Dominica");
insert into Country(country_code,country_name) values("do","Dominican Republic");
insert into Country(country_code,country_name) values("dz","Algeria");
insert into Country(country_code,country_name) values("ec","Ecuador");
insert into Country(country_code,country_name) values("ee","Estonia");
insert into Country(country_code,country_name) values("eg","Egypt");
insert into Country(country_code,country_name) values("eh","Western Sahara");
insert into Country(country_code,country_name) values("er","Eritrea");
insert into Country(country_code,country_name) values("es","Spain");
insert into Country(country_code,country_name) values("et","Ethiopia");
insert into Country(country_code,country_name) values("fi","Finland");
insert into Country(country_code,country_name) values("fj","Fiji");
insert into Country(country_code,country_name) values("fk","Falkland Islands (Malvinas)");
insert into Country(country_code,country_name) values("fm","Micronesia, Federated States of");
insert into Country(country_code,country_name) values("fo","Faroe Islands");
insert into Country(country_code,country_name) values("fr","France");
insert into Country(country_code,country_name) values("ga","Gabon");
insert into Country(country_code,country_name) values("gb","United Kingdom");
insert into Country(country_code,country_name) values("gd","Grenada");
insert into Country(country_code,country_name) values("ge","Georgia");
insert into Country(country_code,country_name) values("gf","French Guiana");
insert into Country(country_code,country_name) values("gg","Guernsey");
insert into Country(country_code,country_name) values("gh","Ghana");
insert into Country(country_code,country_name) values("gi","Gibraltar");
insert into Country(country_code,country_name) values("gl","Greenland");
insert into Country(country_code,country_name) values("gm","Gambia");
insert into Country(country_code,country_name) values("gn","Guinea");
insert into Country(country_code,country_name) values("gp","Guadeloupe");
insert into Country(country_code,country_name) values("gq","Equatorial Guinea");
insert into Country(country_code,country_name) values("gr","Greece");
insert into Country(country_code,country_name) values("gs","South Georgia and the South Sandwich Islands");
insert into Country(country_code,country_name) values("gt","Guatemala");
insert into Country(country_code,country_name) values("gu","Guam");
insert into Country(country_code,country_name) values("gw","Guinea-Bissau");
insert into Country(country_code,country_name) values("gy","Guyana");
insert into Country(country_code,country_name) values("hk","Hong Kong");
insert into Country(country_code,country_name) values("hm","Heard Island and McDonald Islands");
insert into Country(country_code,country_name) values("hn","Honduras");
insert into Country(country_code,country_name) values("hr","Croatia");
insert into Country(country_code,country_name) values("ht","Haiti");
insert into Country(country_code,country_name) values("hu","Hungary");
insert into Country(country_code,country_name) values("id","Indonesia");
insert into Country(country_code,country_name) values("ie","Ireland");
insert into Country(country_code,country_name) values("il","Israel");
insert into Country(country_code,country_name) values("im","Isle of Man");
insert into Country(country_code,country_name) values("in","India");
insert into Country(country_code,country_name) values("io","British Indian Ocean Territory");
insert into Country(country_code,country_name) values("iq","Iraq");
insert into Country(country_code,country_name) values("ir","Iran, Islamic Republic of");
insert into Country(country_code,country_name) values("is","Iceland");
insert into Country(country_code,country_name) values("it","Italy");
insert into Country(country_code,country_name) values("je","Jersey");
insert into Country(country_code,country_name) values("jm","Jamaica");
insert into Country(country_code,country_name) values("jo","Jordan");
insert into Country(country_code,country_name) values("jp","Japan");
insert into Country(country_code,country_name) values("ke","Kenya");
insert into Country(country_code,country_name) values("kg","Kyrgyzstan");
insert into Country(country_code,country_name) values("kh","Cambodia");
insert into Country(country_code,country_name) values("ki","Kiribati");
insert into Country(country_code,country_name) values("km","Comoros");
insert into Country(country_code,country_name) values("kn","Saint Kitts and Nevis");
insert into Country(country_code,country_name) values("kp","Korea, Democratic People's Republic of");
insert into Country(country_code,country_name) values("kr","Korea, Republic of");
insert into Country(country_code,country_name) values("kw","Kuwait");
insert into Country(country_code,country_name) values("ky","Cayman Islands");
insert into Country(country_code,country_name) values("kz","Kazakhstan");
insert into Country(country_code,country_name) values("la","Lao People's Democratic Republic");
insert into Country(country_code,country_name) values("lb","Lebanon");
insert into Country(country_code,country_name) values("lc","Saint Lucia");
insert into Country(country_code,country_name) values("li","Liechtenstein");
insert into Country(country_code,country_name) values("lk","Sri Lanka");
insert into Country(country_code,country_name) values("lr","Liberia");
insert into Country(country_code,country_name) values("ls","Lesotho");
insert into Country(country_code,country_name) values("lt","Lithuania");
insert into Country(country_code,country_name) values("lu","Luxembourg");
insert into Country(country_code,country_name) values("lv","Latvia");
insert into Country(country_code,country_name) values("ly","Libyan Arab Jamahiriya");
insert into Country(country_code,country_name) values("ma","Morocco");
insert into Country(country_code,country_name) values("mc","Monaco");
insert into Country(country_code,country_name) values("md","Moldova, Republic of");
insert into Country(country_code,country_name) values("me","Montenegro");
insert into Country(country_code,country_name) values("mg","Madagascar");
insert into Country(country_code,country_name) values("mh","Marshall Islands");
insert into Country(country_code,country_name) values("mk","Macedonia");
insert into Country(country_code,country_name) values("ml","Mali");
insert into Country(country_code,country_name) values("mm","Myanmar");
insert into Country(country_code,country_name) values("mn","Mongolia");
insert into Country(country_code,country_name) values("mo","Macao");
insert into Country(country_code,country_name) values("mp","Northern Mariana Islands");
insert into Country(country_code,country_name) values("mq","Martinique");
insert into Country(country_code,country_name) values("mr","Mauritania");
insert into Country(country_code,country_name) values("ms","Montserrat");
insert into Country(country_code,country_name) values("mt","Malta");
insert into Country(country_code,country_name) values("mu","Mauritius");
insert into Country(country_code,country_name) values("mv","Maldives");
insert into Country(country_code,country_name) values("mw","Malawi");
insert into Country(country_code,country_name) values("mx","Mexico");
insert into Country(country_code,country_name) values("my","Malaysia");
insert into Country(country_code,country_name) values("mz","Mozambique");
insert into Country(country_code,country_name) values("na","Namibia");
insert into Country(country_code,country_name) values("nc","New Caledonia");
insert into Country(country_code,country_name) values("ne","Niger");
insert into Country(country_code,country_name) values("nf","Norfolk Island");
insert into Country(country_code,country_name) values("ng","Nigeria");
insert into Country(country_code,country_name) values("ni","Nicaragua");
insert into Country(country_code,country_name) values("nl","Netherlands");
insert into Country(country_code,country_name) values("no","Norway");
insert into Country(country_code,country_name) values("np","Nepal");
insert into Country(country_code,country_name) values("nr","Nauru");
insert into Country(country_code,country_name) values("nu","Niue");
insert into Country(country_code,country_name) values("nz","New Zealand");
insert into Country(country_code,country_name) values("om","Oman");
insert into Country(country_code,country_name) values("pa","Panama");
insert into Country(country_code,country_name) values("pe","Peru");
insert into Country(country_code,country_name) values("pf","French Polynesia");
insert into Country(country_code,country_name) values("pg","Papua New Guinea");
insert into Country(country_code,country_name) values("ph","Philippines");
insert into Country(country_code,country_name) values("pk","Pakistan");
insert into Country(country_code,country_name) values("pl","Poland");
insert into Country(country_code,country_name) values("pm","Saint Pierre and Miquelon");
insert into Country(country_code,country_name) values("pn","Pitcairn");
insert into Country(country_code,country_name) values("pr","Puerto Rico");
insert into Country(country_code,country_name) values("ps","Palestinian Territory");
insert into Country(country_code,country_name) values("pt","Portugal");
insert into Country(country_code,country_name) values("pw","Palau");
insert into Country(country_code,country_name) values("py","Paraguay");
insert into Country(country_code,country_name) values("qa","Qatar");
insert into Country(country_code,country_name) values("re","Reunion");
insert into Country(country_code,country_name) values("ro","Romania");
insert into Country(country_code,country_name) values("rs","Serbia");
insert into Country(country_code,country_name) values("ru","Russian Federation");
insert into Country(country_code,country_name) values("rw","Rwanda");
insert into Country(country_code,country_name) values("sa","Saudi Arabia");
insert into Country(country_code,country_name) values("sb","Solomon Islands");
insert into Country(country_code,country_name) values("sc","Seychelles");
insert into Country(country_code,country_name) values("sd","Sudan");
insert into Country(country_code,country_name) values("se","Sweden");
insert into Country(country_code,country_name) values("sg","Singapore");
insert into Country(country_code,country_name) values("sh","Saint Helena");
insert into Country(country_code,country_name) values("si","Slovenia");
insert into Country(country_code,country_name) values("sj","Svalbard and Jan Mayen");
insert into Country(country_code,country_name) values("sk","Slovakia");
insert into Country(country_code,country_name) values("sl","Sierra Leone");
insert into Country(country_code,country_name) values("sm","San Marino");
insert into Country(country_code,country_name) values("sn","Senegal");
insert into Country(country_code,country_name) values("so","Somalia");
insert into Country(country_code,country_name) values("sr","Suriname");
insert into Country(country_code,country_name) values("st","Sao Tome and Principe");
insert into Country(country_code,country_name) values("sv","El Salvador");
insert into Country(country_code,country_name) values("sy","Syrian Arab Republic");
insert into Country(country_code,country_name) values("sz","Swaziland");
insert into Country(country_code,country_name) values("tc","Turks and Caicos Islands");
insert into Country(country_code,country_name) values("td","Chad");
insert into Country(country_code,country_name) values("tf","French Southern Territories");
insert into Country(country_code,country_name) values("tg","Togo");
insert into Country(country_code,country_name) values("th","Thailand");
insert into Country(country_code,country_name) values("tj","Tajikistan");
insert into Country(country_code,country_name) values("tk","Tokelau");
insert into Country(country_code,country_name) values("tl","Timor-Leste");
insert into Country(country_code,country_name) values("tm","Turkmenistan");
insert into Country(country_code,country_name) values("tn","Tunisia");
insert into Country(country_code,country_name) values("to","Tonga");
insert into Country(country_code,country_name) values("tr","Turkey");
insert into Country(country_code,country_name) values("tt","Trinidad and Tobago");
insert into Country(country_code,country_name) values("tv","Tuvalu");
insert into Country(country_code,country_name) values("tw","Taiwan");
insert into Country(country_code,country_name) values("tz","Tanzania, United Republic of");
insert into Country(country_code,country_name) values("ua","Ukraine");
insert into Country(country_code,country_name) values("ug","Uganda");
insert into Country(country_code,country_name) values("um","United States Minor Outlying Islands");
insert into Country(country_code,country_name) values("us","United States");
insert into Country(country_code,country_name) values("uy","Uruguay");
insert into Country(country_code,country_name) values("uz","Uzbekistan");
insert into Country(country_code,country_name) values("va","Holy See (Vatican City State)");
insert into Country(country_code,country_name) values("vc","Saint Vincent and the Grenadines");
insert into Country(country_code,country_name) values("ve","Venezuela");
insert into Country(country_code,country_name) values("vg","Virgin Islands, British");
insert into Country(country_code,country_name) values("vi","Virgin Islands, U.S.");
insert into Country(country_code,country_name) values("vn","Vietnam");
insert into Country(country_code,country_name) values("vu","Vanuatu");
insert into Country(country_code,country_name) values("wf","Wallis and Futuna");
insert into Country(country_code,country_name) values("ws","Samoa");
insert into Country(country_code,country_name) values("ye","Yemen");
insert into Country(country_code,country_name) values("yt","Mayotte");
insert into Country(country_code,country_name) values("za","South Africa");
insert into Country(country_code,country_name) values("zm","Zambia");
insert into Country(country_code,country_name) values("zw","Zimbabwe");
