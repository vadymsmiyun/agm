import * as tslib_1 from "tslib";
var AgmPolyline_1;
import { ContentChildren, Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolylineManager } from '../services/managers/polyline-manager';
import { AgmPolylineIcon } from './polyline-icon';
import { AgmPolylinePoint } from './polyline-point';
let polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
let AgmPolyline = AgmPolyline_1 = class AgmPolyline {
    constructor(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new EventEmitter();
        /**
         * This event is fired after Polyline's path changes.
         */
        this.polyPathChange = new EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    ngAfterContentInit() {
        if (this.points.length) {
            this.points.forEach((point) => {
                const s = point.positionChanged.subscribe(() => { this._polylineManager.updatePolylinePoints(this); });
                this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        const pointSub = this.points.changes.subscribe(() => this._polylineManager.updatePolylinePoints(this));
        this._subscriptions.push(pointSub);
        this._polylineManager.updatePolylinePoints(this);
        const iconSub = this.iconSequences.changes.subscribe(() => this._polylineManager.updateIconSequences(this));
        this._subscriptions.push(iconSub);
    }
    ngOnChanges(changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        let options = {};
        const optionKeys = Object.keys(changes).filter(k => AgmPolyline_1._polylineOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach(k => options[k] = changes[k].currentValue);
        this._polylineManager.setPolylineOptions(this, options);
    }
    getPath() {
        return this._polylineManager.getPath(this);
    }
    _init() {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.lineClick.emit(ev) },
            { name: 'dblclick', handler: (ev) => this.lineDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.lineDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.lineDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.lineDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.lineMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.lineMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.lineMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.lineMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.lineMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.lineRightClick.emit(ev) },
        ];
        handlers.forEach((obj) => {
            const os = this._polylineManager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
        this._polylineManager.createPathEventObservable(this).then((ob$) => {
            const os = ob$.subscribe(pathEvent => this.polyPathChange.emit(pathEvent));
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    _getPoints() {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    }
    _getIcons() {
        if (this.iconSequences) {
            return this.iconSequences.toArray();
        }
        return [];
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
};
AgmPolyline._polylineOptionsAttributes = [
    'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
    'zIndex',
];
AgmPolyline.ctorParameters = () => [
    { type: PolylineManager }
];
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "clickable", void 0);
tslib_1.__decorate([
    Input('polylineDraggable')
], AgmPolyline.prototype, "draggable", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "editable", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "geodesic", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "strokeColor", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "strokeOpacity", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "strokeWeight", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], AgmPolyline.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineClick", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineDblClick", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineDrag", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineDragEnd", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineDragStart", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineMouseDown", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineMouseMove", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineMouseOut", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineMouseOver", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineMouseUp", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "lineRightClick", void 0);
tslib_1.__decorate([
    Output()
], AgmPolyline.prototype, "polyPathChange", void 0);
tslib_1.__decorate([
    ContentChildren(AgmPolylinePoint)
], AgmPolyline.prototype, "points", void 0);
tslib_1.__decorate([
    ContentChildren(AgmPolylineIcon)
], AgmPolyline.prototype, "iconSequences", void 0);
AgmPolyline = AgmPolyline_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-polyline',
    })
], AgmPolyline);
export { AgmPolyline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFJMUosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBSUgsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVc7SUFnSXRCLFlBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBL0hyRDs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7OztXQUdHO1FBQ0gsMkNBQTJDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUU5Qzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOzs7OztXQUtHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQWlCMUI7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hCOztXQUVHO1FBQ08sY0FBUyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUV2Rjs7V0FFRztRQUNPLGlCQUFZLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRTFGOztXQUVHO1FBQ08sYUFBUSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTlFOztXQUVHO1FBQ08sZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVqRjs7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QztJQUFSLEtBQUssRUFBRTs4Q0FBa0I7QUFPRTtJQUEzQixLQUFLLENBQUMsbUJBQW1CLENBQUM7OENBQW1CO0FBTXJDO0lBQVIsS0FBSyxFQUFFOzZDQUFrQjtBQVFqQjtJQUFSLEtBQUssRUFBRTs2Q0FBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7Z0RBQXFCO0FBS3BCO0lBQVIsS0FBSyxFQUFFO2tEQUF1QjtBQUt0QjtJQUFSLEtBQUssRUFBRTtpREFBc0I7QUFLckI7SUFBUixLQUFLLEVBQUU7NENBQWdCO0FBS2Y7SUFBUixLQUFLLEVBQUU7MkNBQWdCO0FBS2Q7SUFBVCxNQUFNLEVBQUU7OENBQThFO0FBSzdFO0lBQVQsTUFBTSxFQUFFO2lEQUFpRjtBQUtoRjtJQUFULE1BQU0sRUFBRTs2Q0FBcUU7QUFLcEU7SUFBVCxNQUFNLEVBQUU7Z0RBQXdFO0FBS3ZFO0lBQVQsTUFBTSxFQUFFO2tEQUEwRTtBQUt6RTtJQUFULE1BQU0sRUFBRTtrREFBa0Y7QUFLakY7SUFBVCxNQUFNLEVBQUU7a0RBQWtGO0FBS2pGO0lBQVQsTUFBTSxFQUFFO2lEQUFpRjtBQUtoRjtJQUFULE1BQU0sRUFBRTtrREFBa0Y7QUFLakY7SUFBVCxNQUFNLEVBQUU7Z0RBQWdGO0FBSy9FO0lBQVQsTUFBTSxFQUFFO21EQUFtRjtBQUtsRjtJQUFULE1BQU0sRUFBRTttREFBZ0Q7QUFLdEI7SUFBbEMsZUFBZSxDQUFDLGdCQUFnQixDQUFDOzJDQUFxQztBQUVyQztJQUFqQyxlQUFlLENBQUMsZUFBZSxDQUFDO2tEQUEyQztBQXJIakUsV0FBVztJQUh2QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztLQUN6QixDQUFDO0dBQ1csV0FBVyxDQThOdkI7U0E5TlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBMYXRMbmcsIFBvbHlNb3VzZUV2ZW50IH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZUljb24gfSBmcm9tICcuL3BvbHlsaW5lLWljb24nO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vcG9seWxpbmUtcG9pbnQnO1xuXG5sZXQgcG9seWxpbmVJZCA9IDA7XG4vKipcbiAqIEFnbVBvbHlsaW5lIHJlbmRlcnMgYSBwb2x5bGluZSBvbiBhIHtAbGluayBBZ21NYXB9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tcG9seWxpbmU+XG4gKiAgICAgICAgICA8YWdtLXBvbHlsaW5lLXBvaW50IFtsYXRpdHVkZV09XCJsYXRBXCIgW2xvbmdpdHVkZV09XCJsbmdBXCI+XG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEJcIiBbbG9uZ2l0dWRlXT1cImxuZ0JcIj5cbiAqICAgICAgICAgIDwvYWdtLXBvbHlsaW5lLXBvaW50PlxuICogICAgICA8L2FnbS1wb2x5bGluZT5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZScsXG59KVxuZXhwb3J0IGNsYXNzIEFnbVBvbHlsaW5lIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBQb2x5bGluZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljIHByb3BlcnR5IGRlZmluZXMgdGhlXG4gICAqIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3BvbHlsaW5lRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdCB0aGVcbiAgICogdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbCBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZlxuICAgKiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuXG4gICAqIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYSBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcbiAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIGdlb2Rlc2ljID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VPcGFjaXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugd2lkdGggaW4gcGl4ZWxzLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBwb2x5bGluZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cbiAgICovXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZUNsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxuICAgKi9cbiAgQE91dHB1dCgpIGxpbmVEYmxDbGljazogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZURyYWc6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lRHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZU1vdXNlRG93bjogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZU1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWxpbmUgbW91c2VvdXQuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZU1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZU1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmVcbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VVcDogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgUG9seWxpbmUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgYWZ0ZXIgUG9seWxpbmUncyBwYXRoIGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seVBhdGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBhdGhFdmVudD4oKTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKEFnbVBvbHlsaW5lUG9pbnQpIHBvaW50czogUXVlcnlMaXN0PEFnbVBvbHlsaW5lUG9pbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWdtUG9seWxpbmVJY29uKSBpY29uU2VxdWVuY2VzOiBRdWVyeUxpc3Q8QWdtUG9seWxpbmVJY29uPjtcblxuICBwcml2YXRlIHN0YXRpYyBfcG9seWxpbmVPcHRpb25zQXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAnZHJhZ2dhYmxlJywgJ2VkaXRhYmxlJywgJ3Zpc2libGUnLCAnZ2VvZGVzaWMnLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VXZWlnaHQnLFxuICAgICd6SW5kZXgnLFxuICBdO1xuXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5bGluZU1hbmFnZXI6IFBvbHlsaW5lTWFuYWdlcikgeyB0aGlzLl9pZCA9IChwb2x5bGluZUlkKyspLnRvU3RyaW5nKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5wb2ludHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludDogQWdtUG9seWxpbmVQb2ludCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gcG9pbnQucG9zaXRpb25DaGFuZ2VkLnN1YnNjcmliZShcbiAgICAgICAgICAgICgpID0+IHsgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKHRoaXMpOyB9KTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBjb25zdCBwb2ludFN1YiA9IHRoaXMucG9pbnRzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHBvaW50U3ViKTtcbiAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHModGhpcyk7XG5cbiAgICBjb25zdCBpY29uU3ViID0gdGhpcy5pY29uU2VxdWVuY2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVJY29uU2VxdWVuY2VzKHRoaXMpKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goaWNvblN1Yik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICBpZiAoIXRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGNvbnN0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXG4gICAgICAgIGsgPT4gQWdtUG9seWxpbmUuX3BvbHlsaW5lT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaChrID0+IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZSk7XG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnNldFBvbHlsaW5lT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldFBhdGgoKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5nZXRQYXRoKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuYWRkUG9seWxpbmUodGhpcyk7XG4gICAgdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gW1xuICAgICAge25hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZUNsaWNrLmVtaXQoZXYpfSxcbiAgICAgIHtuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEYmxDbGljay5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMubGluZURyYWcuZW1pdChldil9LFxuICAgICAge25hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEcmFnRW5kLmVtaXQoZXYpfSxcbiAgICAgIHtuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEcmFnU3RhcnQuZW1pdChldil9LFxuICAgICAge25hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZURvd24uZW1pdChldil9LFxuICAgICAge25hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZU1vdmUuZW1pdChldil9LFxuICAgICAge25hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlT3V0LmVtaXQoZXYpfSxcbiAgICAgIHtuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VPdmVyLmVtaXQoZXYpfSxcbiAgICAgIHtuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlVXAuZW1pdChldil9LFxuICAgICAge25hbWU6ICdyaWdodGNsaWNrJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lUmlnaHRDbGljay5lbWl0KGV2KX0sXG4gICAgXTtcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuY3JlYXRlUGF0aEV2ZW50T2JzZXJ2YWJsZSh0aGlzKS50aGVuKChvYiQpID0+IHtcbiAgICAgIGNvbnN0IG9zID0gb2IkLnN1YnNjcmliZShwYXRoRXZlbnQgPT4gdGhpcy5wb2x5UGF0aENoYW5nZS5lbWl0KHBhdGhFdmVudCkpO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFBvaW50cygpOiBBcnJheTxBZ21Qb2x5bGluZVBvaW50PiB7XG4gICAgaWYgKHRoaXMucG9pbnRzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb2ludHMudG9BcnJheSgpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBfZ2V0SWNvbnMoKTogQXJyYXk8QWdtUG9seWxpbmVJY29uPiB7XG4gICAgaWYgKHRoaXMuaWNvblNlcXVlbmNlcykge1xuICAgICAgcmV0dXJuIHRoaXMuaWNvblNlcXVlbmNlcy50b0FycmF5KCk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuZGVsZXRlUG9seWxpbmUodGhpcyk7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aEV2ZW50IHtcbiAgbmV3QXJyOiBMYXRMbmdbXTtcbiAgZXZOYW1lOiAnaW5zZXJ0X2F0JyB8ICdyZW1vdmVfYXQnIHwgJ3NldF9hdCc7XG4gIGluZGV4OiBudW1iZXI7XG4gIHByZXZpb3VzPzogTGF0TG5nO1xufVxuIl19