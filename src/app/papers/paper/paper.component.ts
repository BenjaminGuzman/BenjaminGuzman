import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Paper } from './Paper';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperComponent implements OnInit {
  @Input()
  public paperData: Paper = null as unknown as Paper;

  constructor() { }

  ngOnInit(): void {
  }
}
