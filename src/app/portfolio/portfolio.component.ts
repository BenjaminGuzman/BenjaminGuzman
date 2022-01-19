import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Project} from "./project/Project";
import {SupabaseService} from "../supabase.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  public projects: Project[] = [];
  public loading: boolean = true;

  constructor(private supabase: SupabaseService, private changeDetectorRef: ChangeDetectorRef) {
  }

  async ngOnInit() {
    try {
      this.projects = await this.supabase.getProjects();
    } catch (e) {
      // network error should be handled by getProjects()
      console.error(e);
      alert("😟 Some really weird error happened. Sorry 😵");
    } finally {
      this.loading = false;
      this.changeDetectorRef.markForCheck();
    }
  }

}
