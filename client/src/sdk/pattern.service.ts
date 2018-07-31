import { Injectable, Optional } from '@angular/core';

@Injectable()
export class PatternService {

  public findPattern<T>(elements: Array<T>, minLength: number): Array<T> | undefined {
    let length = elements.length

    if (length > 0 && length % 2 != 0) { return undefined; }
    else {
        let halfLength = length / 2;
        let left = elements.slice(0, halfLength);
        let right = elements.slice(halfLength, length);

        if(!this.equals(left, right)) { return undefined; }
        else { return left; }
    }
  }

  private equals<T>(a: Array<T>, b: Array<T>): Boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

}
