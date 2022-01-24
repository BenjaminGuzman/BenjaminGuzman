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

  public descriptionAnimationState: 'open' | 'closed' = 'closed';
  public animationChangedAt: Date = new Date();

  @ViewChild("descriptionPanel")
  private descriptionPanel: ElementRef = undefined as unknown as ElementRef;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  toggleDescriptionAnimation() {
    // click goes after mouse enter
    // so, we need to check mouse enter was not triggered because the user clicked the element
    // otherwise, that (the mouseenter) would trigger the description to open, and this will close it (wrong behaviour)
    // We prevent that by ignoring changes that occur in less than 500 ms
    if (new Date().getTime() - this.animationChangedAt.getTime() < 500)
      return;

    if (this.descriptionAnimationState === 'open')
      this.descriptionAnimationState = 'closed';
    else
      this.descriptionAnimationState = 'open';
  }

  setDescriptionAnimationState(state: 'open' | 'closed') {
    this.descriptionAnimationState = state;
    this.animationChangedAt = new Date();
  }

  descriptionAnimationDone(evt: AnimationEvent) {
    if (evt.toState === 'open')
      this.descriptionPanel.nativeElement.style = "opacity: 1";
  }
}
