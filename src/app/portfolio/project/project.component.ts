import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {Project} from "./Project";
import {animate, AnimationEvent, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("descAnimation", [
      state("open", style({
        height: "*",
        display: "flex"
      })),
      state("closed", style({
        height: "0",
        opacity: "0",
        display: "none"
      })),
      transition("open => closed", [
        animate("600ms ease-in", keyframes([
          style({
            height: "*",
            opacity: "1",
            display: "flex",
            pointerEvents: "none"
          }),
          style({
            height: "*",
            opacity: "0",
            display: "flex"
          }),
          style({
            height: "0",
            opacity: "0",
            display: "none",
          })
        ]))
      ]),
      transition("closed => open", [
        style({display: "flex"}),
        animate("300ms ease-out")
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit {
  @Input()
  public projectData: Project = null as unknown as Project;

  public descAnimationState: 'open' | 'closed' = 'closed';

  @ViewChild("descPanel")
  private descPanel: ElementRef = undefined as unknown as ElementRef;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  toggleDescAnimation() {
    if (this.descAnimationState === 'open')
      this.descAnimationState = 'closed';
    else
      this.descAnimationState = 'open';
  }

  descAnimationDone(evt: AnimationEvent) {
    if (evt.toState === 'open')
      this.descPanel.nativeElement.style = "opacity: 1";
  }
}