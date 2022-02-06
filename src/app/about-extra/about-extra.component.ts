import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about-extra',
  templateUrl: './about-extra.component.html',
  styleUrls: ['./about-extra.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutExtraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
