<?php
// Database connection
$servername = "localhost";
$username   = "root"; // default in XAMPP
$password   = "";     // default in XAMPP
$dbname     = "restaurant_db"; // change to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Make sure request is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Get form data with fallback to empty strings
    $name             = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone            = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $persons          = isset($_POST['persons']) ? trim($_POST['persons']) : '';
    $reservation_date = isset($_POST['reservation_date']) ? trim($_POST['reservation_date']) : '';
    $reservation_time = isset($_POST['reservation_time']) ? trim($_POST['reservation_time']) : '';
    $message          = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Basic validation
    if (empty($name) || empty($phone) || empty($persons) || empty($reservation_date) || empty($reservation_time)) {
        die("All fields except message are required.");
    }

    // Prepare SQL insert
    $stmt = $conn->prepare("INSERT INTO reservations (name, phone, persons, reservation_date, reservation_time, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $phone, $persons, $reservation_date, $reservation_time, $message);

    if ($stmt->execute()) {
        echo "Reservation saved successfully!";
        // Redirect back to home page (optional)
        // header("Location: ../index.html?status=success");
        // exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
