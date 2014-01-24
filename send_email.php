<?php
/*
 * Email Form Submission
 */
$contact_email = 'alex@redcode.ro';	//change this to your email


function isValidEmail($email){
	return preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^", $email);
}

foreach($_POST['data'] as $key => $data){
	$_POST[$data[0]] = $data[1];
}

if ($_POST['fname'] == ""){
	echo 'Please enter your name.';
	return;
}

if ($_POST['email'] == "" || !isValidEmail($_POST['email'])){
	echo 'Please enter a valid email.';
	return;
}

if ($_POST['message'] == ""){
	echo 'Please enter a message.';
	return;
}

$to = $contact_email;
$subject = "New email sent from your contact page";
$message = "Name: ".$_POST['fname']."\r\nEmail: ".$_POST['email']."\r\n";
$message .= "Message: \r\n\r\n".$_POST['message'];
$header = 'From: '.$_POST['email']."\r\n".'Reply-To: '.$_POST['email']."\r\n".'X-Mailer: PHP/'.phpversion();
mail (  $to , $subject , $message , $header );
echo "success";

return;
?>
