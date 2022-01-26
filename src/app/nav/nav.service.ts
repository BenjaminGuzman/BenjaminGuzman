import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public fragmentChange: EventEmitter<FragmentId> = new EventEmitter<FragmentId>();
  private _activeFragment: FragmentId | null = null;

  constructor() { }

  public setActiveFragment(f: FragmentId) {
    if (this._activeFragment === f)
      return;

    this._activeFragment = f;
    this.fragmentChange.emit(f);
  }

  get activeFragment(): FragmentId | null {
    return this._activeFragment;
  }
}

export enum FragmentId {
  about = "about",
  portfolio = "portfolio",
  skills = "skills",
  footer = "footer"
}

export type FragmentIdT = "about" | "portfolio" | "skills" | "footer"
