<?php
// Turn on error reporting for debugging. It's recommended to turn this off in production.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ============== DATABASE CONNECTION DETAILS ==============
$servername = "localhost";
$username = "wisewaye_form";
$password = "Wise@Way#2025";
$dbname = "wisewaye_form";

// ============== ESTABLISH DATABASE CONNECTION ==============
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors and respond in a way that AJAX can handle
if ($conn->connect_error) {
  // Use echo for AJAX, not die()
  echo "<strong>Error:</strong> Could not connect to the server. Please try again later.";
  exit(); // Stop the script
}


// ============== FORM DATA PROCESSING ==============

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // --- 1. Retrieve and Sanitize Form Data ---
  $fullName = trim($_POST['fullName'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $phone = trim($_POST['phone'] ?? '');
  $address = trim($_POST['address'] ?? '');
  $appointmentType = trim($_POST['appointmentType'] ?? '');
  $appointmentTime = trim($_POST['appointmentTime'] ?? '');

  // --- 2. Server-Side Validation ---
  if (empty($fullName) || empty($email) || empty($phone) || empty($address) || empty($appointmentType) || empty($appointmentTime)) {
    echo "<strong>Error:</strong> Please fill out all required fields.";
    exit();
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<strong>Error:</strong> Invalid email format.";
    exit();
  }
  if (!preg_match("/^[0-9]{7,15}$/", $phone)) {
    echo "<strong>Error:</strong> Invalid phone number. Please use 7 to 15 digits only.";
    exit();
  }

  // --- 3. Prepare SQL Statement to Prevent SQL Injection ---
  $sql = "INSERT INTO Appointment_Form (full_name, email, phone, address, appointment_type, appointment_time) VALUES (?, ?, ?, ?, ?, ?)";
  
  $stmt = $conn->prepare($sql);

  if ($stmt === false) {
    echo "<strong>Error:</strong> Could not prepare the database query.";
    exit();
  }
  
  // --- 4. Bind Parameters to the Prepared Statement ---
  $stmt->bind_param("ssssss", $fullName, $email, $phone, $address, $appointmentType, $appointmentTime);

  // --- 5. Execute the Statement and Provide Feedback for AJAX ---
  if ($stmt->execute()) {
    // If execution is successful, send a simple success message back to the JavaScript.
    echo "<strong>Appointment Booked Successfully!</strong> We have received your request and will contact you shortly to confirm.";
  } else {
    // If execution fails, send an error message back.
    echo "<strong>Error:</strong> Sorry, there was an issue submitting your appointment. Please try again.";
  }
  
  // --- 6. Clean Up ---
  $stmt->close();
  $conn->close();

} else {
  // If the script is accessed directly
  echo "Invalid request method.";
}
?>