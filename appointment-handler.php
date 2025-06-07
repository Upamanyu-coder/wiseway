<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "info@wiseway.edu.np";
  $subject = "New Appointment Request";

  $fullName = $_POST['fullName'] ?? 'Not Provided';
  $email = $_POST['email'] ?? 'Not Provided';
  $phone = $_POST['phone'] ?? 'Not Provided';
  $address = $_POST['address'] ?? 'Not Provided';
  $appointmentType = $_POST['appointmentType'] ?? 'Not Provided';
  $appointmentTime = $_POST['appointmentTime'] ?? 'Not Provided';

  $body = "Full Name: $fullName\n";
  $body .= "Email: $email\n";
  $body .= "Phone: $phone\n";
  $body .= "Address: $address\n";
  $body .= "Appointment Type: $appointmentType\n";
  $body .= "Appointment Time: $appointmentTime\n";

  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "Your appointment request has been sent successfully.";
  } else {
    echo "Failed to send your appointment request. Please try again.";
  }
} else {
  echo "Invalid request.";
}
?>
