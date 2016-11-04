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
  $arrayProtein = array();
  $arrayDisease = array();

  $array = array();
  foreach ($request as $key) {
    $value = $key['value'];

    $cari = mysqli_query($link, "SELECT cid FROM compound WHERE nama = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['cid'];

    $query = mysqli_query($link, "SELECT t.id, cp.cid, t.nama_latin FROM `tanaman_compound` as cp, tanaman as t where cp.id = t.id and cp.cid = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      $compound = $row['cid'];
      $namaPlant = $row['nama_latin'];

      if(check($arrayPlant, $namaPlant, $value)) {
        $arrayPlant[] = array($namaPlant, $value);
      }

    }

    $queryProtein = mysqli_query($link, "SELECT p.gi_number, p.protein_name FROM compound_protein as cp, protein as p where cp.gi_number = p.gi_number and cp.cid = '$index'");

    while($rowProtein = mysqli_fetch_assoc($queryProtein)) {
        $indexProtein = $rowProtein['gi_number'];
        $namaProtein = $rowProtein['protein_name'];

        if(check($arrayProtein, $value, $namaProtein)) {
          $arrayProtein[] = array($value, $namaProtein);
        }

        $queryDisease = mysqli_query($link, "SELECT d.disease_id, d.disease_name, pd.gi_number FROM protein_disease as pd, disease as d where pd.disease_id = d.disease_id and pd.gi_number = '$indexProtein'");

        while($rowDisease = mysqli_fetch_assoc($queryDisease)) {

          if(check($arrayDisease, $namaProtein, $rowDisease['disease_name'])) {
            $arrayDisease[] = array($namaProtein, $rowDisease['disease_name']);
          }

        }

    }

  }

  header('Content-type: application/json');

  $final = array();

  $final[] = array('plant_compound'=> $arrayPlant);
  $final[] = array('compound_protein'=> $arrayProtein);
  $final[] = array('protein_disease'=> $arrayDisease);

  echo json_encode($final);


?>
