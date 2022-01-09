import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PostgrestError} from "@supabase/supabase-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor() {
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
