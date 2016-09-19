import { Component } from '@angular/core';
import { AppState } from '../app.service';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';

@Component({
  selector: 'home',  // <home></home>
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

  localState = { value: '' };
  constructor(public appState: AppState, private http: Http) {
    this.tanaman = [{ 'index': this.countTanaman, 'value' : ''}];
    this.compound = [{ 'index': this.countCompound, 'value' : ''}];
    this.protein = [{ 'index': this.countProtein, 'value' : ''}];
    this.disease = [{ 'index': this.countDisease, 'value' : ''}];

    this.http.get('http://localhost/ijah/plant.php')
      .map(res => res.json())
      .subscribe(data => {
        this.tanamanSearch = data;
      })

    this.http.get('http://localhost/ijah/compound.php')
      .map(res => res.json())
      .subscribe(data => {
        this.compoundSearch = data;
      })

    this.http.get('http://localhost/ijah/protein.php')
      .map(res => res.json())
      .subscribe(data => {
        this.proteinSearch = data;
      })

    this.http.get('http://localhost/ijah/disease.php')
      .map(res => res.json())
      .subscribe(data => {
        this.diseaseSearch = data;
      })

  }

  public typeaheadOnSelect(e:any):void {
    console.log('Selected value: ', e.item);
  }

  ngOnInit() {
    console.log('hello `Home` component');
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

  predictTanaman() {

    this.tanaman.pop();
    let tanam = JSON.stringify(this.tanaman);
    // console.log(tanam);

    this.http.post('http://localhost/ijah/zz-plant.php', tanam)
      .map(res => res.json())
      .subscribe(data => {

        console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(this.tanaman.length *2);

        if (proteinDisease.length != 0) {

          for (let i = 0; i < proteinDisease.length / (this.tanaman.length * 5); i++) {
            let push = [proteinDisease[i][0], proteinDisease[i][1], 1];

            this.dataLocal.push(push);
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
            let push = [plantCompound[i][0], plantCompound[i][1], 1];
            this.dataLocal.push(push);
          }

          for (let i = 0; i < compoundProtein.length; i++) {
            let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
            this.dataLocal.push(push);
          }

        }



        // console.log(this.dataLocal);

        localStorage.setItem('data', JSON.stringify(this.dataLocal));
        this.show = true;
      })

    // console.log(tanam);
  }

  predictProtein() {

    this.protein.pop();
    let prot = JSON.stringify(this.protein);
    // console.log(tanam);

    this.http.post('http://localhost/ijah/zz-protein.php', prot)
      .map(res => res.json())
      .subscribe(data => {

        // console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(plantCompound.length);

        if (plantCompound.length != 0) {

          // for (let i = 0; i < plantCompound.length; i++) {
          //   let push = [plantCompound[i][0], plantCompound[i][1], 1];
          //   this.dataLocal.push(push);
          // }
          //
          // for(let i = 0; i < compoundProtein.length / (this.protein.length * 15); i++) {
          //   for (let j = 0; j < plantCompound.length; j++) {
          //     if (compoundProtein[i][0] == plantCompound[j][1]) {
          //         let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
          //         this.dataLocal.push(push);
          //     }
          //   }
          // }

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



          // for (let i = 0; i < compoundProtein.length  / (this.protein.length * 20); i++) {
          //   let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
          //   this.dataLocal.push(push);
          // }
          //
          // for(let i = 0; i < plantCompound.length   / (this.protein.length * 100); i++) {
          //   for (let j = 0; j < this.dataLocal.length; j++) {
          //     if (this.dataLocal[j][0] == plantCompound[i][1]) {
          //       if (this.check(this.dataLocal, plantCompound[i][0], plantCompound[i][1])) {
          //         let push = [plantCompound[i][0], plantCompound[i][1], 1];
          //         this.dataLocal.push(push);
          //       }
          //     }
          //   }
          // }

        }

        else {
          for (let i = 0; i < compoundProtein.length  / (this.protein.length * 10); i++) {
            let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
            this.dataLocal.push(push);
          }

        }


        for (let i = 0; i < proteinDisease.length ; i++) {
          let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
          this.dataLocal.push(push);
        }

        // console.log(this.dataLocal);

        localStorage.setItem('data', JSON.stringify(this.dataLocal));
        this.show = true;
      })

    // console.log(tanam);
  }


  predictDisease() {

    this.disease.pop();
    let dis = JSON.stringify(this.disease);
    // console.log(tanam);

    this.http.post('http://localhost/ijah/zz-disease.php', dis)
      .map(res => res.json())
      .subscribe(data => {

        console.log(data);

        let plantCompound = data[0]['plant_compound'];
        let compoundProtein = data[1]['compound_protein'];
        let proteinDisease = data[2]['protein_disease'];

        // console.log(this.tanaman.length *2);

        if (plantCompound.length != 0) {

          for (let i = 0; i < proteinDisease.length; i++) {
            let push = [proteinDisease[i][0], proteinDisease[i][1], 1];

            this.dataLocal.push(push);
          }


          for(let i = 0; i < compoundProtein.length / (this.disease.length * 5); i++) {
            for (let j = 0; j < this.dataLocal.length; j++) {
              if (compoundProtein[i][1] == this.dataLocal[j][0]) {
                if (this.check(this.dataLocal, compoundProtein[i][0], compoundProtein[i][1])) {
                  let push = [compoundProtein[i][0], compoundProtein[i][1], 1];
                  this.dataLocal.push(push);
                }
              }
            }
          }


          for(let i = 0; i < plantCompound.length / (this.disease.length * 25); i++) {
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

          for (let i = 0; i < proteinDisease.length; i++) {
            let push = [proteinDisease[i][0], proteinDisease[i][1], 1];
            this.dataLocal.push(push);
          }

          for(let i = 0; i < compoundProtein.length / (this.disease.length * 5); i++) {
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



        localStorage.setItem('data', JSON.stringify(this.dataLocal));
        this.show = true;
      })

  }

  example1() {
    this.tanaman = [{ 'index': 1, 'value' : 'Adina racemosa'}, { 'index': 2, 'value' : 'Rosmarinus officinalis'}, { 'index': 3, 'value' : ''}];

    this.countTanaman = 3;
    this.activeCompound = false;
    this.activeProtein = false;
    this.activeDisease = false;
  }

  example2() {
    this.protein = [{ 'index': 1, 'value' : 'Sialate O-acetylesterase'}, { 'index': 2, 'value' : 'Guanine nucleotide-binding protein G(s) subunit alpha isoforms short'}, { 'index': 3, 'value' : ''}];

    this.countProtein = 3;
    this.activeDisease = false;
    this.activeTanaman = false;
    this.activeCompound = false;
  }

  example3() {
    this.disease = [{ 'index': 1, 'value' : 'Diabetes mellitus, insulin-dependent, 22 (IDDM22)'}, { 'index': 2, 'value' : ''}];

    this.countDisease = 2;
    this.activeProtein = false;
    this.activeTanaman = false;
    this.activeCompound = false;
  }

  predict() {

    let showTanaman = false;
    let showCompound = false;
    let showProtein = false;
    let showDisease = false;
    let showTanamanProtein = false;

    if (this.activeTanaman) {
        this.predictTanaman();

    }

    if (this.activeProtein) {
        this.predictProtein();

    }

    if (this.activeDisease) {
        this.predictDisease();

    }

    // if (this.activeProtein) {
    //   this.protein.pop();
    //   let prot = JSON.stringify(this.protein);
    //   // tanam.pop();
    //   console.log(prot);
    //
    //   this.http.post('http://localhost/ijah/protein-disease.php', prot)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       for(let i = 0; i < data.length; i++) {
    //         this.dataLocal.push(data[i]);
    //       }
    //
    //       console.log(this.dataLocal);
    //       showProtein = true;
    //
    //       if (showTanaman && showProtein) {
    //         localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //         this.show = true;
    //       }
    //
    //       // console.log
    //     })
    //
    //   console.log(prot);
    // }
    //
    // if (this.activeDisease) {
    //   this.disease.pop();
    //   let dis = JSON.stringify(this.disease);
    //   // tanam.pop();
    //
    //   this.http.post('http://localhost/ijah/disease-protein.php', dis)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       for(let i = 0; i < data.length; i++) {
    //         this.dataLocal.push(data[i]);
    //       }
    //
    //       // console.log(this.dataLocal);
    //       // showDisease = true;
    //       //
    //       // if (showTanaman && showProtein) {
    //       //   localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //       //   this.show = true;
    //       // }
    //
    //     })
    //
    //   console.log(dis);
    // }
    //
    // if (this.activeCompound) {
    //   this.compound.pop();
    //   let comp = JSON.stringify(this.compound);
    //   // tanam.pop();
    //
    //   // this.http.post('http://localhost/ijah/disease-protein.php', comp)
    //   //   .map(res => res.json())
    //   //   .subscribe(data => {
    //   //     for(let i = 0; i < data.length; i++) {
    //   //       this.dataLocal.push(data[i]);
    //   //     }
    //   //
    //   //     // console.log(this.dataLocal);
    //   //     // showDisease = true;
    //   //     //
    //   //     // if (showTanaman && showProtein) {
    //   //     //   localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //   //     //   this.show = true;
    //   //     // }
    //   //
    //   //   })
    //
    //   console.log(comp);
    // }



    // let tanam = JSON.stringify(this.tanaman);
    // // tanam.pop();
    //
    // let creds = [];
    //
    // if(this.activeTanaman) {
    //   this.tanaman.pop();
    //   for (let i = 0; i < this.tanaman.length; i++) {
    //     // creds.push(this.tanaman[i]);
    //     creds.push({'tanaman': this.tanaman[i]['value'], 'disease': this.disease[0]['value']});
    //     // console.log(creds);
    //     // console.log(this.tanaman[i]['value']);
    //   }
    //
    //   console.log(JSON.stringify(creds));
    //
    //   this.http.post('http://localhost/ijah/test.php', JSON.stringify(creds))
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       for(let i = 0; i < data.length; i++) {
    //         this.dataLocal.push(data[i]);
    //       }
    //
    //         // console.log(this.dataLocal);
    //         showProtein = true;
    //
    //         localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //         this.show = true;
    //
    //       // console.log
    //     })
    // }

    // if(this.activeCompound) {
    //   this.compound.pop();
    //   for (let i = 0; i < this.compound.length; i++) {
    //     // creds.push(this.compound[i]);
    //     creds.push({'compound': this.compound[i]['value']});
    //   }
    // }
    //
    // if(this.activeProtein) {
    //   this.protein.pop();
    //   for (let i = 0; i < this.protein.length; i++) {
    //     // creds.push(this.protein[i]);
    //     creds.push({'protein': this.protein[i]['value']});
    //   }
    // }
    //
    // if(this.activeDisease) {
    //   this.disease.pop();
    //   for (let i = 0; i < this.tanaman.length; i++) {
    //     // creds.push(this.tanaman[i]);
    //     creds.push({'disease': this.disease[i]['value']});
    //   }
    // }



  }

}
