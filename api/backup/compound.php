<?php

  include 'config.php';

  $query = mysqli_query($link, 'SELECT cid as id, nama as name FROM compound');

  $array = array();
  while($row = mysqli_fetch_assoc($query)){
    $array[] = $row;

  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
