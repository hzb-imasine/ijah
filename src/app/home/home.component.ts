import { Component } from '@angular/core';
import { AppState } from '../app.service';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';

@Component({
  selector: 'home',
  providers: [
  ],
  directives: [
  ],
  pipes: [ ],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {
  options: any;
  data: any;
  chartType: any;

  tanaman : any;
  compound: any;
  protein: any;
  disease: any;

  // count variable
  countTanaman = 0;
  countCompound = 0;
  countProtein = 0;
  countDisease = 0;

  // active variable
  activeTanaman = true;
  activeCompound = true;
  activeProtein = true;
  activeDisease = true;

  // show
  show = false;

  dataLocal = [];

  // typeahead
  public stateCtrl:FormControl = new FormControl();

  public myForm:FormGroup = new FormGroup({
    state: this.stateCtrl
  });

  // DATA search
  tanamanSearch: Array<string>;
  compoundSearch: Array<string>;
  proteinSearch: Array<string>;
  diseaseSearch: Array<string>;

  plant_total;
  compound_total;
  protein_total;
  disease_total;

  ngOnInit() {

  }

  constructor(public appState: AppState, private http: Http) {

    this.tanaman = [{ 'index': this.countTanaman, 'value' : ''}];
    this.compound = [{ 'index': this.countCompound, 'value' : ''}];
    this.protein = [{ 'index': this.countProtein, 'value' : ''}];
    this.disease = [{ 'index': this.countDisease, 'value' : ''}];

    this.http.get('http://localhost/ijah/total.php')
      .map(res => res.json())
      .subscribe(data => {
        this.plant_total = data[0]['plant_total'];
        this.compound_total = data[0]['compound_total'];
        this.protein_total = data[0]['protein_total'];
        this.disease_total = data[0]['disease_total'];

      })

    this.http.get('http://localhost/ijah/plant.php')
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let temp = data[i]['pla_name'];
          data[i]['search'] = temp;
        }

        this.tanamanSearch = data;
      })

    this.http.get('http://localhost/ijah/compound.php')
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let temp = '';
          if (data[i]['com_cas_id'] !== 'not-available') {
            temp = temp+data[i]['com_cas_id']+' | ';
          }

          if (data[i]['com_drugbank_id'] !== 'not-available') {
            temp = temp+data[i]['com_drugbank_id']+' | ';
          }

          if (data[i]['com_knapsack_id'] !== 'not-available') {
            temp = temp+data[i]['com_knapsack_id']+' | ';
          }

          if (data[i]['com_kegg_id'] !== 'not-available') {
            temp = temp+data[i]['com_kegg_id']+' | ';
          }

          if (data[i]['com_pubchem_id'] !== 'not-available') {
            temp = temp+data[i]['com_pubchem_id'];
          }


          // let temp = data[i]['com_cas_id']+' | '+data[i]['com_drugbank_id']+' | '+data[i]['com_knapsack_id']+' | '+data[i]['com_kegg_id']+' | '+data[i]['com_pubchem_id'];
          data[i]['search'] = temp;
        }

        this.compoundSearch = data;
      })

    this.http.get('http://localhost/ijah/protein.php')
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let temp = data[i]['pro_uniprot_id']+' | '+data[i]['pro_name'];
          data[i]['search'] = temp;
        }

        this.proteinSearch = data;
      })

    this.http.get('http://localhost/ijah/disease.php')
      .map(res => res.json())
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let temp = data[i]['dis_omim_id']+' | '+data[i]['dis_name'];
          data[i]['search'] = temp;
        }

        this.diseaseSearch = data;
      })

  }

  public typeaheadOnSelect(e:any):void {
    console.log('Selected value: ', e.item.com_id);
  }

  plantSelect = [];
  compoundSelect = [];
  proteinSelect = [];
  diseaseSelect = [];
  typeaheadNoResults:boolean = false;

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  selectPlant(e:any, index):void {
    if (index != this.countTanaman) {
      this.plantSelect.push({ 'index': this.countTanaman, 'value' : e.item.pla_id});
    }
    console.log(this.plantSelect);
  }

  selectCompound(e:any, index):void {
    if (index != this.countCompound) {
      this.compoundSelect.push({ 'index': this.countCompound, 'value' : e.item.com_id});
    }
    console.log(this.compoundSelect);
  }

  selectProtein(e:any, index):void {
    if (index != this.countProtein) {
      this.proteinSelect.push({ 'index': this.countProtein, 'value' : e.item.pro_id});
    }
  }

  selectDisease(e:any, index):void {
    if (index != this.countDisease) {
      this.diseaseSelect.push({ 'index': this.countDisease, 'value' : e.item.dis_id});
    }
  }

  focusTanaman(index: number) {
    this.activeCompound = false;
    if (index == this.countTanaman) {
      this.countTanaman++;
      this.tanaman.push({ 'index': this.countTanaman, 'value' : ''});
    }
  }

  focusCompound(index: number) {
    this.activeTanaman = false;
    if (index == this.countCompound) {
      this.countCompound++;
      this.compound.push({ 'index': this.countCompound, 'value' : ''});
    }
  }

  focusProtein(index: number) {
    this.activeDisease = false;
    if (index == this.countProtein) {
      this.countProtein++;
      this.protein.push({ 'index': this.countProtein, 'value' : ''});
    }
  }

  focusDisease(index: number) {
    this.activeProtein = false;
    if (index == this.countDisease) {
      this.countDisease++;
      this.disease.push({ 'index': this.countDisease, 'value' : ''});
    }
  }

  reset() {
    this.activeTanaman = true;
    this.activeCompound = true;
    this.activeProtein = true;
    this.activeDisease = true;

    this.pTanaman = false;
    this.pCompound = false;
    this.pProtein = false;
    this.pDisease = false;

    this.tanaman = [{ 'index': this.countTanaman, 'value' : ''}];
    this.compound = [{ 'index': this.countCompound, 'value' : ''}];
    this.protein = [{ 'index': this.countProtein, 'value' : ''}];
    this.disease = [{ 'index': this.countDisease, 'value' : ''}];

    this.plantSelect = [];
    this.compoundSelect = [];
    this.proteinSelect = [];
    this.diseaseSelect = [];

    this.show = false;
    localStorage.clear();
    this.dataLocal = [];

    this.typeaheadNoResults = false;
  }

  check(data, input1, input2) {


    for(var i = 0; i < data.length; i++) {
      if (data[i][0] == input1 && data[i][1] == input2) {
        return false;
      }
    }

    return true;
  }

  pTanaman = false;
  predictTanaman() {

    this.tanaman.pop();
    let tanam = JSON.stringify(this.plantSelect);
    console.log(tanam);

    this.http.post('http://localhost/ijah/zz-plant.php', tanam)
      .map(res => res.json())
      .subscribe(data => {

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        if (compoundProtein.length != 0) {

          for (let i = 0; i < 20; i++) {
            if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
              let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
              this.dataLocal.push(push);

            }
          }

          for(let i = 0; i < compoundProtein.length; i++) {
            for (let j = 0; j < this.dataLocal.length; j++) {
              if (compoundProtein[i][1] == this.dataLocal[j][0]) {
                if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
                  let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
                  this.dataLocal.push(push);
                }
              }
            }
          }

          for(let i = 0; i < plantCompound.length; i++) {
            for (let j = 0; j < this.dataLocal.length; j++) {
              if (plantCompound[i][1] == this.dataLocal[j][0]) {
                if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
                  let push = [plantCompound[i][0], plantCompound[i][1], 1 ];
                  this.dataLocal.push(push);
                }
              }
            }
          }

        }

        else {
          for (let i = 0; i < plantCompound.length; i++) {
            if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
              let push = [plantCompound[i][0], plantCompound[i][1], 1];
              this.dataLocal.push(push);
            }
          }
          for (let i = 0; i < compoundProtein.length; i++) {
            if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
              let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
              this.dataLocal.push(push);
            }
          }

        }

        this.pTanaman = true;

        localStorage.setItem('data', JSON.stringify(this.dataLocal));
        this.show = true;
        this.click = false;

      })

  }

  pProtein = false;
  predictProtein() {

    this.protein.pop();
    let prot = JSON.stringify(this.proteinSelect);

    this.http.post('http://localhost/ijah/zz-protein.php', prot)
      .map(res => res.json())
      .subscribe(data => {

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        if (plantCompound.length != 0) {

          for (let i = 0; i < 20; i++) {
            for (let j = 0; j < compoundProtein.length; j++) {

              if (plantCompound[i][1] == compoundProtein[j][0]) {
                if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
                  let push = [plantCompound[i][0], plantCompound[i][1], 1];
                  this.dataLocal.push(push);
                }
                if (this.check(this.dataLocal, compoundProtein[j][0], compoundProtein[j][1])) {
                  let push = [compoundProtein[j][0], compoundProtein[j][1], 1];
                  this.dataLocal.push(push);
                }

              }

            }
          }

        }

        else {
          for (let i = 0; i < compoundProtein.length  / (this.protein.length * 10); i++) {
            if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
              let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
              this.dataLocal.push(push);
            }
          }

        }

        for (let i = 0; i < proteinDisease.length ; i++) {
          if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
            let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
            this.dataLocal.push(push);
          }
        }

        this.pProtein = true;


      })

  }

  pCompound = false;
  predictCompound() {

    this.compound.pop();
    let comp = JSON.stringify(this.compoundSelect);

    this.http.post('http://localhost/ijah/zz-compound.php', comp)
      .map(res => res.json())
      .subscribe(data => {

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];


        if (proteinDisease.length != 0 && compoundProtein.length != 0) {

          for (let i = 0; i < 20; i++) {
            for (let j = 0; j < compoundProtein.length; j++) {

              if (proteinDisease[i][0] == compoundProtein[j][1]) {
                if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
                  let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
                  this.dataLocal.push(push);
                }
                if (this.check(this.dataLocal, compoundProtein[j][0], compoundProtein[j][1])) {
                  let push = [compoundProtein[j][0], compoundProtein[j][1], 1];
                  this.dataLocal.push(push);
                }

              }

            }
          }

        }

        else if (compoundProtein.length != 0){

          for (let i = 0; i < 20; i++) {
            if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
              let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
              this.dataLocal.push(push);
            }
          }

        }

        let limit;
        if (plantCompound.length > 20) limit = 20;
        else limit = plantCompound.length;

        for (let i = 0; i < limit; i++) {
          if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
            let push = [plantCompound[i][0], plantCompound[i][1], 1];
            this.dataLocal.push(push);
          }
        }

        this.pCompound = true;
      })

  }

  pDisease = false;
  predictDisease() {

    this.disease.pop();
    let dis = JSON.stringify(this.diseaseSelect);

    this.http.post('http://localhost/ijah/zz-disease.php', dis)
      .map(res => res.json())
      .subscribe(data => {

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];


        if (plantCompound.length != 0) {

          for (let i = 0; i < 20; i++) {
            for (let j = 0; j < compoundProtein.length; j++) {

              if (plantCompound[i][1] == compoundProtein[j][0]) {
                if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
                  let push = [plantCompound[i][0], plantCompound[i][1], 1];
                  this.dataLocal.push(push);
                }
                if (this.check(this.dataLocal, compoundProtein[j][0], compoundProtein[j][1])) {
                  let push = [compoundProtein[j][0], compoundProtein[j][1], 1];
                  this.dataLocal.push(push);
                }

              }

            }
          }

        }

        else {

          for(let i = 0; i < 20; i++) {
            for (let j = 0; j < this.dataLocal.length; j++) {
              if (compoundProtein[i][1] == this.dataLocal[j][0]) {
                if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
                  let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
                  this.dataLocal.push(push);
                }
              }
            }
          }

        }


        for (let i = 0; i < proteinDisease.length; i++) {
          if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
            let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
            this.dataLocal.push(push);
          }
        }

        this.pDisease = true;
      })

  }

  predictPlantProtein() {

    this.tanaman.pop();
    this.protein.pop();
    let tanam = JSON.stringify(this.tanaman);
    let prot = JSON.stringify(this.protein);

    let compoundProtein1;
    let compoundProtein2;

    let plantCompound;
    let proteinDisease;

    this.http.post('http://localhost/ijah/zz-plant.php', tanam)
      .map(res => res.json())
      .subscribe(data => {

        plantCompound = data[0]['plant_compound'];
        compoundProtein1 = data[1]['compound_protein'];

        this.http.post('http://localhost/ijah/zz-protein.php', prot)
          .map(res => res.json())
          .subscribe(data1 => {

            proteinDisease = data1[2]['protein_disease'];
            compoundProtein2 = data1[1]['compound_protein'];

            // console.log(compoundProtein1);
            // console.log(proteinDisease);

            for (let i = 0; i < compoundProtein1.length; i++) {

              for (let j = 0; j < proteinDisease.length; j++) {
                if (compoundProtein1[i][1] == proteinDisease[j][0]) {
                  let cp = compoundProtein1[i][0];
                  if (this.check(this.dataLocal, compoundProtein1[i][0].substr(0,29), proteinDisease[j][0].substr(0,29))) {
                    let push = [compoundProtein1[i][0].substr(0,29), proteinDisease[j][0].substr(0,29), 1];
                    this.dataLocal.push(push);
                  }

                  for (let z = 0; z < plantCompound.length; z++) {
                    if (plantCompound[z][1] == cp) {
                      if (this.check(this.dataLocal, plantCompound[z][0].substr(0,29), plantCompound[z][1].substr(0,40))) {
                        let push = [plantCompound[z][0].substr(0,29), plantCompound[z][1].substr(0,40), 1];
                        this.dataLocal.push(push);
                      }
                    }
                  }
                }
              }

            }

            for (let i = 0; i < proteinDisease.length; i++) {
              if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
                let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
                this.dataLocal.push(push);
              }
            }

            localStorage.setItem('data', JSON.stringify(this.dataLocal));
            this.show = true;

        })

    })

  }

  predictCompoundDisease() {

    this.compound.pop();
    this.disease.pop();
    let com = JSON.stringify(this.compound);
    let dis = JSON.stringify(this.disease);

    let compoundProtein1;
    let compoundProtein2;

    let plantCompound;
    let proteinDisease;

    this.http.post('http://localhost/ijah/zz-compound.php', com)
      .map(res => res.json())
      .subscribe(data => {

        plantCompound = data[0]['plant_compound'];
        compoundProtein1 = data[1]['compound_protein'];

        this.http.post('http://localhost/ijah/zz-disease.php', dis)
          .map(res => res.json())
          .subscribe(data1 => {

            proteinDisease = data1[2]['protein_disease'];
            compoundProtein2 = data1[1]['compound_protein'];

            for (let z = 0; z < 20; z++) {
              if (this.check(this.dataLocal, plantCompound[z][0].substr(0,40), plantCompound[z][1].substr(0,29))) {
                let push = [plantCompound[z][0].substr(0,40), plantCompound[z][1].substr(0,29), 1];
                this.dataLocal.push(push);
              }
            }

            for (let i = 0; i < compoundProtein1.length; i++) {
              for (let j = 0; j < proteinDisease.length; j++) {
                if (compoundProtein1[i][1] == proteinDisease[j][0]) {
                  if (this.check(this.dataLocal, compoundProtein1[i][0].substr(0,29), proteinDisease[j][0].substr(0,29))) {
                    let push = [compoundProtein1[i][0].substr(0,29), proteinDisease[j][0].substr(0,29), 1];
                    this.dataLocal.push(push);
                  }

                  if (this.check(this.dataLocal, proteinDisease[j][0].substr(0,29), proteinDisease[j][1].substr(0,40))) {
                    let push = [proteinDisease[j][0].substr(0,29), proteinDisease[j][1].substr(0,40), 1];
                    this.dataLocal.push(push);
                  }
                }
              }
            }

            localStorage.setItem('data', JSON.stringify(this.dataLocal));
            this.show = true;

        })

    })

  }

  example1() {
    this.reset();
    this.tanaman = [{ 'index': 1, 'value' : 'Datura stramonium'}, { 'index': 2, 'value' : 'Trifolium pratense'}, { 'index': 3, 'value' : 'Acacia senegal'}, { 'index': 4, 'value' : ''}];
    this.plantSelect = [{"index":1,"value":"PLA00002565"},{"index":2,"value":"PLA00001090"},{"index":3,"value":"PLA00000325"}];

    this.countTanaman = 4;
    this.activeCompound = false;
    this.activeProtein = false;
    this.activeDisease = false;
  }

  example2() {
    this.reset();
    this.compound = [{ 'index': 1, 'value' : '51-55-8 | DB00572 | C00002277 | 174174'}, { 'index': 2, 'value' : '61-50-7 | DB01488 | C00001407 | 6089'}, { 'index': 3, 'value' : '117-39-5 | DB04216 | C00004631 | 5280343'}, { 'index': 4, 'value' : ''}];
    this.compoundSelect = [{ 'index': 1, 'value' : 'COM00000039'}, { 'index': 2, 'value' : 'COM00000014'}, { 'index': 3, 'value' : 'COM00000058'}];

    this.countCompound = 2;
    this.activeDisease = false;
    this.activeTanaman = false;
    this.activeProtein = false;
  }

  example3() {
    this.reset();
    this.protein = [{ 'index': 1, 'value' : 'P07437 | Tubulin beta chain'}, { 'index': 2, 'value' : 'P02768 | Serum albumin'}, { 'index': 3, 'value' : ''}];
    this.proteinSelect = [{ 'index': 1, 'value' : 'PRO00002823'}, { 'index': 2, 'value' : 'PRO00001554'}];

    this.countProtein = 3;
    this.activeDisease = false;
    this.activeTanaman = false;
    this.activeCompound = false;
  }

  example4() {
    this.reset();
    this.disease = [{ 'index': 1, 'value' : '616669 | Immunodeficiency 45'}, { 'index': 2, 'value' : '256000 | Leigh syndrome'}, { 'index': 3, 'value' : '608516 | Major depressive disorder'}], { 'index': 4, 'value' : ''};
    this.diseaseSelect = [{ 'index': 1, 'value' : 'DIS00004042'}, { 'index': 2, 'value' : 'DIS00000371'}, { 'index': 3, 'value' : 'DIS00000849'}], { 'index': 4, 'value' : ''};

    this.countDisease = 4;
    this.activeProtein = false;
    this.activeTanaman = false;
    this.activeCompound = false;
  }

  example5() {
    this.reset();
    this.tanaman = [{ 'index': 1, 'value' : 'Adina racemosa'}, { 'index': 2, 'value' : 'Nicotiana tabacum'}, { 'index': 3, 'value' : ''}];
    this.countTanaman = 3;

    this.protein = [{ 'index': 1, 'value' : 'six1'}, { 'index': 2, 'value' : ''}];
    this.countProtein = 2;

    this.activeDisease = false;
    this.activeCompound = false;
  }

  example6() {
    this.reset();
    this.compound = [{ 'index': 1, 'value' : 'Kaempferol'}, { 'index': 2, 'value' : ''}];
    this.countCompound = 2;

    this.disease = [{ 'index': 1, 'value' : 'Breast cancer (BC)'}, { 'index': 2, 'value' : ''}];
    this.countDisease = 2;

    this.activeTanaman = false;
    this.activeProtein = false;
  }

  click = false;
  predict() {
    this.click = true;

    let showTanaman = false;
    let showCompound = false;
    let showProtein = false;
    let showDisease = false;

    if (this.tanaman.length > 1 && (this.protein.length <= 1 || this.disease.length <= 1)) {
        this.predictTanaman();
        showTanaman = true;
    }

    if (this.compound.length > 1 && (this.protein.length <= 1 || this.disease.length <= 1)) {
        this.predictCompound();
        showCompound = true;
    }

    if (this.protein.length > 1 && (this.tanaman.length <= 1 || this.compound.length <= 1)) {
        this.predictProtein();
        showProtein = true;
    }

    if (this.disease.length > 1 && (this.tanaman.length <= 1 || this.compound.length <= 1)) {
        this.predictDisease();
        showDisease = true;
    }
    //
    // if (this.tanaman.length > 1 && this.protein.length > 1) {
    //     this.predictPlantProtein();
    // }
    //
    // if (this.compound.length > 1 && this.disease.length > 1) {
    //     this.predictCompoundDisease();
    // }
    //
    // if (this.tanaman.length > 1 && this.disease.length > 1) {
    //     // this.predictPlantDisease();
    // }
    //
    // if (this.compound.length > 1 && this.protein.length > 1) {
    //     // this.predictCompoundProtein();
    // }

    var inter = setInterval(() => {

      if (showTanaman && !showProtein && !showDisease) {
        if (this.pTanaman) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          this.click = false;
          clearInterval(inter);
        }
      }

      else if (showCompound && !showProtein && !showDisease) {
        if(this.pCompound) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          this.click = false;
          clearInterval(inter);
        }
      }

      // else if (showTanaman && showProtein) {
      //   if(this.pTanaman && this.pProtein) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showTanaman && showDisease) {
      //   if (this.pTanaman && this.pDisease) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showCompound && showProtein) {
      //   if (this.pCompound && this.pProtein) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showCompound && showDisease) {
      //   if (this.pCompound && this.pDisease) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }

      else if (showProtein && !showTanaman && !showCompound) {
        if (this.pProtein) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          this.click = false;
          clearInterval(inter);
        }
      }

      else if (showDisease && !showTanaman && !showCompound) {
        if (this.pDisease) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          this.click = false;
          clearInterval(inter);
        }
      }
      //
      // else if (showProtein && showTanaman) {
      //   if (this.pProtein && this.pTanaman) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showProtein && showCompound) {
      //   if (this.pProtein && this.pCompound) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showDisease && showTanaman) {
      //   if (this.pDisease && this.pTanaman) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }
      //
      // else if (showDisease && showCompound) {
      //   if (this.pDisease && this.pCompound) {
      //     localStorage.setItem('data', JSON.stringify(this.dataLocal));
      //     this.show = true;
      //     clearInterval(inter);
      //   }
      // }

      if (this.show) this.click = false;

    }, 100);
    //

  }

}
