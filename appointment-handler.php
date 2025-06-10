<?php
// Turn on error reporting for debugging. 
// It's recommended to turn this off in a live production environment.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ============== DATABASE CONNECTION DETAILS ==============
$servername = "localhost";    // Usually "localhost" for cPanel
$username = "wisewaye_form";  // Your cPanel database username
$password = "Wise@Way#2025";  // Your cPanel database password
$dbname = "wisewaye_form";    // Your cPanel database name

// ============== ESTABLISH DATABASE CONNECTION ==============

// Create a new connection to the MySQL database using mysqli
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection for any errors
if ($conn->connect_error) {
  // If connection fails, stop the script and display an error message.
  die("Connection failed: " . $conn->connect_error);
}


// ============== FORM DATA PROCESSING ==============

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // --- 1. Retrieve and Sanitize Form Data ---
  // Use trim() to remove any accidental whitespace from user input.
  $fullName = trim($_POST['fullName']);
  $email = trim($_POST['email']);
  $phone = trim($_POST['phone']);
  $address = trim($_POST['address']);
  $appointmentType = trim($_POST['appointmentType']);
  $appointmentTime = trim($_POST['appointmentTime']);

  // --- 2. Server-Side Validation (Important!) ---
  // Ensure that no required fields are empty after trimming.
  if (empty($fullName) || empty($email) || empty($phone) || empty($address) || empty($appointmentType) || empty($appointmentTime)) {
    die("Error: Please fill out all required fields.");
  }

  // Validate email format
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email format.");
  }
  
  // Validate phone number format (matches your HTML pattern)
  if (!preg_match("/^[0-9]{7,15}$/", $phone)) {
    die("Error: Invalid phone number. Please use 7 to 15 digits only.");
  }

  // --- 3. Prepare SQL Statement to Prevent SQL Injection ---
  // The SQL query to insert data into the 'Appointment_Form' table.
  // We use question marks (?) as placeholders for the values.
  $sql = "INSERT INTO Appointment_Form (full_name, email, phone, address, appointment_type, appointment_time) VALUES (?, ?, ?, ?, ?, ?)";
  
  // Prepare the statement
  $stmt = $conn->prepare($sql);

  if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
  }
  
  // --- 4. Bind Parameters to the Prepared Statement ---
  // "ssssss" means we are binding 6 string parameters.
  // s = string, i = integer, d = double, b = blob
  $stmt->bind_param("ssssss", $fullName, $email, $phone, $address, $appointmentType, $appointmentTime);

  // --- 5. Execute the Statement and Provide Feedback ---
  if ($stmt->execute()) {
    // If execution is successful, show a success message.
    // In a real application, you might redirect to a "thank you" page.
    // Example: header("Location: thank-you.html"); exit();
    echo "<h1>Appointment Booked Successfully!</h1>";
    echo "<p>Thank you, " . htmlspecialchars($fullName) . ". We have received your request and will contact you shortly.</p>";
    echo "<a href='javascript:history.back()'>Go Back</a>";

  } else {
    // If execution fails, show an error message.
    echo "<h1>Error</h1>";
    echo "<p>Sorry, there was an error submitting your appointment. Please try again later.</p>";
    // For debugging, you can uncomment the line below to see the specific error
    // echo "Error: " . $stmt->error;
  }
  
  // --- 6. Clean Up ---
  // Close the statement
  $stmt->close();

} else {
  // If the script is accessed directly without a POST request, show an error.
  echo "Invalid request method. Please submit the form.";
}

// Close the database connection
$conn->close();

?>