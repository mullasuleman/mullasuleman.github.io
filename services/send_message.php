<?php
// grabbing the data from the URL through the get method
$name = $_POST["name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$message = $_POST["message"];

$name = addslashes($name);
$phone = addslashes($phone);
$email = addslashes($email);
$message = addslashes($message);

$message .= "<br><br>From: $name <br>Contact No: $phone <br>Email: $email";

$from = "<$email>";
$to = "mullasuleman12@gmail.com";
$subject = "Message from portfolio site";
$headers = "MIME-Version: 1.0" . "\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\n";
$headers .= "From: $from" . "\n";

$mail_status = mail($to, $subject, $message, $headers);

$msg["code"] = $mail_status;
// $msg["message"] = $message;

// creating a variable $data
// converting the array data to JSON using the function
$data = json_encode($msg);
header("Content-Type: application/json");
print($data);
?>