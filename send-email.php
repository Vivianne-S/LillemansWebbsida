<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Loopia SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.loopia.se';
    $mail->SMTPAuth = true;
    $mail->Username = 'kontakt@lillemansplat.se';  // Full e-postadress
    $mail->Password = SMTP_PASSWORD;    // Lösenord för e-postkontot
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Använd STARTTLS
    $mail->Port = 587;

    // Avsändare (måste matcha din Loopia-e-post eller godkänd avsändardomän)
    $mail->setFrom('kontakt@lillemansplat.se', 'Lillemans Plåtslageri');
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    // Mottagare
    $mail->addAddress('mottagare@example.com');

    // Innehåll
    $mail->Subject = 'Ny förfrågan från webbsidan';
    $mail->Body = "Namn: {$_POST['name']}\nTelefon: {$_POST['phone']}\n\nMeddelande:\n{$_POST['message']}";

    $mail->send();
    echo 'Meddelandet skickades!';
} catch (Exception $e) {
    echo "Ett fel uppstod: " . $mail->ErrorInfo;
}
?>