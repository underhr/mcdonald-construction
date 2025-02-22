<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];

    $to = "haleyroseu@gmail.com";

    $subject = "New Contact Form Submission";

    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error sending message.";
    }
}
?>