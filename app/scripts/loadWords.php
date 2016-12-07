<?php require 'connection.php'; ?>
<?php 

if (!$conn) {
    echo "Error: Unable to connect to database. ";
    echo "Debugging errno: " . mysqli_connect_errno();
    echo "Debugging error: " . mysqli_connect_error();
    exit;
}
else{
		$results = array();
		$query = "SELECT * FROM `message_choices`";
		$rows = mysqli_query($conn, $query);
		while ($row = mysqli_fetch_assoc($rows)) {
			$word = array(
				"text" => $row["text"],
				"levelReq" => (int)$row["levelReq"],
			);
        	array_push($results,$word);
    	}
		echo json_encode($results);
		mysqli_close($conn);
	}
?>