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

    $cari = mysqli_query($link, "SELECT gi_number FROM protein WHERE protein_name = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['gi_number'];

    $query = mysqli_query($link, "SELECT pd.gi_number, d.* FROM `protein_disease` as pd, disease as d where pd.disease_id = d.disease_id and pd.gi_number = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $array[] = array($value.' (Protein)', $row['disease_name'].' (Disease)', 2);
    }
  }

  // print_r($array);
  header('Content-type: application/json');
  echo json_encode($array);

?>
