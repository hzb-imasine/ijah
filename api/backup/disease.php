<?php

  include 'config.php';

  $query = mysqli_query($link, 'SELECT disease_id as id, disease_name as name FROM disease');

  $array = array();
  while($row = mysqli_fetch_assoc($query)){
    $array[] = $row;

  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
