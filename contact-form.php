<?php
// Enable error reporting for debugging purposes
// It is recommended to turn this OFF in a live production environment
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

// Check for connection errors
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


// ============== FORM DATA PROCESSING ==============

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // --- 1. Retrieve and Sanitize Form Data ---
  // Using trim() to remove extra whitespace from the beginning and end of the input.

  // Section 1: Basic Info
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);
  $dob = trim($_POST['dob']);
  $passport = trim($_POST['passport']);

  // Section 2: Academic Qualification
  $qualification = trim($_POST['qualification']);
  $college = trim($_POST['college']);
  $grade = trim($_POST['grade']);
  $passYear = trim($_POST['passYear']);

  // Section 3: Additional Info
  // NOTE: Your HTML has a typo: name="marital required". It should be name="marital".
  // This code assumes the name is "marital".
  $marital = isset($_POST['marital']) ? trim($_POST['marital']) : ''; 
  $address = trim($_POST['address']);
  $mobile = trim($_POST['mobile']);
  $guardian = trim($_POST['guardian']);
  $country = trim($_POST['country']);

  // Section 4: English Proficiency (Radio button)
  // Use isset() to check if a selection was made
  $englishTest = isset($_POST['englishTest']) ? trim($_POST['englishTest']) : 'Not specified';

  // Section 5: Chosen Institutions (Optional)
  $institutions = trim($_POST['institutions']);

  // Section 6: Source (Checkboxes)
  // Checkboxes can submit multiple values in an array. We'll convert the array to a comma-separated string.
  $source = isset($_POST['source']) && is_array($_POST['source']) ? implode(', ', $_POST['source']) : 'Not specified';

  // Section 7: Message (Optional)
  $message = trim($_POST['message']);

  // --- 2. Server-Side Validation (Essential!) ---
  if (empty($name) || empty($email) || empty($dob) || empty($passport) || empty($qualification) || empty($college) || empty($grade) || empty($passYear) || empty($marital) || empty($mobile) || empty($country)) {
    die("Error: Please fill out all required fields.");
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email format.");
  }
  
  // --- 3. Prepare SQL Statement to Prevent SQL Injection ---
  $sql = "INSERT INTO Student_Applications (full_name, email, date_of_birth, passport_no, last_qualification, college_name, grade, passed_year, marital_status, address, mobile_number, guardian_number, destination_country, english_test_taken, chosen_institutions, source_of_info, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  $stmt = $conn->prepare($sql);

  if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
  }

  // --- 4. Bind Parameters to the Prepared Statement ---
  // The type definition string "sssssssssssssssss" indicates that all 17 parameters are strings.
  $stmt->bind_param("sssssssssssssssss", 
    $name, 
    $email, 
    $dob, 
    $passport, 
    $qualification, 
    $college, 
    $grade, 
    $passYear, 
    $marital, 
    $address, 
    $mobile, 
    $guardian, 
    $country, 
    $englishTest, 
    $institutions, 
    $source, 
    $message
  );

  // --- 5. Execute the Statement and Provide Feedback ---
   if ($stmt) {
        $stmt->bind_param("sssssssssssssssss", 
            $name, $email, $dob, $passport, $qualification, $college, $grade, $passYear, 
            $marital, $address, $mobile, $guardian, $country, $englishTest, $institutions, 
            $source, $message
        );

        // Execute and check for success or failure
        if ($stmt->execute()) {
            // SUCCESS: Set session variables for the success message
            $_SESSION['form_status'] = 'success';
            $_SESSION['user_name'] = $name;
        } else {
            // FAILURE: Set session variables for the error message
            $_SESSION['form_status'] = 'error';
            $_SESSION['form_error'] = 'Your application could not be saved. Please try again.';
        }
        $stmt->close();
    } else {
        $_SESSION['form_status'] = 'error';
        $_SESSION['form_error'] = 'A database error occurred.';
    }

    $conn->close();

    // **CRUCIAL:** Redirect back to the contact page. The browser will reload the page.
    header('Location: contact.html');
    exit(); // Always call exit() after a header redirect

} else {
    // If not a POST request, just go back to the form
    header('Location: contact.html');
    exit();
}
?>