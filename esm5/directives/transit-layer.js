import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
var layerId = 0;
/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
var AgmTransitLayer = /** @class */ (function () {
    function AgmTransitLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show transit layer
         */
        this.visible = true;
    }
    AgmTransitLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this, { visible: this.visible });
        this._addedToManager = true;
    };
    AgmTransitLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    };
    /** @internal */
    AgmTransitLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmTransitLayer.prototype.toString = function () { return "AgmTransitLayer-" + this._id.toString(); };
    /** @internal */
    AgmTransitLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteLayer(this);
    };
    AgmTransitLayer.ctorParameters = function () { return [
        { type: LayerManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmTransitLayer.prototype, "visible", void 0);
    AgmTransitLayer = tslib_1.__decorate([
        Directive({
            selector: 'agm-transit-layer',
        })
    ], AgmTransitLayer);
    return AgmTransitLayer;
}());
export { AgmTransitLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdHJhbnNpdC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7OztLQUdLO0FBS0w7SUFTSSx5QkFBcUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJuQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTdDOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztJQUV1QixDQUFDO0lBRWhELGtDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiw0QkFBRSxHQUFGLGNBQWUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsa0NBQVEsR0FBUixjQUFxQixPQUFPLHFCQUFtQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUV2RSxnQkFBZ0I7SUFDaEIscUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTVCOEIsWUFBWTs7SUFGbEM7UUFBUixLQUFLLEVBQUU7b0RBQWdCO0lBUGYsZUFBZTtRQUozQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1NBQ2hDLENBQUM7T0FFVyxlQUFlLENBdUMzQjtJQUFELHNCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXInO1xuXG5sZXQgbGF5ZXJJZCA9IDA7XG5cbi8qXG4gKiBUaGlzIGRpcmVjdGl2ZSBhZGRzIGEgdHJhbnNpdCBsYXllciB0byBhIGdvb2dsZSBtYXAgaW5zdGFuY2VcbiAqIDxhZ20tdHJhbnNpdC1sYXllciBbdmlzaWJsZV09XCJ0cnVlfGZhbHNlXCI+IDxhZ20tdHJhbnNpdC1sYXllcj5cbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2FnbS10cmFuc2l0LWxheWVyJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBBZ21UcmFuc2l0TGF5ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95e1xuICAgIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlL3Nob3cgdHJhbnNpdCBsYXllclxuICAgICAqL1xuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX21hbmFnZXI6IExheWVyTWFuYWdlciApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRUcmFuc2l0TGF5ZXIodGhpcywge3Zpc2libGU6IHRoaXMudmlzaWJsZX0pO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnRvZ2dsZUxheWVyVmlzaWJpbGl0eSh0aGlzLCB7dmlzaWJsZTogY2hhbmdlc1sndmlzaWJsZSddLmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtVHJhbnNpdExheWVyLSR7dGhpcy5faWQudG9TdHJpbmcoKX1gOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlTGF5ZXIodGhpcyk7XG4gICAgfVxuXG59XG4iXX0=