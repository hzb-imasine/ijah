import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
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
    Title
  ],
  directives: [
    XLarge, nvD3, ChartSelector
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
  constructor(public appState: AppState, public title: Title, private http: Http) {
    this.tanaman = [{ 'index': this.countTanaman, 'value' : '', 'active': true}];
    this.compound = [{ 'index': this.countCompound, 'value' : '', 'active': true}];
    this.protein = [{ 'index': this.countProtein, 'value' : '', 'active': true}];
    this.disease = [{ 'index': this.countDisease, 'value' : '', 'active': true}];

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
      this.tanaman.push({ 'index': this.countTanaman, 'value' : '', 'active': true});
    }
  }

  focusCompound(index: number) {
    this.activeTanaman = false;
    if (index == this.countCompound) {
      this.countCompound++;
      this.compound.push({ 'index': this.countCompound, 'value' : '', 'active': true});
    }
  }

  focusProtein(index: number) {
    this.activeDisease = false;
    if (index == this.countProtein) {
      this.countProtein++;
      this.protein.push({ 'index': this.countProtein, 'value' : '', 'active': true});
    }
  }

  focusDisease(index: number) {
    this.activeProtein = false;
    if (index == this.countDisease) {
      this.countDisease++;
      this.disease.push({ 'index': this.countDisease, 'value' : '', 'active': true});
    }
  }

  reset() {
    this.activeTanaman = true;
    this.activeCompound = true;
    this.activeProtein = true;
    this.activeDisease = true;

    this.tanaman = [{ 'index': this.countTanaman, 'value' : '', 'active': true}];
    this.compound = [{ 'index': this.countCompound, 'value' : '', 'active': true}];
    this.protein = [{ 'index': this.countProtein, 'value' : '', 'active': true}];
    this.disease = [{ 'index': this.countDisease, 'value' : '', 'active': true}];

  }

}
