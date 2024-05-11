import { Component, Input } from '@angular/core';
import { trigger, state, transition, animate, style, AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('widthAnimation', [
      state('expand', style({ width: '100%' })),
      state('shrink', style({ width: '0%' })),
      transition('shrink => expand', animate('2s ease-in')),
      transition('expand => shrink', animate('0.2s ease-out'))
    ])
  ]
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;

  constructor(private animationBuilder: AnimationBuilder) { }

  getWidthAnimation() {
    return this.animationBuilder.build([
      animate('2s', style({ width: '100%' }))
    ]);
  }
}
