import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  // Toujour on est dans le composant enfant
  // du composant parent vers le composant enfant
  @Input() title: string = '';
  @Input() data: any[] = [];
  // du composant enfant vers le composant parent
  @Output() selectedValue = new EventEmitter()

  detectChanges(event: any) {
    this.selectedValue.emit(event)
  }
}
