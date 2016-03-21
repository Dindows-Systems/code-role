CREATE DATABASE ContactForm;
USE ContactForm;
DROP TABLE IF EXISTS CONTACT;
CREATE TABLE CONTACT(
		pk_contact 					INT UNSIGNED NOT NULL auto_increment,
		name						VARCHAR(120) NOT NULL,
		email 						VARCHAR(120) NOT NULL,
		website		                VARCHAR(120) NOT NULL DEFAULT "",
		message						VARCHAR(300) NOT NULL,
		added_date 					TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		primary key(pk_contact)
)type=innodb DEFAULT CHARACTER SET utf8	COLLATE utf8_general_ci;