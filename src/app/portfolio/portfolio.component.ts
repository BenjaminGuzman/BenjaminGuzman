import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Project} from "./project/Project";
import {SupabaseService} from "../supabase.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  public projects: Project[] = [];
  public isLoading: boolean = true;

  private shouldShowProjects: boolean = false;

  constructor(private supabase: SupabaseService, private changeDetectorRef: ChangeDetectorRef) {
  }

  async ngOnInit() {
    try {
      if (!environment.loadProjects)
        return;

      this.projects = await this.supabase.getProjects();
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
    if (!this.isLoading)
      this.changeDetectorRef.markForCheck();
  }
}
