import {DataBackgroundDirective} from './data-background.directive';
import { ElementRef } from '@angular/core';

describe('DataBackgroundDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new DataBackgroundDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
