import { Component } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = 'Super Concepts';

  keyPressed(e): void {
    this.name = e.target.value;
  }

}
