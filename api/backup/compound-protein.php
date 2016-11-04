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

    $cari = mysqli_query($link, "SELECT cid FROM compound WHERE nama = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['cid'];

    $query = mysqli_query($link, "SELECT cid, p.gi_number, p.protein_name, p.organisme FROM compound_protein as cp, protein as p where cp.gi_number = p.gi_number and cp.cid = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $array[] = array($value. ' (Compound)', $row['protein_name'].' (Protein)', 2);
    }
  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
