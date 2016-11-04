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

    $cari = mysqli_query($link, "SELECT id FROM tanaman WHERE nama_latin = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['id'];

    $query = mysqli_query($link, "SELECT tc.id, c.cid, c.nama FROM `tanaman_compound` as tc, compound as c where tc.cid = c.cid and tc.id = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $array[] = array($value. ' (Plant)', $row['nama'].' (Compound)', 2);
    }
  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
