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

    $query = mysqli_query($link, "SELECT t.id, cp.cid, t.nama_latin FROM `tanaman_compound` as cp, tanaman as t where cp.id = t.id and cp.cid = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $array[] = array($row['nama_latin'].' (Plant)', $value. ' (Compound)', 2);
    }
  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
