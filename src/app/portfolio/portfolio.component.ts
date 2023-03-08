import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Project} from "./project/Project";
import {SupabaseService} from "../supabase.service";
import {environment} from "../../environments/environment";
import {last, Subscription} from "rxjs";
import {ProjectComponent} from "./project/project.component";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren("projectComponent", {read: ElementRef})
  public projectComponents!: QueryList<ElementRef>;

  public shouldScrollToLastProject: boolean = false;
  public subscriptions: Subscription[] = [];
  public renderedProjects: Project[] = [];
  public projects: Project[] = [];
  public isLoading: boolean = true;

  private shouldShowProjects: boolean = false;

  constructor(private supabase: SupabaseService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    const s = this.projectComponents.changes.subscribe((updatedProjectComponents: QueryList<ElementRef>) => {
      if (this.shouldScrollToLastProject) {
        this.shouldScrollToLastProject = false;
        updatedProjectComponents.last.nativeElement.scrollIntoView({block: "center"});
      }
    });

    this.subscriptions.push(s);
  }

  async ngOnInit() {
    try {
      if (!environment.loadProjects)
        return;

      this.projects = await this.supabase.getProjects();
      this.projects = this.projects.reverse(); // reverse the array because pop operation is less expensive as compared
      // to slice operation (which moves the elements on each call) (see loadMore method)

      this.loadMore(false); // push the first 3 projects
    } catch (e) {
      // network error should be handled by getProjects()
    } finally {
      this.isLoading = false;

      // this is to prevent the UI from blocking because it is rendering the matrix animation and the project list
      if (this.shouldShowProjects)
        this.changeDetectorRef.markForCheck();
    }
  }

  showProjects() {
    this.shouldShowProjects = true;
    if (!this.isLoading) {
      // this.changeDetectorRef.detectChanges();
      this.changeDetectorRef.markForCheck();
    }
  }

  loadMore(scroll: boolean = true) {
    let p: Project | undefined;

    for (let i = 0; i < 3 && (p = this.projects.pop()) !== undefined; i++)
      this.renderedProjects.push(p);

    this.changeDetectorRef.markForCheck();

    if (scroll) {
      this.shouldScrollToLastProject = true;

      // old code (now scrollIntoView is used whenever the ViewChildren changes)
      // window.scrollTo(window.scrollX, window.scrollY + document.documentElement.clientHeight / 2); // scroll down half the viewport
    }

    // "show more" button will be automatically hidden when projects array is empty (see template)
  }
}
