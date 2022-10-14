import { Injectable } from '@angular/core';
import { ColorService } from './color.service';

@Injectable()
export class GetService {
  constructor(private colorService: ColorService) {}

  get(serviceName: 'COLOR') {
    switch (serviceName) {
      case 'COLOR':
        return this.colorService;

      default:
        return undefined;
        
    }
  }
}
