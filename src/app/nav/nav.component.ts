import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export enum AnimationState {
  TRANSPARENT = "transparent",
  BLACK = "black"
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("navAnimation", [
      state(AnimationState.TRANSPARENT, style({
        backgroundColor: "transparent"
      })),
      state(AnimationState.BLACK, style({
        backgroundColor: "black",
        // FIXME
        // opacity: "0.7",
        // "backdrop-filter": "blur(10px)"
      })),
      transition(`${AnimationState.TRANSPARENT} => ${AnimationState.BLACK}`, [
        animate("200ms ease-in", keyframes([90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5].map(n => style({
            backgroundColor: "transparent",
            backgroundImage: `linear-gradient(0deg, transparent ${n}%, black)`,
          })
        )))
      ]),
      transition(`${AnimationState.BLACK} => ${AnimationState.TRANSPARENT}`, [
        animate("200ms ease-out", keyframes([90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5].map(n => style({
            backgroundColor: "transparent",
            backgroundImage: `linear-gradient(180deg, black ${n}%, transparent)`,
          }))
        ))
      ])
    ]),
    trigger("menuAnimation", [
      state("open", style({
        height: "100%",
        display: "block"
      })),
      state("closed", style({
        height: "0",
        display: "none"
      })),
      transition("open => closed", [
        animate("300ms ease-in")
      ]),
      transition("closed => open", [
        style({display: "block"}),
        animate("300ms ease-out")
      ])
    ])
  ]
})
export class NavComponent implements OnInit, AfterViewInit {
  /**
   * Indicates light or dark mode
   * It is a class for the icon shown in the nav
   */
  public nextMode: mode = 'dark_mode';

  /**
   * Holds the name of the current state of the nav animation
   */
  public navAnimationState: AnimationState = AnimationState.TRANSPARENT;

  /**
   * Holds the name of the current state of the nav menu animation
   */
  public menuAnimationState: 'open' | 'closed' = 'closed';

  /**
   * Tells whether the nav for small screens is shown
   */
  public isNavShown: boolean = false;

  private readonly navHeight: number = 56;
  private top2DownThresh: number = 0;
  private down2TopThresh: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.toggleDarkMode();
  }

  ngAfterViewInit(): void {
    // the thresh for changing from one state to another is preferred not to be the same
    // as it can produce buggy behaviour (specially if the user scrolls up and down repeatedly)
    this.top2DownThresh = this.navHeight + Math.round(this.navHeight / 2);
    this.down2TopThresh = this.navHeight;

    window.onscroll = () => this.checkScrollAnimation();

    // if this is not added and the state changes, angular will complain
    setInterval(() => this.checkScrollAnimation(), 100);
  }

  /**
   * Triggers the nav animation if needed
   * The animation state will depend on the scrolled amount and the page
   */
  private checkScrollAnimation(): void {
    const top = document.documentElement.scrollTop || document.body.scrollTop;

    if (this.navAnimationState !== AnimationState.BLACK && top > this.top2DownThresh) {
      this.navAnimationState = AnimationState.BLACK;
      // this.showGo2Top = true;
      this.changeDetectorRef.markForCheck();
    } else if (this.navAnimationState !== AnimationState.TRANSPARENT && top < this.down2TopThresh) {
      this.navAnimationState = AnimationState.TRANSPARENT;
      // this.showGo2Top = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  public toggleDarkMode(): void {
    if (this.nextMode === 'dark_mode') {
      localStorage.theme = 'dark';
      this.nextMode = 'light_mode';
    } else {
      localStorage.theme = 'light';
      this.nextMode = 'dark_mode';
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.remove('dark');
  }

  public toggleNav() {
    this.isNavShown = !this.isNavShown;
    this.menuAnimationState = this.menuAnimationState === 'closed' ? 'open' : 'closed';
    this.changeDetectorRef.markForCheck();
  }
}

type mode = 'light_mode' | 'dark_mode';
