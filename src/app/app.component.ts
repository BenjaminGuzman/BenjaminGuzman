import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {PostgrestError} from "@supabase/supabase-js";
import {FragmentId, NavService} from "./nav/nav.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('about')
  public aboutEl: ElementRef = null as unknown as ElementRef;

  @ViewChild('portfolio', {read: ElementRef})
  public portfolioEl: ElementRef = null as unknown as ElementRef;

  @ViewChild('skills', {read: ElementRef})
  public skillsEl: ElementRef = null as unknown as ElementRef;

  @ViewChild('footer', {read: ElementRef})
  public footerEl: ElementRef = null as unknown as ElementRef;

  private sections: {elem: ElementRef, fragment: FragmentId}[] = [];

  private lastActiveTop: number = 0;

  /**
   * Scroll changes less than this value will be ignored
   */
  private ignoreScrollThresh: number = 0;

  constructor(private navService: NavService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    // it is important that sections are placed in order. Check implementation of detectActiveFragment for details
    this.sections = [
      {elem: this.aboutEl, fragment: FragmentId.about},
      {elem: this.portfolioEl, fragment: FragmentId.portfolio},
      {elem: this.skillsEl, fragment: FragmentId.skills},
      {elem: this.footerEl, fragment: FragmentId.footer},
    ].reverse(); // this way we check the last element in the page first

    this.ignoreScrollThresh = 50//document.documentElement.clientHeight / 2;

    if (isPlatformBrowser(this.platformId) && !window.matchMedia("only screen and (max-width: 760px)").matches) {
      // on small devices don't add scroll listener to improve performance
      window.addEventListener("scroll", () => this.detectActiveFragment());
    }
  }

  public detectActiveFragment() {
    const top = window.scrollY;

    if (Math.abs(this.lastActiveTop - top) < this.ignoreScrollThresh) // ignore small changes in scroll position
      return;

    this.lastActiveTop = top;

    for (const section of this.sections) {
      const sectionRect: DOMRect = section.elem.nativeElement.getBoundingClientRect();
      if (sectionRect.y < 120) {
        // when y == 0 it means the element is exactly at the very top of the viewport
        // when y == 120 it means the element is 20 px below the very top of the viewport
        this.navService.setActiveFragment(section.fragment);
        break;
      }
    }
  }

  public static handleNetworkError(
    e: Error | PostgrestError,
    title: string = "Error while fetching data",
    msg: string = "Check your network connection or allow fetching data from external sources"
  ) {
    alert(`${title}:${msg}`);
    console.error(e);
  }
}
