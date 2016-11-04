<?php

  include 'config.php';

  function check($a, $var1, $var2) {
    foreach ($a as $arr) {
      if ($arr[0] == $var1 && $arr[1] == $var2){
        // echo 'sama <br />';
        return false;
      }
    }
    return true;
  }

  // get JSON input from HTTP POST
  $postdata = file_get_contents("php://input");

  // JSON Decode from input
  $request = json_decode($postdata, true);

  $arrayPlant = array();
  $arrayCompound = array();
  $arrayProtein = array();
  $arrayDisease = array();

  $array = array();
  foreach ($request as $key) {
    $value = $key['value'];

    $cari = mysqli_query($link, "SELECT gi_number FROM protein WHERE protein_name = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['gi_number'];

    $query = mysqli_query($link, "SELECT pd.gi_number, d.* FROM `protein_disease` as pd, disease as d where pd.disease_id = d.disease_id and pd.gi_number = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      $namaDisease = $row['disease_name'];

      if(check($arrayDisease, $value, $namaDisease)) {
        $arrayDisease[] = array($value, $namaDisease);
      }

    }

    $queryProtein = mysqli_query($link, "SELECT cp.cid, c.nama, cp.gi_number FROM compound_protein as cp, compound as c where cp.cid = c.cid and cp.gi_number = '$index'");

    while($rowProtein = mysqli_fetch_assoc($queryProtein)) {
        $indexCompound = $rowProtein['cid'];
        $namaCompound = $rowProtein['nama'];

        if(check($arrayCompound, $namaCompound, $value)) {
          $arrayCompound[] = array($namaCompound, $value);
        }

        $queryDisease = mysqli_query($link, "SELECT t.id, cp.cid, t.nama_latin FROM `tanaman_compound` as cp, tanaman as t where cp.id = t.id and cp.cid = '$indexCompound'");

        while($rowDisease = mysqli_fetch_assoc($queryDisease)) {
          $namaPlant = $rowDisease['nama_latin'];

          if(check($arrayPlant, $namaPlant, $namaCompound)) {
            $arrayPlant[] = array($namaPlant, $namaCompound);
          }

        }

    }

  }

  header('Content-type: application/json');

  $final = array();

  $final[] = array('plant_compound'=> $arrayPlant);
  $final[] = array('compound_protein'=> $arrayCompound);
  $final[] = array('protein_disease'=> $arrayDisease);

  echo json_encode($final);


?>
