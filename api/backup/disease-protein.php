<?php

  include 'config.php';

  // get JSON input from HTTP POST
  $postdata = file_get_contents("php://input");

  // JSON Decode from input
  $request = json_decode($postdata, true);

  $array = array();
  foreach ($request as $key) {
    // echo $key['value'].'<br />';
    $value = $key['value'];
    // $index = $key['index'];

    $cari = mysqli_query($link, "SELECT disease_id FROM disease WHERE disease_name = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['disease_id'];

    $query = mysqli_query($link, "SELECT p.gi_number, p.protein_name, p.organisme, pd.disease_id FROM `protein_disease` as pd, protein as p where pd.gi_number = p.gi_number and pd.disease_id = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $array[] = array($row['protein_name'].' (Protein)', $value.' (Disease)', 2);
    }
  }

  // print_r($array);
  header('Content-type: application/json');
  echo json_encode($array);

?>
