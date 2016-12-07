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
		$query = "SELECT * FROM `media_sources`";
		$rows = mysqli_query($conn, $query);
		while ($row = mysqli_fetch_assoc($rows)) {
			$source = array(
				"name" => $row["name"],
				"avatar" => $row["avatar"],
				"audience" => (int)$row["audience"],
				"levelReq" => (int)$row["levelReq"],
				"views" => array(
					"conservative" => array(
						"view" => (int)$row["conservativeView"],
						"affin" => (int)$row["conservativeAffin"]
					),
					"liberal" => array(
						"view" => (int)$row["liberalView"],
						"affin" => (int)$row["liberalAffin"]
					),
					"educational" => array(
						"view" => (int)$row["educationalView"],
						"affin" => (int)$row["educationalAffin"]
					),
					"emotional" => array(
						"view" => (int)$row["emotionalView"],
						"affin" => (int)$row["emotionalAffin"]
					),
					"accuracy" => array(
						"view" => (int)$row["accuracyView"],
						"affin" => (int)$row["accuracyAffin"]
					),
					"nonsense" => array(
						"view" => (int)$row["nonsenseView"],
						"affin" => (int)$row["nonsenseAffin"]
					),
					"nonnormative" => array(
						"view" => (int)$row["nonnormativeView"],
						"affin" => (int)$row["nonnormativeAffin"]
					),
					"conflicting" => array(
						"view" => (int)$row["conflictingView"],
						"affin" => (int)$row["conflictingAffin"]
					)
				)
			);
        	array_push($results,$source);
    	}
		echo json_encode($results);
		mysqli_close($conn);
	}
?>