import { Component } from '@angular/core';
import { AppState } from '../app.service';
// import { Title } from './title';
// import { XLarge } from './x-large';
import { nvD3 } from '../ng2-nvd3';
import { ChartTypes, AllOptions, AllData } from '../chart/defs';
import { ChartSelector } from '../chart';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';

@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  directives: [
    nvD3, ChartSelector
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

    this.http.get('api/plant.php')
      .map(res => res.json())
      .subscribe(data => {
        this.tanamanSearch = data;
      })

    this.http.get('api/compound.php')
      .map(res => res.json())
      .subscribe(data => {
        this.compoundSearch = data;
      })

    this.http.get('api/protein.php')
      .map(res => res.json())
      .subscribe(data => {
        this.proteinSearch = data;
      })

    this.http.get('api/disease.php')
      .map(res => res.json())
      .subscribe(data => {
        this.diseaseSearch = data;
      })

    // let test = [
    //      [ 'Brazil', 'Portugal', 5 ],
    //      [ 'Brazil', 'France', 1 ],
    //      [ 'Brazil', 'Spain', 1 ],
    //      [ 'Brazil', 'England', 1 ],
    //      [ 'Canada', 'Portugal', 1 ],
    //      [ 'Canada', 'France', 5 ],
    //      [ 'Canada', 'England', 1 ],
    //      [ 'Mexico', 'Portugal', 1 ],
    //      [ 'Mexico', 'France', 1 ],
    //      [ 'Mexico', 'Spain', 5 ],
    //      [ 'Mexico', 'England', 1 ],
    //      [ 'USA', 'Portugal', 1 ],
    //      [ 'USA', 'France', 1 ],
    //      [ 'USA', 'Spain', 1 ],
    //      [ 'USA', 'England', 5 ],
    //      [ 'Portugal', 'Angola', 2 ],
    //      [ 'Portugal', 'Senegal', 1 ],
    //      [ 'Portugal', 'Morocco', 1 ],
    //      [ 'Portugal', 'South Africa', 3 ],
    //      [ 'France', 'Angola', 1 ],
    //      [ 'France', 'Senegal', 3 ],
    //      [ 'France', 'Mali', 3 ],
    //      [ 'France', 'Morocco', 3 ],
    //      [ 'France', 'South Africa', 1 ],
    //      [ 'Spain', 'Senegal', 1 ],
    //      [ 'Spain', 'Morocco', 3 ],
    //      [ 'Spain', 'South Africa', 1 ],
    //      [ 'England', 'Angola', 1 ],
    //      [ 'England', 'Senegal', 1 ],
    //      [ 'England', 'Morocco', 2 ],
    //      [ 'England', 'South Africa', 7 ],
    //      [ 'South Africa', 'China', 5 ],
    //      [ 'South Africa', 'India', 1 ],
    //      [ 'South Africa', 'Japan', 3 ],
    //      [ 'Angola', 'China', 5 ],
    //      [ 'Angola', 'India', 1 ],
    //      [ 'Angola', 'Japan', 3 ],
    //      [ 'Senegal', 'China', 5 ],
    //      [ 'Senegal', 'India', 1 ],
    //      [ 'Senegal', 'Japan', 3 ],
    //      [ 'Mali', 'China', 5 ],
    //      [ 'Mali', 'India', 1 ],
    //      [ 'Mali', 'Japan', 3 ],
    //     [ 'Indonesia', 'Spain', 5 ],
    //      [ 'Morocco', 'China', 5 ],
    //      [ 'Morocco', 'India', 1 ],
    //      [ 'Morocco', 'Japan', 3 ]
    //   ];
    //
    //   let aa = [
    //     ['dwadaw', 'dwad', 2],
    //     ['dwadaw', 'dwad', 2]
    //   ];
    //
    //   for (var i = 0; i < aa.length; i++) {
    //     test.push(aa[i]);
    //   };
      // test.push(aa);

      // console.log(JSON.stringify(test));

      // console.log(test);
      // localStorage.setItem('data', test);

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
    this.options = AllOptions[this.chartType];
    this.data = AllData[this.chartType];
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

  // searchIndex(data, value) {
  //   for( let i = 0; i < data.length; i++) {
  //     if (data[i]['name'] == value) {
  //       return data[i]['name'];
  //     }
  //   }
  // }

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

  predict() {

    let showTanaman = false;
    let showCompound = false;
    let showProtein = false;
    let showDisease = false;
    let showTanamanProtein = false;

    // if (this.activeTanaman) {
    //   this.tanaman.pop();
    //   let tanam = JSON.stringify(this.tanaman);
    //   // console.log(tanam);
    //
    //   this.http.post('api/plant-protein.php', tanam)
    //     .map(res => res.json())
    //     .subscribe(data1 => {
    //       for(let z = 0; z < data1.length; z++) {
    //         this.dataLocal.push(data1[z]);
    //         console.log(data1[z]);
    //       }
    //
    //       localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //       this.show = true;
    //       // showTanamanProtein = true;
    //     })
    //
    //
    //   this.http.post('api/plant-compound.php', tanam)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       // for(let i = 0; i < data.length; i++) {
    //       //   this.dataLocal.push(data[i]);
    //       // }
    //
    //       console.log(this.dataLocal);
    //       showTanaman = true;
    //
    //       if (showTanaman && showProtein) {
    //         localStorage.setItem('data', JSON.stringify(this.dataLocal));
    //         this.show = true;
    //       }
    //     })
    //
    //
    //
    //
    //   // console.log(tanam);
    // }
    //
    // if (this.activeProtein) {
    //   this.protein.pop();
    //   let prot = JSON.stringify(this.protein);
    //   // tanam.pop();
    //   console.log(prot);
    //
    //   this.http.post('api/protein-disease.php', prot)
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
    //   this.http.post('api/disease-protein.php', dis)
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
    //   this.http.post('api/disease-protein.php', comp)
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
    //   console.log(comp);
    // }



    let tanam = JSON.stringify(this.tanaman);
    // tanam.pop();

    let creds = [];

    if(this.activeTanaman) {
      this.tanaman.pop();
      for (let i = 0; i < this.tanaman.length; i++) {
        // creds.push(this.tanaman[i]);
        creds.push({'tanaman': this.tanaman[i]['value'], 'disease': this.disease[0]['value']});
        // console.log(creds);
        // console.log(this.tanaman[i]['value']);
      }

      console.log(JSON.stringify(creds));

      this.http.post('api/test.php', JSON.stringify(creds))
        .map(res => res.json())
        .subscribe(data => {
          for(let i = 0; i < data.length; i++) {
            this.dataLocal.push(data[i]);
          }

            // console.log(this.dataLocal);
            showProtein = true;

            localStorage.setItem('data', JSON.stringify(this.dataLocal));
            this.show = true;

          // console.log
        })
    }

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

  compoundProtein() {

  }

}
