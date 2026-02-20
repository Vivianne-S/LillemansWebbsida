<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer-master/src/Exception.php';
require 'phpmailer-master/src/PHPMailer.php';
require 'phpmailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Serverinställningar
    $mail->isSMTP();
    $mail->Host = 'smtp.loopia.se'; // Ändra om du använder en annan e-postleverantör
    $mail->SMTPAuth = true;
    $mail->Username = 'kontakt@lillemansplat.se'; // Din e-postadress
    $mail->Password = 'TappainteBort990'; // Lösenord för e-posten
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Eller PHPMailer::ENCRYPTION_SMTPS för SSL
    $mail->Port = 587; // 465 för SSL, 587 för TLS

    // Avsändare & Mottagare
    $mail->setFrom('din@email.se', 'Ditt Namn');
    $mail->addAddress('mottagare@email.se');

    // Meddelande
    $mail->isHTML(true);
    $mail->Subject = 'Kontaktformulär';
    $mail->Body    = 'Detta är ett testmeddelande från kontaktformuläret.';

    // Skicka mail
    $mail->send();
    echo 'Meddelandet har skickats!';
} catch (Exception $e) {
    echo "Meddelandet kunde inte skickas. Fel: {$mail->ErrorInfo}";
}
?>

