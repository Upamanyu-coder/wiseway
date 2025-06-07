<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $fullName = $_POST['fullName'] ?? 'Not Provided';
  $email = $_POST['email'] ?? 'Not Provided';
  $phone = $_POST['phone'] ?? 'Not Provided';
  $address = $_POST['address'] ?? 'Not Provided';
  $appointmentType = $_POST['appointmentType'] ?? 'Not Provided';
  $appointmentTime = $_POST['appointmentTime'] ?? 'Not Provided';

 // Datebase validation
 $conn = new mysqli('localhost', 'wisewaye_form', 'Wise@Way#2025', 'wisewaye_form');

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
} 
else {
  $stmt = $conn->prepare("INSERT INTO appointments (fullName, email, phone, address, appointmentType, appointmentTime) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssisss", $fullName, $email, $phone, $address, $appointmentType, $appointmentTime);
$stmt->execute();

  // Check if the appointment was booked successfully
  if ($stmt->affected_rows > 0) {
    echo "Appointment booked successfully!";
  } else {
    echo "Error booking appointment: " . $stmt->error;
  }

  $stmt->close();
  $conn->close();
}
?>
