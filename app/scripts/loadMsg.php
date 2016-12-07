<?php require 'connection.php'; ?>
<?php 

if (!isset($_GET["id"])) {
	echo "Error: No message id set. ";
}
if (!$conn) {
    echo "Error: Unable to connect to database. ";
    echo "Debugging errno: " . mysqli_connect_errno();
    echo "Debugging error: " . mysqli_connect_error();
    exit;
}
else{
		$msgId = processId($_GET["id"]);
		if($msgId > 0){
			$result = array();

			# Get the event ext
			$query = "SELECT text FROM events WHERE triggerMsgId = ?";
			$stmt = mysqli_prepare($conn, $query);
			mysqli_stmt_bind_param($stmt, "i", $msgId);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_bind_result($stmt, $text);
			mysqli_stmt_fetch($stmt);
			$result['event'] = $text;
			mysqli_stmt_close($stmt);

			# Get message text
			$query = "SELECT text FROM messages WHERE id = ?";
			$stmt = mysqli_prepare($conn, $query);
			mysqli_stmt_bind_param($stmt, "i", $msgId);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_bind_result($stmt, $text);
			mysqli_stmt_fetch($stmt);
			$result['text'] = $text;
			mysqli_stmt_close($stmt);

			# Get message choice values
			$query = "SELECT msgPlace, text, conservative, liberal, educational, emotional, accuracy, nonsense, nonnormative, conflicting FROM `message_choices_values` JOIN `message_choices` ON `message_choices_values`.choiceId = `message_choices`.id WHERE msgId = ? ORDER BY msgPlace";
			$stmt = mysqli_prepare($conn, $query);
			mysqli_stmt_bind_param($stmt, "i", $msgId);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_bind_result($stmt, $msgPlace, $text, $conservative, $liberal, $educational, $emotional, $accuracy, $nonsense, $nonnormative, $conflicting);
			while(mysqli_stmt_fetch($stmt)){
				$choice = array(
					"text" => $text,
					"ratings" => array(
						"conservative" => $conservative,
						"liberal" => $liberal,
						"educational" => $educational,
						"emotional" => $emotional, 
						"accuracy" => $accuracy, 
						"nonsense" => $nonsense, 
						"nonnormative" => $nonnormative, 
						"conflicting" => $conflicting
					)
				);
				if(!isset($result['choices'][$msgPlace - 1])){
					$result['choices'][$msgPlace - 1] = array();
				}
				array_push($result['choices'][$msgPlace - 1],$choice);
			}
			mysqli_stmt_close($stmt);

			#Get message posts
			$query = "SELECT srcId, text FROM posts WHERE msgId = ? ORDER BY srcId";
			$stmt = mysqli_prepare($conn, $query);
			mysqli_stmt_bind_param($stmt, "i", $msgId);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_bind_result($stmt, $srcId, $text);
			while(mysqli_stmt_fetch($stmt)){
				if(!isset($result['posts'][$srcId - 1])){
					$result['posts'][$srcId - 1] = array();
				}
				array_push($result['posts'][$srcId - 1],$text);
			}
			mysqli_stmt_close($stmt);

		}
		mysqli_close($conn);
		echo json_encode($result);
}

function processId($id){
	if (is_numeric($id)){
		if($id > 0){
			return (int)$id;
		}
		else{
			echo "Error: Invalid Id: Not over 0. ";
			return -1;
		}
	}
	else{
		echo "Error: Invalid Id: Not a number. ";
		return -1;
	}
}
?>