<?php
$servername = "localhost";
$username = "root";
$password = "";
date_default_timezone_set('Asia/Kolkata');
$conn = new mysqli($servername, $username, $password);
mysqli_select_db($conn,"csv_db");
?>