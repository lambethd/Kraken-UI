import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberConversionService {

  constructor() { }

  private billion: number = 1000000000;
  private million: number = 1000000;
  private thousand: number = 1000;

  public convertToNumber(numberAsString: String) {
    numberAsString = numberAsString
      .replace(",", "") //remove commas
      .replace(" ", ""); //remove spaces
    var kPrice = numberAsString.includes("k");
    var mPrice = numberAsString.includes("m");
    var bPrice = numberAsString.includes("b");
    numberAsString = numberAsString
      .replace("k", "") //remove k
      .replace("m", "") //remove m
      .replace("b", ""); //remove b
    var floatPrice = Number(numberAsString);
    if (kPrice) {
      floatPrice = floatPrice * this.thousand;
    }
    if (mPrice) {
      floatPrice = floatPrice * this.million;
    }
    if (bPrice) {
      floatPrice = floatPrice * this.billion;
    }
    return floatPrice;
  }

  public convertToString(number: number) {
    var text = "";
    if (number / this.billion > 1) {
      text = (number / this.billion) + "b";
    } else if (number / this.million > 1) {
      text = (number / this.million) + "m";
    } else if (number / this.thousand > 1) {
      text = (number / this.thousand) + "k";
    }
  }
}
