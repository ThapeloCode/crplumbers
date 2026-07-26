<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and collect inputs
    $name    = filter_var(trim($_POST["name"]), FILTER_SANITIZE_SPECIAL_CHARS);
    $phone   = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_SPECIAL_CHARS);
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $service = filter_var(trim($_POST["service"]), FILTER_SANITIZE_SPECIAL_CHARS);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_SPECIAL_CHARS);

    $to = "info@crplumbers.co.za";
    $subject = "New Inquiry: " . $service . " - " . $name;

    $body  = "You have received a new booking inquiry from the website:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Email: " . ($email ? $email : "Not provided") . "\n";
    $body .= "Service: " . $service . "\n\n";
    $body .= "Message Details:\n" . $message . "\n";

    $headers  = "From: no-reply@crplumbers.co.za\r\n";
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: " . $email . "\r\n";
    }

    if (mail($to, $subject, $body, $headers)) {
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>Request Received</title>
          <link rel='stylesheet' href='style.css'>
        </head>
        <body>
          <main class='container' style='text-align: center;'>
            <h2>Thank You, " . htmlspecialchars($name) . "!</h2>
            <p>Your request for <strong>" . htmlspecialchars($service) . "</strong> has been submitted successfully.</p>
            <p>Our Pretoria North team will contact you shortly on <strong>" . htmlspecialchars($phone) . "</strong>.</p>
            <br>
            <a href='../index.html' class='btn btn-accent'>Return to Home</a>
          </main>
        </body>
        </html>";
    } else {
        echo "Failed to send message. Please call us directly at 069 436 4811.";
    }

} else {
    header("Location: contact.html");
    exit();
}
?>