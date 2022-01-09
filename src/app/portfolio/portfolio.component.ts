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

  ngOnInit(): void {
    this.supabase.getProjects().then(p => {
      this.projects = p;
      this.loading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

}
