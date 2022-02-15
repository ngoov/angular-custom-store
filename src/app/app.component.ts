import { Component, VERSION } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private sub$ = new BehaviorSubject([0]);
  public get data$(): Observable<number[]> {
    return this.sub$.asObservable();
  }
  public get snapshot(): number[] {
    return this.sub$.getValue();
  }
  public ngOnInit(): void {
    var obs = of([5, 6, 8, 9, 7, 10]); // external api result
    obs.pipe(tap((v) => this.patchState(v))).subscribe(); // subscribe to it one time if it is not autocompleted like a http call
    setTimeout(() => {
      this.patchState([10, 19, 1200]);
    }, 1500);
    this.patchState([2, 3]);
    this.updateState((state) => [...state.filter((x) => x !== 0)]);
  }

  public updateState(update: (state: number[]) => number[]): void {
    this.sub$.next(update(this.snapshot));
  }
  public patchState(patch: number[]): void {
    this.updateState((state) => [...state, ...patch]);
  }
}
