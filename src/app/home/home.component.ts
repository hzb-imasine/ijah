import { Component } from '@angular/core';
import { AppState } from '../app.service';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';
import {SimplePageScroll} from 'ng2-simple-page-scroll';

@Component({
  selector: 'home',
  providers: [
  ],
  directives: [
    SimplePageScroll
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

  localState = { value: '' };
  constructor(public appState: AppState, private http: Http) {
    this.tanaman = [{ 'index': this.countTanaman, 'value' : ''}];
    this.compound = [{ 'index': this.countCompound, 'value' : ''}];
    this.protein = [{ 'index': this.countProtein, 'value' : ''}];
    this.disease = [{ 'index': this.countDisease, 'value' : ''}];

    this.http.get('http://ijah.agri.web.id/api/plant.php')
      .map(res => res.json())
      .subscribe(data => {
        this.tanamanSearch = data;
      })

    this.http.get('http://ijah.agri.web.id/api/compound.php')
      .map(res => res.json())
      .subscribe(data => {
        this.compoundSearch = data;
      })

    this.http.get('http://ijah.agri.web.id/api/protein.php')
      .map(res => res.json())
      .subscribe(data => {
        this.proteinSearch = data;
      })

    this.http.get('http://ijah.agri.web.id/api/disease.php')
      .map(res => res.json())
      .subscribe(data => {
        this.diseaseSearch = data;
      })

  }

  public typeaheadOnSelect(e:any):void {
    console.log('Selected value: ', e.item);
  }

  ngOnInit() {

  }

  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  selectType(e: any){
    this.chartType = e;
    // this.options = AllOptions[this.chartType];
    // this.data = AllData[this.chartType];
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


    this.show = false;
    localStorage.clear();
    this.dataLocal = [];
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
    let tanam = JSON.stringify(this.tanaman);
    // console.log(tanam);

    this.http.post('http://ijah.agri.web.id/api/zz-plant.php', tanam)
      .map(res => res.json())
      .subscribe(data => {

        // console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(this.tanaman.length *2);

        if (proteinDisease.length != 0) {

          for (let i = 0; i < proteinDisease.length / (this.tanaman.length * 5); i++) {
            if (this.check(this.dataLocal, proteinDisease[i][0], proteinDisease[i][1])) {
              let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
              this.dataLocal.push(push);
            }
          }

          let cp = [];
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



        // console.log(this.dataLocal);
        this.pTanaman = true;

        // localStorage.setItem('data', JSON.stringify(this.dataLocal));
        // this.show = true;
      })

    // console.log(tanam);
  }

  pProtein = false;
  predictProtein() {

    this.protein.pop();
    let prot = JSON.stringify(this.protein);
    // console.log(tanam);

    this.http.post('http://ijah.agri.web.id/api/zz-protein.php', prot)
      .map(res => res.json())
      .subscribe(data => {

        // console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(plantCompound.length);

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

        // console.log(this.dataLocal);

        // localStorage.setItem('data', JSON.stringify(this.dataLocal));
        // this.show = true;
        this.pProtein = true;
      })

    // console.log(tanam);
  }

  pCompound = false;
  predictCompound() {

    this.compound.pop();
    let comp = JSON.stringify(this.compound);
    // console.log(tanam);

    this.http.post('http://ijah.agri.web.id/api/zz-compound.php', comp)
      .map(res => res.json())
      .subscribe(data => {

        // console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(proteinDisease.length);

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

        // console.log(this.dataLocal);

        // localStorage.setItem('data', JSON.stringify(this.dataLocal));
        // this.show = true;
        this.pCompound = true;
      })

  }

  pDisease = false;
  predictDisease() {

    this.disease.pop();
    let dis = JSON.stringify(this.disease);
    // console.log(tanam);

    this.http.post('http://ijah.agri.web.id/api/zz-disease.php', dis)
      .map(res => res.json())
      .subscribe(data => {

        // console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(this.tanaman.length *2);

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


        // localStorage.setItem('data', JSON.stringify(this.dataLocal));
        // this.show = true;
        this.pDisease = true;
      })

  }

  example1() {
    this.reset();
    this.tanaman = [{ 'index': 1, 'value' : 'Adina racemosa'}, { 'index': 2, 'value' : 'Rosmarinus officinalis'}, { 'index': 4, 'value' : 'Vitis spp.'}, { 'index': 3, 'value' : ''}];

    this.countTanaman = 4;
    this.activeCompound = false;
    this.activeProtein = false;
    this.activeDisease = false;
  }

  example2() {
    this.reset();
    this.compound = [{ 'index': 1, 'value' : 'Kaempferol'}, { 'index': 2, 'value' : ''}];

    this.countCompound = 2;
    this.activeDisease = false;
    this.activeTanaman = false;
    this.activeProtein = false;
  }

  example3() {
    this.reset();
    this.protein = [{ 'index': 1, 'value' : 'Sialate O-acetylesterase'}, { 'index': 2, 'value' : 'Guanine nucleotide-binding protein G(s) subunit alpha isoforms short'}, { 'index': 3, 'value' : ''}];

    this.countProtein = 3;
    this.activeDisease = false;
    this.activeTanaman = false;
    this.activeCompound = false;
  }

  example4() {
    this.reset();
    this.disease = [{ 'index': 1, 'value' : 'Diabetes mellitus, insulin-dependent, 22 (IDDM22)'}, { 'index': 2, 'value' : ''}];

    this.countDisease = 2;
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

  predict() {

    let showTanaman = false;
    let showCompound = false;
    let showProtein = false;
    let showDisease = false;

    if (this.tanaman.length > 1) {
        this.predictTanaman();
        showTanaman = true;
    }

    if (this.compound.length > 1) {
        this.predictCompound();
        showCompound = true;
    }

    if (this.protein.length > 1) {
        this.predictProtein();
        showProtein = true;
    }

    if (this.disease.length > 1) {
        this.predictDisease();
        showDisease = true;
    }

    var inter = setInterval(() => {

      if (showTanaman && !showProtein && !showDisease) {
        if (this.pTanaman) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showCompound && !showProtein && !showDisease) {
        if(this.pCompound) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showTanaman && showProtein) {
        if(this.pTanaman && this.pProtein) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showTanaman && showDisease) {
        if (this.pTanaman && this.pDisease) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showCompound && showProtein) {
        if (this.pCompound && this.pProtein) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showCompound && showDisease) {
        if (this.pCompound && this.pDisease) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showProtein && !showTanaman && !showCompound) {
        if (this.pProtein) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showDisease && !showTanaman && !showCompound) {
        if (this.pDisease) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showProtein && showTanaman) {
        if (this.pProtein && this.pTanaman) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showProtein && showCompound) {
        if (this.pProtein && this.pCompound) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showDisease && showTanaman) {
        if (this.pDisease && this.pTanaman) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      else if (showDisease && showCompound) {
        if (this.pDisease && this.pCompound) {
          localStorage.setItem('data', JSON.stringify(this.dataLocal));
          this.show = true;
          clearInterval(inter);
        }
      }

      // localStorage.setItem('data', JSON.stringify(this.dataLocal));
      // this.show = true;
      // console.log('2 detik');
      // clearInterval(inter);
    }, 100);


  }

}
