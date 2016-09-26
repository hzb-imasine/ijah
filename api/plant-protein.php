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
    // echo $index.' .';

    $query = mysqli_query($link, "SELECT tc.id, c.cid, c.nama FROM `tanaman_compound` as tc, compound as c where tc.cid = c.cid and tc.id = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      // $array[] = array(id => $index, plant => $value, cid => $row['cid'], compound => $row['nama']);
      $compound = $row['cid'];
      $namaCompound = $row['nama'];

      // echo $compound;

      $queryProtein = mysqli_query($link, "SELECT p.gi_number, p.protein_name FROM compound_protein as cp, protein as p where cp.gi_number = p.gi_number and cp.cid = '$compound'");

      while($rowProtein = mysqli_fetch_assoc($queryProtein)) {
          $array[] = array($namaCompound.' (Compound)', $rowProtein['protein_name'].' (Protein)', 2);
      }

      // $array[] = array($value, $row['nama'], 3);
    }
  }

  header('Content-type: application/json');
  echo json_encode($array);

?>
