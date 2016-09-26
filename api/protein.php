<?php

  include 'config.php';

  $query = mysqli_query($link, 'SELECT gi_number as id, protein_name as name FROM protein');

  $array = array();
  while($row = mysqli_fetch_assoc($query)){
    $array[] = $row;

  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
