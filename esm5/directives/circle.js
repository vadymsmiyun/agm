import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { CircleManager } from '../services/managers/circle-manager';
var AgmCircle = /** @class */ (function () {
    function AgmCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    AgmCircle_1 = AgmCircle;
    /** @internal */
    AgmCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    AgmCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle_1._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragstart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    AgmCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    AgmCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    AgmCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    var AgmCircle_1;
    AgmCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex', 'clickable',
    ];
    AgmCircle.ctorParameters = function () { return [
        { type: CircleManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('circleDraggable')
    ], AgmCircle.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "radius", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "strokePosition", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmCircle.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "centerChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "circleClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "circleDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "mouseDown", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "mouseMove", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "mouseUp", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "radiusChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmCircle.prototype, "rightClick", void 0);
    AgmCircle = AgmCircle_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-circle',
        })
    ], AgmCircle);
    return AgmCircle;
}());
export { AgmCircle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUtuSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFLcEU7SUFvSkUsbUJBQW9CLFFBQXVCO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQWU7UUF6STNDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7V0FFRztRQUNILDJDQUEyQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTVDOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFZMUI7O1dBRUc7UUFDTSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBWXBCOzs7V0FHRztRQUNNLG1CQUFjLEdBQW9DLFFBQVEsQ0FBQztRQUVwRTs7V0FFRztRQUNNLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztRQU94Qjs7V0FFRztRQUNPLGlCQUFZLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBRXhGOztXQUVHO1FBQ08sZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVqRjs7V0FFRztRQUNPLG1CQUFjLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFcEY7O1dBRUc7UUFDTyxTQUFJLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUU7O1dBRUc7UUFDTyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFDTyxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFL0U7O1dBRUc7UUFDTyxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFj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QXFFO0lBS3BFO1FBQVQsTUFBTSxFQUFFO2dEQUFzRTtJQUtyRTtRQUFULE1BQU0sRUFBRTs4Q0FBb0U7SUFLbkU7UUFBVCxNQUFNLEVBQUU7bURBQWlFO0lBS2hFO1FBQVQsTUFBTSxFQUFFO2lEQUF1RTtJQXpJckUsU0FBUztRQUhyQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtTQUN2QixDQUFDO09BQ1csU0FBUyxDQStPckI7SUFBRCxnQkFBQztDQUFBLEFBL09ELElBK09DO1NBL09ZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL21hcC10eXBlcyc7XG5pbXBvcnQgeyBMYXRMbmcsIExhdExuZ0JvdW5kcywgTGF0TG5nTGl0ZXJhbCwgTW91c2VFdmVudCBhcyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLWNpcmNsZScsXG59KVxuZXhwb3J0IGNsYXNzIEFnbUNpcmNsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgKHJlcXVpcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpIGxhdGl0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBjbGlja2FibGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgbG9uZ2l0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgQ2lyY2xlIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgY2lyY2xlIG92ZXIgdGhlIG1hcC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnY2lyY2xlRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIGNpcmNsZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbCBwb2ludHMgc2hvd24gYXRcbiAgICogdGhlIGNlbnRlciBhbmQgYXJvdW5kIHRoZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBjaXJjbGUuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxuICAgKi9cbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cbiAgICovXG4gIEBJbnB1dCgpIGZpbGxPcGFjaXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSByYWRpdXMgaW4gbWV0ZXJzIG9uIHRoZSBFYXJ0aCdzIHN1cmZhY2UuXG4gICAqL1xuICBASW5wdXQoKSByYWRpdXMgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VPcGFjaXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgcG9zaXRpb24uIERlZmF1bHRzIHRvIENFTlRFUi5cbiAgICogVGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIDggYW5kIGVhcmxpZXIuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VQb3NpdGlvbjogJ0NFTlRFUicgfCAnSU5TSURFJyB8ICdPVVRTSURFJyA9ICdDRU5URVInO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZVdlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBjaXJjbGUgaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXG4gICAqL1xuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBjaXJjbGUncyBjZW50ZXIgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBjZW50ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGNpcmNsZUNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBjaXJjbGVEYmxDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZURvd246IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gY2lyY2xlIG1vdXNlb3V0LlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gY2lyY2xlIG1vdXNlb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlVXA6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBjaXJjbGUncyByYWRpdXMgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSByYWRpdXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX21hcE9wdGlvbnM6IHN0cmluZ1tdID0gW1xuICAgICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VQb3NpdGlvbicsICdzdHJva2VXZWlnaHQnLFxuICAgICd2aXNpYmxlJywgJ3pJbmRleCcsICdjbGlja2FibGUnLFxuICBdO1xuXG4gIHByaXZhdGUgX2V2ZW50U3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYW5hZ2VyOiBDaXJjbGVNYW5hZ2VyKSB7fVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fbWFuYWdlci5hZGRDaXJjbGUodGhpcyk7XG4gICAgdGhpcy5fY2lyY2xlQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBpZiAoIXRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldENlbnRlcih0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2VkaXRhYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RWRpdGFibGUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3JhZGl1cyddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldFJhZGl1cyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaXJjbGVPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgbGV0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBsZXQgb3B0aW9uS2V5cyA9XG4gICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihrID0+IEFnbUNpcmNsZS5fbWFwT3B0aW9ucy5pbmRleE9mKGspICE9PSAtMSk7XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChrKSA9PiB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgaWYgKG9wdGlvbktleXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IGV2ZW50czogTWFwPHN0cmluZywgRXZlbnRFbWl0dGVyPGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50RW1pdHRlcjxhbnk+PigpO1xuICAgIGV2ZW50cy5zZXQoJ2NlbnRlcl9jaGFuZ2VkJywgdGhpcy5jZW50ZXJDaGFuZ2UpO1xuICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5jaXJjbGVDbGljayk7XG4gICAgZXZlbnRzLnNldCgnZGJsY2xpY2snLCB0aGlzLmNpcmNsZURibENsaWNrKTtcbiAgICBldmVudHMuc2V0KCdkcmFnJywgdGhpcy5kcmFnKTtcbiAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcbiAgICBldmVudHMuc2V0KCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydCk7XG4gICAgZXZlbnRzLnNldCgnbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcbiAgICBldmVudHMuc2V0KCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3ZlcicsIHRoaXMubW91c2VPdmVyKTtcbiAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICBldmVudHMuc2V0KCdyYWRpdXNfY2hhbmdlZCcsIHRoaXMucmFkaXVzQ2hhbmdlKTtcbiAgICBldmVudHMuc2V0KCdyaWdodGNsaWNrJywgdGhpcy5yaWdodENsaWNrKTtcblxuICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkgPT4ge1xuICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8TWFwTW91c2VFdmVudD4oZXZlbnROYW1lLCB0aGlzKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICBjYXNlICdyYWRpdXNfY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5nZXRSYWRpdXModGhpcykudGhlbigocmFkaXVzKSA9PiBldmVudEVtaXR0ZXIuZW1pdChyYWRpdXMpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY2VudGVyX2NoYW5nZWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0Q2VudGVyKHRoaXMpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIChjZW50ZXIpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdCh7bGF0OiBjZW50ZXIubGF0KCksIGxuZzogY2VudGVyLmxuZygpfSBhcyBMYXRMbmdMaXRlcmFsKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoXG4gICAgICAgICAgICAgICAgICAgIHtjb29yZHM6IHtsYXQ6IHZhbHVlLmxhdExuZy5sYXQoKSwgbG5nOiB2YWx1ZS5sYXRMbmcubG5nKCl9fSBhcyBNb3VzZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHM6IFN1YnNjcmlwdGlvbikgeyBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgdGhpcy5fbWFuYWdlci5yZW1vdmVDaXJjbGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgTGF0TG5nQm91bmRzIG9mIHRoaXMgQ2lyY2xlLlxuICAgKi9cbiAgZ2V0Qm91bmRzKCk6IFByb21pc2U8TGF0TG5nQm91bmRzPiB7IHJldHVybiB0aGlzLl9tYW5hZ2VyLmdldEJvdW5kcyh0aGlzKTsgfVxuXG4gIGdldENlbnRlcigpOiBQcm9taXNlPExhdExuZz4geyByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRDZW50ZXIodGhpcyk7IH1cbn1cbiJdfQ==