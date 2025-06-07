<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "info@wiseway.edu.np";
  $subject = "New Form Submission from Website";

  $name = $_POST['name'] ?? 'Not Provided';
  $email = $_POST['email'] ?? 'Not Provided';
  $dob = $_POST['dob'] ?? 'Not Provided';
  $passport = $_POST['passport'] ?? 'Not Provided';
  $qualification = $_POST['qualification'] ?? 'Not Provided';
  $college = $_POST['college'] ?? 'Not Provided';
  $grade = $_POST['grade'] ?? 'Not Provided';
  $year = $_POST['year'] ?? 'Not Provided';
  $marital = $_POST['marital'] ?? 'Not Provided';
  $address = $_POST['address'] ?? 'Not Provided';
  $mobile = $_POST['mobile'] ?? 'Not Provided';
  $guardian = $_POST['guardian'] ?? 'Not Provided';
  $country = $_POST['country'] ?? 'Not Provided';
  $english_test = $_POST['english_test'] ?? 'Not Provided';
  $institutions = $_POST['institutions'] ?? 'Not Provided';
  $referral = $_POST['referral'] ?? 'Not Provided';
  $message = $_POST['message'] ?? 'Not Provided';

  $body = "Name: $name\nEmail: $email\nDOB: $dob\nPassport No: $passport\n";
  $body .= "Last Qualification: $qualification\nCollege: $college\nGrade: $grade\nPassed Year: $year\n";
  $body .= "Marital Status: $marital\nAddress: $address\nMobile: $mobile\nGuardian No: $guardian\n";
  $body .= "Interested Country: $country\nEnglish Test Taken: $english_test\nInstitutions: $institutions\n";
  $body .= "Referral Source: $referral\nMessage: $message\n";

  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "Your form has been submitted successfully.";
  } else {
    echo "Sorry, there was a problem sending your message.";
  }
} else {
  echo "Invalid Request";
}
?>
