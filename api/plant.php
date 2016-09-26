<?php

  include 'config.php';

  $query = mysqli_query($link, 'SELECT id, nama_latin as name FROM tanaman');

  $array = array();
  while($row = mysqli_fetch_assoc($query)){
    $array[] = $row;

  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
