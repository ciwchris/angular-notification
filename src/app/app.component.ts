import { Component, OnDestroy } from '@angular/core';

import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    public units = [
        { value: 'sec', viewValue: 'Seconds' },
        { value: 'min', viewValue: 'Minutes' }
    ];
    public short;
    public long;
    public end;
    public isVibrationSupported;

    private alive: boolean;
    private shortTimer: Observable<number>;
    private longTimer: Observable<number>;
    private endTimer: Observable<number>;

    constructor() {
        this.short = { length: 1, unit: 'min' };
        this.long = { length: 5, unit: 'min' };
        this.end = { length: 10, unit: 'min' };

        this.alive = false;
        this.isVibrationSupported = 'vibrate' in navigator;
    }

    private createInterval(frequency) {
        return frequency.unit === 'sec'
            ? frequency.length * 1000
            : frequency.length * 1000 * 60;
    }

    private createTimer(frequency) {
        let multiplier = this.createInterval(frequency);
        return Observable.timer(multiplier, multiplier);
    }

    private registerShortTimer(shortInterval: number, longInterval: number) {
        let count: number = 1;
        this.shortTimer = this.createTimer(this.short);
        this.shortTimer
            .takeWhile(() => this.alive && count * shortInterval % longInterval !== 0)
            .subscribe(() => {
                console.log('short');
                navigator.vibrate([100]);
                count++;
            });
    }

    private registerLongTimer(shortInterval: number, longInterval: number) {
        let count: number = 1;
        let endInterval: number = this.createInterval(this.end);

        this.longTimer = this.createTimer(this.long);
        this.longTimer
            .takeWhile(() => this.alive && count * longInterval % endInterval !== 0)
            .subscribe(() => {
                console.log('long');
                navigator.vibrate([500]);
                count++;

                this.registerShortTimer(shortInterval, longInterval);
            });
    }

    begin() {
        let shortInterval: number = this.createInterval(this.short);
        let longInterval: number = this.createInterval(this.long);

        this.longTimer = this.createTimer(this.long);
        this.endTimer = this.createTimer(this.end);

        this.alive = true;

        this.registerShortTimer(shortInterval, longInterval);
        this.registerLongTimer(shortInterval, longInterval);
        this.endTimer
            .takeWhile(() => this.alive)
            .subscribe(() => {
                console.log('end');
                navigator.vibrate([100, 500, 100]);
                this.alive = false;
            });
    }

    ngOnDestroy() {
        this.alive = false; // switches your IntervalObservable off
    }
}
