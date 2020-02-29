import * as tslib_1 from "tslib";
var AgmKmlLayer_1;
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
let layerId = 0;
let AgmKmlLayer = AgmKmlLayer_1 = class AgmKmlLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new EventEmitter();
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    }
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    }
    _updatePolygonOptions(changes) {
        const options = Object.keys(changes)
            .filter(k => AgmKmlLayer_1._kmlLayerOptions.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _addEventListeners() {
        const listeners = [
            { name: 'click', handler: (ev) => this.layerClick.emit(ev) },
            { name: 'defaultviewport_changed', handler: () => this.defaultViewportChange.emit() },
            { name: 'status_changed', handler: () => this.statusChange.emit() },
        ];
        listeners.forEach((obj) => {
            const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmKmlLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(s => s.unsubscribe());
    }
};
AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
AgmKmlLayer.ctorParameters = () => [
    { type: KmlLayerManager }
];
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "clickable", void 0);
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "preserveViewport", void 0);
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "screenOverlays", void 0);
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "suppressInfoWindows", void 0);
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "url", void 0);
tslib_1.__decorate([
    Input()
], AgmKmlLayer.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Output()
], AgmKmlLayer.prototype, "layerClick", void 0);
tslib_1.__decorate([
    Output()
], AgmKmlLayer.prototype, "defaultViewportChange", void 0);
tslib_1.__decorate([
    Output()
], AgmKmlLayer.prototype, "statusChange", void 0);
AgmKmlLayer = AgmKmlLayer_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-kml-layer',
    })
], AgmKmlLayer);
export { AgmKmlLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21sLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9rbWwtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJcEgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTNFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUtoQixJQUFhLFdBQVcsbUJBQXhCLE1BQWEsV0FBVztJQXlEdEIsWUFBb0IsUUFBeUI7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUF4RHJDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFFBQUcsR0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBSTVDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7Ozs7V0FLRztRQUNNLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVsQzs7V0FFRztRQUNNLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRS9COztXQUVHO1FBQ00sd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRXJDOztXQUVHO1FBQ00sUUFBRyxHQUFXLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUNNLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRXRDOztXQUVHO1FBQ08sZUFBVSxHQUFnQyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUV0Rjs7V0FFRztRQUNPLDBCQUFxQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRS9FOzs7O1dBSUc7UUFDTyxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO0lBRXRCLENBQUM7SUFFakQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZ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L0NwQztJQUFSLEtBQUssRUFBRTs4Q0FBa0I7QUFRakI7SUFBUixLQUFLLEVBQUU7cURBQTBCO0FBS3pCO0lBQVIsS0FBSyxFQUFFO21EQUF1QjtBQUt0QjtJQUFSLEtBQUssRUFBRTt3REFBNkI7QUFLNUI7SUFBUixLQUFLLEVBQUU7d0NBQW9CO0FBS25CO0lBQVIsS0FBSyxFQUFFOzJDQUE4QjtBQUs1QjtJQUFULE1BQU0sRUFBRTsrQ0FBNkU7QUFLNUU7SUFBVCxNQUFNLEVBQUU7MERBQXNFO0FBT3JFO0lBQVQsTUFBTSxFQUFFO2lEQUE2RDtBQXZEM0QsV0FBVztJQUh2QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtLQUMxQixDQUFDO0dBQ1csV0FBVyxDQStHdkI7U0EvR1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgS21sTW91c2VFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG5cbmxldCBsYXllcklkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLWttbC1sYXllcicsXG59KVxuZXhwb3J0IGNsYXNzIEFnbUttbExheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIHN0YXRpYyBfa21sTGF5ZXJPcHRpb25zOiBzdHJpbmdbXSA9XG4gICAgICBbJ2NsaWNrYWJsZScsICdwcmVzZXJ2ZVZpZXdwb3J0JywgJ3NjcmVlbk92ZXJsYXlzJywgJ3N1cHByZXNzSW5mb1dpbmRvd3MnLCAndXJsJywgJ3pJbmRleCddO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbGF5ZXIgcmVjZWl2ZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXG4gICAqIGxheWVyLlxuICAgKiBJZiB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHZpZXdwb3J0IGlzIGxlZnQgdW5jaGFuZ2VkLCB1bmxlc3MgdGhlIG1hcCdzIGNlbnRlciBhbmQgem9vbVxuICAgKiB3ZXJlIG5ldmVyIHNldC5cbiAgICovXG4gIEBJbnB1dCgpIHByZXNlcnZlVmlld3BvcnQgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZW5kZXIgdGhlIHNjcmVlbiBvdmVybGF5cy4gRGVmYXVsdCB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgc2NyZWVuT3ZlcmxheXMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBTdXBwcmVzcyB0aGUgcmVuZGVyaW5nIG9mIGluZm8gd2luZG93cyB3aGVuIGxheWVyIGZlYXR1cmVzIGFyZSBjbGlja2VkLlxuICAgKi9cbiAgQElucHV0KCkgc3VwcHJlc3NJbmZvV2luZG93cyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cbiAgICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIHotaW5kZXggb2YgdGhlIGxheWVyLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgZmVhdHVyZSBpbiB0aGUgbGF5ZXIgaXMgY2xpY2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBsYXllckNsaWNrOiBFdmVudEVtaXR0ZXI8S21sTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEttbE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgS01MIGxheWVycyBkZWZhdWx0IHZpZXdwb3J0IGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGRlZmF1bHRWaWV3cG9ydENoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIEtNTCBsYXllciBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICogQXQgdGhpcyBwb2ludCBpdCBpcyBzYWZlIHRvIHJlYWQgdGhlIHN0YXR1cyBwcm9wZXJ0eSB0byBkZXRlcm1pbmUgaWYgdGhlIGxheWVyIGxvYWRlZFxuICAgKiBzdWNjZXNzZnVsbHkuXG4gICAqL1xuICBAT3V0cHV0KCkgc3RhdHVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogS21sTGF5ZXJNYW5hZ2VyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYW5hZ2VyLmFkZEttbExheWVyKHRoaXMpO1xuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlUG9seWdvbk9wdGlvbnMoY2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGsgPT4gQWdtS21sTGF5ZXIuX2ttbExheWVyT3B0aW9ucy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKG9iajogYW55LCBrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXG4gICAgICB7bmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBLbWxNb3VzZUV2ZW50KSA9PiB0aGlzLmxheWVyQ2xpY2suZW1pdChldil9LFxuICAgICAge25hbWU6ICdkZWZhdWx0dmlld3BvcnRfY2hhbmdlZCcsIGhhbmRsZXI6ICgpID0+IHRoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlLmVtaXQoKX0sXG4gICAgICB7bmFtZTogJ3N0YXR1c19jaGFuZ2VkJywgaGFuZGxlcjogKCkgPT4gdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpfSxcbiAgICBdO1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtS21sTGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlS21sTGF5ZXIodGhpcyk7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19