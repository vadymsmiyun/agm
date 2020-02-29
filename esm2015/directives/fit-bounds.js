import * as tslib_1 from "tslib";
import { Directive, Input, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FitBoundsAccessor, FitBoundsDetails, FitBoundsService } from '../services/fit-bounds';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
let AgmFitBounds = class AgmFitBounds {
    constructor(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    ngOnChanges() {
        this._updateBounds();
    }
    /**
     * @internal
     */
    ngOnInit() {
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged((x, y) => x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng), takeUntil(this._destroyed$))
            .subscribe(details => this._updateBounds(details));
    }
    /*
     Either the location changed, or visible status changed.
     Possible state changes are
     invisible -> visible
     visible -> invisible
     visible -> visible (new location)
    */
    _updateBounds(newFitBoundsDetails) {
        // either visibility will change, or location, so remove the old one anyway
        if (this._latestFitBoundsDetails) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
            // don't set latestFitBoundsDetails to null, because we can toggle visibility from
            // true -> false -> true, in which case we still need old value cached here
        }
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds === true) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    }
};
AgmFitBounds.ctorParameters = () => [
    { type: FitBoundsAccessor, decorators: [{ type: Self }] },
    { type: FitBoundsService }
];
tslib_1.__decorate([
    Input()
], AgmFitBounds.prototype, "agmFitBounds", void 0);
AgmFitBounds = tslib_1.__decorate([
    Directive({
        selector: '[agmFitBounds]',
    }),
    tslib_1.__param(0, Self())
], AgmFitBounds);
export { AgmFitBounds };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZml0LWJvdW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRjs7Ozs7R0FLRztBQUlILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFVdkIsWUFDMkIsa0JBQXFDLEVBQzdDLGlCQUFtQztRQUQzQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQzdDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFYdEQ7OztXQUdHO1FBQ00saUJBQVksR0FBRyxJQUFJLENBQUM7UUFFckIsZ0JBQVcsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNqRCw0QkFBdUIsR0FBNEIsSUFBSSxDQUFDO0lBSzdELENBQUM7SUFFSjs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsb0JBQW9CLEVBQUU7YUFDdEIsSUFBSSxDQUNILG9CQUFvQixDQUNsQixDQUFDLENBQW1CLEVBQUUsQ0FBbUIsRUFBRSxFQUFFLENBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNqRSxFQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzVCO2FBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDTSxhQUFhLENBQUMsbUJBQXNDO1FBQzFELDJFQUEyRTtRQUMzRSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdFLGtGQUFrRjtZQUNsRiwyRUFBMkU7U0FDNUU7UUFFRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxtQkFBbUIsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssSUFBSSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUEvRGdELGlCQUFpQix1QkFBN0QsSUFBSTtZQUMrQixnQkFBZ0I7O0FBUDdDO0lBQVIsS0FBSyxFQUFFO2tEQUFxQjtBQUxsQixZQUFZO0lBSHhCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztJQVlHLG1CQUFBLElBQUksRUFBRSxDQUFBO0dBWEUsWUFBWSxDQTBFeEI7U0ExRVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZpdEJvdW5kc0FjY2Vzc29yLCBGaXRCb3VuZHNEZXRhaWxzLCBGaXRCb3VuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZml0LWJvdW5kcyc7XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gZGlyZWN0aXZlIHRvIHRoZSBhdXRvIGZpdCBib3VuZHMgZmVhdHVyZSB3aGVuIHRoZSB2YWx1ZSBpcyB0cnVlLlxuICogVG8gbWFrZSBpdCB3b3JrIHdpdGggeW91IGN1c3RvbSBBR00gY29tcG9uZW50LCB5b3UgYWxzbyBoYXZlIHRvIGltcGxlbWVudCB0aGUge0BsaW5rIEZpdEJvdW5kc0FjY2Vzc29yfSBhYnN0cmFjdCBjbGFzcy5cbiAqIEBleGFtcGxlXG4gKiA8YWdtLW1hcmtlciBbYWdtRml0Qm91bmRzXT1cInRydWVcIj48L2FnbS1tYXJrZXI+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZ21GaXRCb3VuZHNdJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtRml0Qm91bmRzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJZiB0aGUgdmFsdWUgaXMgdHJ1ZSwgdGhlIGVsZW1lbnQgZ2V0cyBhZGRlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXAuXG4gICAqIERlZmF1bHQ6IHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBhZ21GaXRCb3VuZHMgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzOiBGaXRCb3VuZHNEZXRhaWxzIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQFNlbGYoKSBwcml2YXRlIHJlYWRvbmx5IF9maXRCb3VuZHNBY2Nlc3NvcjogRml0Qm91bmRzQWNjZXNzb3IsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZml0Qm91bmRzU2VydmljZTogRml0Qm91bmRzU2VydmljZSxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZml0Qm91bmRzQWNjZXNzb3JcbiAgICAgIC5nZXRGaXRCb3VuZHNEZXRhaWxzJCgpXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgKHg6IEZpdEJvdW5kc0RldGFpbHMsIHk6IEZpdEJvdW5kc0RldGFpbHMpID0+XG4gICAgICAgICAgICB4LmxhdExuZy5sYXQgPT09IHkubGF0TG5nLmxhdCAmJiB4LmxhdExuZy5sbmcgPT09IHkubGF0TG5nLmxuZyxcbiAgICAgICAgKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkZXRhaWxzID0+IHRoaXMuX3VwZGF0ZUJvdW5kcyhkZXRhaWxzKSk7XG4gIH1cblxuICAvKlxuICAgRWl0aGVyIHRoZSBsb2NhdGlvbiBjaGFuZ2VkLCBvciB2aXNpYmxlIHN0YXR1cyBjaGFuZ2VkLlxuICAgUG9zc2libGUgc3RhdGUgY2hhbmdlcyBhcmVcbiAgIGludmlzaWJsZSAtPiB2aXNpYmxlXG4gICB2aXNpYmxlIC0+IGludmlzaWJsZVxuICAgdmlzaWJsZSAtPiB2aXNpYmxlIChuZXcgbG9jYXRpb24pXG4gICovXG4gIHByaXZhdGUgX3VwZGF0ZUJvdW5kcyhuZXdGaXRCb3VuZHNEZXRhaWxzPzogRml0Qm91bmRzRGV0YWlscykge1xuICAgIC8vIGVpdGhlciB2aXNpYmlsaXR5IHdpbGwgY2hhbmdlLCBvciBsb2NhdGlvbiwgc28gcmVtb3ZlIHRoZSBvbGQgb25lIGFueXdheVxuICAgIGlmICh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzKSB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLnJlbW92ZUZyb21Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xuICAgICAgLy8gZG9uJ3Qgc2V0IGxhdGVzdEZpdEJvdW5kc0RldGFpbHMgdG8gbnVsbCwgYmVjYXVzZSB3ZSBjYW4gdG9nZ2xlIHZpc2liaWxpdHkgZnJvbVxuICAgICAgLy8gdHJ1ZSAtPiBmYWxzZSAtPiB0cnVlLCBpbiB3aGljaCBjYXNlIHdlIHN0aWxsIG5lZWQgb2xkIHZhbHVlIGNhY2hlZCBoZXJlXG4gICAgfVxuXG4gICAgaWYgKG5ld0ZpdEJvdW5kc0RldGFpbHMpIHtcbiAgICAgIHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMgPSBuZXdGaXRCb3VuZHNEZXRhaWxzO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWdtRml0Qm91bmRzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLmFkZFRvQm91bmRzKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMubGF0TG5nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gICAgaWYgKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UucmVtb3ZlRnJvbUJvdW5kcyh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzLmxhdExuZyk7XG4gICAgfVxuICB9XG59XG4iXX0=