import { NumberConversionService } from '@/_services/number-conversion.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberUnit'
})
export class NumberUnitPipe implements PipeTransform {

  constructor (private numberConversionService: NumberConversionService){

  }
  transform(value: number, ...args: unknown[]): unknown {
    return this.numberConversionService.convertToString(value);
  }

}
