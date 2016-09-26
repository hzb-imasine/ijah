<?php

  include 'config.php';

  function check($a, $var1, $var2) {
    foreach ($a as $arr) {
      if ($arr[0] == $var1 && $arr[1] == $var2){
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
  $arrayCompound = array();

  $array = array();
  foreach ($request as $key) {
    $value = $key['value'];

    $cari = mysqli_query($link, "SELECT disease_id FROM disease WHERE disease_name = '$value'");
    $rowCari = mysqli_fetch_assoc($cari);
    $index = $rowCari['disease_id'];

    $query = mysqli_query($link, "SELECT p.gi_number, p.protein_name, p.organisme, pd.disease_id FROM `protein_disease` as pd, protein as p where pd.gi_number = p.gi_number and pd.disease_id = '$index'");

    while($row = mysqli_fetch_assoc($query)){
      $indexProtein = $row['gi_number'];
      $namaProtein = $row['protein_name'];

      if(check($arrayDisease, $namaProtein.' (Protein)', $value.' (Disease)')) {
        $arrayDisease[] = array($namaProtein.' (Protein)', $value.' (Disease)');
      }

      $queryProtein = mysqli_query($link, "SELECT c.cid, c.nama, cp.gi_number FROM compound_protein as cp, compound as c where cp.cid = c.cid and cp.gi_number = '$indexProtein'");

      while($rowProtein = mysqli_fetch_assoc($queryProtein)) {
          $indexCompound = $rowProtein['cid'];
          $namaCompound = $rowProtein['nama'];

          if(check($arrayProtein, $namaCompound.' (Compound)', $namaProtein.' (Protein)')) {
            $arrayProtein[] = array($namaCompound.' (Compound)', $namaProtein.' (Protein)');
          }

          $queryDisease = mysqli_query($link, "SELECT t.id, t.nama_latin, tc.cid FROM `tanaman_compound` as tc, tanaman as t where tc.id = t.id and tc.cid = '$indexCompound'");

          while($rowDisease = mysqli_fetch_assoc($queryDisease)) {
            $namaPlant = $rowDisease['nama_latin'];

            if(check($arrayPlant, $namaPlant.' (Plant)', $namaCompound.' (Compound)')) {
              $arrayPlant[] = array($namaPlant.' (Plant)', $namaCompound.' (Compound)');
            }

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
