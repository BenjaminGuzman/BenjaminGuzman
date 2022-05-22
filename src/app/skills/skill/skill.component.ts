import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillComponent implements OnInit {
  @Input()
  public icon: string | undefined;

  @Input()
  public iconType: 'class' | 'img' | 'material-icon' = 'class';

  @Input()
  public title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
