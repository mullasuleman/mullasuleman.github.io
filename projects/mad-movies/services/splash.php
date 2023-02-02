<?php


// NEED TO SEND POST OF movie_id


date_default_timezone_set('America/Toronto');

require_once("./inc/connect_pdo.php");

$movie_count = $_POST["movie_count"];


if ($movie_count) {
	$movie_count = $movie_count;
} else {
	$movie_count = "6";
}

function get_cover ($movie_cover_id,$dbo) {
	$query = "SELECT name
	FROM image
	WHERE image_id = '$movie_cover_id' ";
	//print("$query");
	foreach($dbo->query($query) as $row) {
		$image_name = stripslashes($row["0"]);
	}
	
	return $image_name;
}

$query = "SELECT movie_id, name, cover_id, rating, hour_me, minute_me, date_me
FROM movie
ORDER BY RAND() 
LIMIT 0, $movie_count";
//print("$query");
foreach($dbo->query($query) as $row) {
	$movie_id = stripslashes($row["0"]);
	$movie_name = stripslashes($row["1"]);
	$movie_cover_id = stripslashes($row["2"]);

	$movie_rating = stripslashes($row["3"]);
	$movie_hour_me = stripslashes($row["4"]);
	$movie_minute_me = stripslashes($row["5"]);
	$movie_date_me = stripslashes($row["6"]);
	$display_date = date('Y', strtotime($movie_date_me));
	
	if (strlen($movie_minute_me) == 1) {
		$movie_minute_me = "0" . $movie_minute_me;
	}

	$movie["movie_id"] = $movie_id;
	$movie["movie_name"] = $movie_name;
	$movie["cover_id"] = $movie_cover_id;
	
	$cover = get_cover($movie_cover_id,$dbo);
	$movie["cover_name"] = $cover;

	$movie["movie_rating"] = $movie_rating;
	$movie["movie_year"] = $display_date;
	$movie["run_length"] = $movie_hour_me. "h ".$movie_minute_me . "m";
	
	$movies[] = $movie;
}


$data = json_encode($movies);

header("Content-Type: application/json");

print($data);




?>