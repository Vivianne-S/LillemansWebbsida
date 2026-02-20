<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/config.php';
require __DIR__ . '/PHPMailer-master/src/Exception.php';
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo 'Fyll i namn, e-post och meddelande.';
    exit;
}

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
    $mail->setFrom('kontakt@lillemansplat.se', 'Lillemans Platslageri');
    $mail->addReplyTo($email, $name);

    // Mottagare
    $mail->addAddress('kontakt@lillemansplat.se');

    // Innehåll
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Ny förfrågan från webbsidan';
    $mail->Body = "Namn: {$name}\nE-post: {$email}\nTelefon: {$phone}\n\nMeddelande:\n{$message}";

    $mail->send();
    echo 'Meddelandet skickades!';
} catch (Exception $e) {
    echo "Ett fel uppstod: " . $mail->ErrorInfo;
}
?>