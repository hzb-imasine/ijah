import { Component } from '@angular/core';

@Component({
  selector: 'detail',
  templateUrl: './detail.template.html'
})
export class Detail {
  array1 = [
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr1'],
    ['arr2'],
    ['arr3']
  ]

  array2 = [
    ['brr1'],
    ['brr2'],
    ['brr3']
  ]

  data = [];

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');

    // for(let i = 0; i < this.array1.length; i++){
    //   this.data.push(this.array1[i]);
    //   console.log(this.array1[i]);
    // }
    //
    // for(let j = 0; j < this.array2.length; j++){
    //   this.data.push(this.array2[j]);
    //   console.log(this.array2[j]);
    // }

    this.data[this.data.length] = this.array1;
    this.data[this.data.length] = this.array2;

    console.log(this.data);

  }

}
