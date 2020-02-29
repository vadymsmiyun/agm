import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DataLayerManager } from './../services/managers/data-layer-manager';
var layerId = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
var AgmDataLayer = /** @class */ (function () {
    function AgmDataLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    AgmDataLayer_1 = AgmDataLayer;
    AgmDataLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmDataLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmDataLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmDataLayer.prototype.toString = function () { return "AgmDataLayer-" + this._id.toString(); };
    /** @internal */
    AgmDataLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmDataLayer.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this._addedToManager) {
            return;
        }
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        var dataOptions = {};
        AgmDataLayer_1._dataOptionsAttributes.forEach(function (k) { return dataOptions[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : _this[k]; });
        this._manager.setDataOptions(this, dataOptions);
    };
    var AgmDataLayer_1;
    AgmDataLayer._dataOptionsAttributes = ['style'];
    AgmDataLayer.ctorParameters = function () { return [
        { type: DataLayerManager }
    ]; };
    tslib_1.__decorate([
        Output()
    ], AgmDataLayer.prototype, "layerClick", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDataLayer.prototype, "geoJson", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDataLayer.prototype, "style", void 0);
    AgmDataLayer = AgmDataLayer_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-data-layer',
        })
    ], AgmDataLayer);
    return AgmDataLayer;
}());
export { AgmDataLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZGF0YS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTdFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkxHO0FBSUg7SUFzQkUsc0JBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBbkJ0QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUU1Qzs7V0FFRztRQUNPLGVBQVUsR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFeEY7O1dBRUc7UUFDTSxZQUFPLEdBQTJCLElBQUksQ0FBQztJQU9FLENBQUM7cUJBdEJ4QyxZQUFZO0lBd0J2QiwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyx5Q0FBa0IsR0FBMUI7UUFBQSxpQkFRQztRQVBDLElBQU0sU0FBUyxHQUFHO1lBQ2hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBQyxFQUFrQixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXhCLENBQXdCLEVBQUU7U0FDN0UsQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ3BCLElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RGLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQix5QkFBRSxHQUFGLGNBQWUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsK0JBQVEsR0FBUixjQUFxQixPQUFPLGtCQUFnQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUVwRSxnQkFBZ0I7SUFDaEIsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGtDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFlQztRQWRDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUVELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxXQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUVsQyxjQUFZLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUMsV0FBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBRSxLQUFZLENBQUMsQ0FBQyxDQUFDLEVBQWhHLENBQWdHLENBQUMsQ0FBQztRQUVuSixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7SUF2RWMsbUNBQXNCLEdBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQXFCbkMsZ0JBQWdCOztJQVpwQztRQUFULE1BQU0sRUFBRTtvREFBK0U7SUFLL0U7UUFBUixLQUFLLEVBQUU7aURBQXdDO0lBS3ZDO1FBQVIsS0FBSyxFQUFFOytDQUFtQjtJQXBCaEIsWUFBWTtRQUh4QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7T0FDVyxZQUFZLENBeUV4QjtJQUFELG1CQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F6RVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YU1vdXNlRXZlbnQsIERhdGFPcHRpb25zIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xuXG5sZXQgbGF5ZXJJZCA9IDA7XG5cbi8qKlxuICogQWdtRGF0YUxheWVyIGVuYWJsZXMgdGhlIHVzZXIgdG8gYWRkIGRhdGEgbGF5ZXJzIHRvIHRoZSBtYXAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHsgQWdtTWFwLCBBZ21EYXRhTGF5ZXIgfSBmcm9tXG4gKiAnYW5ndWxhci1nb29nbGUtbWFwcy9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIGRpcmVjdGl2ZXM6IFtBZ21NYXAsIEFnbURhdGFMYXllcl0sXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1jb250YWluZXIge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqIFx0ICA8YWdtLWRhdGEtbGF5ZXIgW2dlb0pzb25dPVwiZ2VvSnNvbk9iamVjdFwiIChsYXllckNsaWNrKT1cImNsaWNrZWQoJGV2ZW50KVwiIFtzdHlsZV09XCJzdHlsZUZ1bmNcIj5cbiAqIFx0ICA8L2FnbS1kYXRhLWxheWVyPlxuICogPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlNYXBDbXAge1xuICogICBsYXQ6IG51bWJlciA9IC0yNS4yNzQ0NDk7XG4gKiAgIGxuZzogbnVtYmVyID0gMTMzLjc3NTA2MDtcbiAqICAgem9vbTogbnVtYmVyID0gNTtcbiAqXG4gKiBjbGlja2VkKGNsaWNrRXZlbnQpIHtcbiAqICAgIGNvbnNvbGUubG9nKGNsaWNrRXZlbnQpO1xuICogIH1cbiAqXG4gKiAgc3R5bGVGdW5jKGZlYXR1cmUpIHtcbiAqICAgIHJldHVybiAoe1xuICogICAgICBjbGlja2FibGU6IGZhbHNlLFxuICogICAgICBmaWxsQ29sb3I6IGZlYXR1cmUuZ2V0UHJvcGVydHkoJ2NvbG9yJyksXG4gKiAgICAgIHN0cm9rZVdlaWdodDogMVxuICogICAgfSk7XG4gKiAgfVxuICpcbiAqICBnZW9Kc29uT2JqZWN0OiBPYmplY3QgPSB7XG4gKiAgICBcInR5cGVcIjogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICogICAgXCJmZWF0dXJlc1wiOiBbXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiR1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcImJsdWVcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCI3MVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEyMy42MSwgLTIyLjE0XSwgWzEyMi4zOCwgLTIxLjczXSwgWzEyMS4wNiwgLTIxLjY5XSwgWzExOS42NiwgLTIyLjIyXSwgWzExOS4wMCwgLTIzLjQwXSxcbiAqICAgICAgICAgICAgICBbMTE4LjY1LCAtMjQuNzZdLCBbMTE4LjQzLCAtMjYuMDddLCBbMTE4Ljc4LCAtMjcuNTZdLCBbMTE5LjIyLCAtMjguNTddLCBbMTIwLjIzLCAtMjkuNDldLFxuICogICAgICAgICAgICAgIFsxMjEuNzcsIC0yOS44N10sIFsxMjMuNTcsIC0yOS42NF0sIFsxMjQuNDUsIC0yOS4wM10sIFsxMjQuNzEsIC0yNy45NV0sIFsxMjQuODAsIC0yNi43MF0sXG4gKiAgICAgICAgICAgICAgWzEyNC44MCwgLTI1LjYwXSwgWzEyMy42MSwgLTI1LjY0XSwgWzEyMi41NiwgLTI1LjY0XSwgWzEyMS43MiwgLTI1LjcyXSwgWzEyMS44MSwgLTI2LjYyXSxcbiAqICAgICAgICAgICAgICBbMTIxLjg2LCAtMjYuOThdLCBbMTIyLjYwLCAtMjYuOTBdLCBbMTIzLjU3LCAtMjcuMDVdLCBbMTIzLjU3LCAtMjcuNjhdLCBbMTIzLjM1LCAtMjguMThdLFxuICogICAgICAgICAgICAgIFsxMjIuNTEsIC0yOC4zOF0sIFsxMjEuNzcsIC0yOC4yNl0sIFsxMjEuMDIsIC0yNy45MV0sIFsxMjAuNDksIC0yNy4yMV0sIFsxMjAuMTQsIC0yNi41MF0sXG4gKiAgICAgICAgICAgICAgWzEyMC4xMCwgLTI1LjY0XSwgWzEyMC4yNywgLTI0LjUyXSwgWzEyMC42NywgLTIzLjY4XSwgWzEyMS43MiwgLTIzLjMyXSwgWzEyMi40MywgLTIzLjQ4XSxcbiAqICAgICAgICAgICAgICBbMTIzLjA0LCAtMjQuMDRdLCBbMTI0LjU0LCAtMjQuMjhdLCBbMTI0LjU4LCAtMjMuMjBdLCBbMTIzLjYxLCAtMjIuMTRdXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwib1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcInJlZFwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTVcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMTFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMjguODQsIC0yNS43Nl0sIFsxMjguMTgsIC0yNS42MF0sIFsxMjcuOTYsIC0yNS41Ml0sIFsxMjcuODgsIC0yNS41Ml0sIFsxMjcuNzAsIC0yNS42MF0sXG4gKiAgICAgICAgICAgICAgWzEyNy4yNiwgLTI1Ljc5XSwgWzEyNi42MCwgLTI2LjExXSwgWzEyNi4xNiwgLTI2Ljc4XSwgWzEyNi4xMiwgLTI3LjY4XSwgWzEyNi4yMSwgLTI4LjQyXSxcbiAqICAgICAgICAgICAgICBbMTI2LjY5LCAtMjkuNDldLCBbMTI3Ljc0LCAtMjkuODBdLCBbMTI4LjgwLCAtMjkuNzJdLCBbMTI5LjQxLCAtMjkuMDNdLCBbMTI5LjcyLCAtMjcuOTVdLFxuICogICAgICAgICAgICAgIFsxMjkuNjgsIC0yNy4yMV0sIFsxMjkuMzMsIC0yNi4yM10sIFsxMjguODQsIC0yNS43Nl1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMjguNDUsIC0yNy40NF0sIFsxMjguMzIsIC0yNi45NF0sIFsxMjcuNzAsIC0yNi44Ml0sIFsxMjcuMzUsIC0yNy4wNV0sIFsxMjcuMTcsIC0yNy44MF0sXG4gKiAgICAgICAgICAgICAgWzEyNy41NywgLTI4LjIyXSwgWzEyOC4xMCwgLTI4LjQyXSwgWzEyOC40OSwgLTI3LjgwXSwgWzEyOC40NSwgLTI3LjQ0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIm9cIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJ5ZWxsb3dcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTExXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTMxLjg3LCAtMjUuNzZdLCBbMTMxLjM1LCAtMjYuMDddLCBbMTMwLjk1LCAtMjYuNzhdLCBbMTMwLjgyLCAtMjcuNjRdLCBbMTMwLjg2LCAtMjguNTNdLFxuICogICAgICAgICAgICAgIFsxMzEuMjYsIC0yOS4yMl0sIFsxMzEuOTIsIC0yOS43Nl0sIFsxMzIuNDUsIC0yOS44N10sIFsxMzMuMDYsIC0yOS43Nl0sIFsxMzMuNzIsIC0yOS4zNF0sXG4gKiAgICAgICAgICAgICAgWzEzNC4wNywgLTI4LjgwXSwgWzEzNC4yMCwgLTI3LjkxXSwgWzEzNC4wNywgLTI3LjIxXSwgWzEzMy44MSwgLTI2LjMxXSwgWzEzMy4zNywgLTI1LjgzXSxcbiAqICAgICAgICAgICAgICBbMTMyLjcxLCAtMjUuNjRdLCBbMTMxLjg3LCAtMjUuNzZdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTMzLjE1LCAtMjcuMTddLCBbMTMyLjcxLCAtMjYuODZdLCBbMTMyLjA5LCAtMjYuOTBdLCBbMTMxLjc0LCAtMjcuNTZdLCBbMTMxLjc5LCAtMjguMjZdLFxuICogICAgICAgICAgICAgIFsxMzIuMzYsIC0yOC40NV0sIFsxMzIuOTMsIC0yOC4zNF0sIFsxMzMuMTUsIC0yNy43Nl0sIFsxMzMuMTUsIC0yNy4xN11cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJnXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwiYmx1ZVwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiN1wiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjEwM1wiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzOC4xMiwgLTI1LjA0XSwgWzEzNi44NCwgLTI1LjE2XSwgWzEzNS45NiwgLTI1LjM2XSwgWzEzNS4yNiwgLTI1Ljk5XSwgWzEzNSwgLTI2LjkwXSxcbiAqICAgICAgICAgICAgICBbMTM1LjA0LCAtMjcuOTFdLCBbMTM1LjI2LCAtMjguODhdLCBbMTM2LjA1LCAtMjkuNDVdLCBbMTM3LjAyLCAtMjkuNDldLCBbMTM3LjgxLCAtMjkuNDldLFxuICogICAgICAgICAgICAgIFsxMzcuOTQsIC0yOS45OV0sIFsxMzcuOTAsIC0zMS4yMF0sIFsxMzcuODUsIC0zMi4yNF0sIFsxMzYuODgsIC0zMi42OV0sIFsxMzYuNDUsIC0zMi4zNl0sXG4gKiAgICAgICAgICAgICAgWzEzNi4yNywgLTMxLjgwXSwgWzEzNC45NSwgLTMxLjg0XSwgWzEzNS4xNywgLTMyLjk5XSwgWzEzNS41MiwgLTMzLjQzXSwgWzEzNi4xNCwgLTMzLjc2XSxcbiAqICAgICAgICAgICAgICBbMTM3LjA2LCAtMzMuODNdLCBbMTM4LjEyLCAtMzMuNjVdLCBbMTM4Ljg2LCAtMzMuMjFdLCBbMTM5LjMwLCAtMzIuMjhdLCBbMTM5LjMwLCAtMzEuMjRdLFxuICogICAgICAgICAgICAgIFsxMzkuMzAsIC0zMC4xNF0sIFsxMzkuMjEsIC0yOC45Nl0sIFsxMzkuMTcsIC0yOC4yMl0sIFsxMzkuMDgsIC0yNy40MV0sIFsxMzkuMDgsIC0yNi40N10sXG4gKiAgICAgICAgICAgICAgWzEzOC45OSwgLTI1LjQwXSwgWzEzOC43MywgLTI1LjAwXSwgWzEzOC4xMiwgLTI1LjA0XVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzNy41MCwgLTI2LjU0XSwgWzEzNi45NywgLTI2LjQ3XSwgWzEzNi40OSwgLTI2LjU4XSwgWzEzNi4zMSwgLTI3LjEzXSwgWzEzNi4zMSwgLTI3LjcyXSxcbiAqICAgICAgICAgICAgICBbMTM2LjU4LCAtMjcuOTldLCBbMTM3LjUwLCAtMjguMDNdLCBbMTM3LjY4LCAtMjcuNjhdLCBbMTM3LjU5LCAtMjYuNzhdLCBbMTM3LjUwLCAtMjYuNTRdXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwibFwiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcImdyZWVuXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxMlwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjEwOFwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzE0MC4xNCwgLTIxLjA0XSwgWzE0MC4zMSwgLTI5LjQyXSwgWzE0MS42NywgLTI5LjQ5XSwgWzE0MS41OSwgLTIwLjkyXSwgWzE0MC4xNCwgLTIxLjA0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImVcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjVcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDQuMTQsIC0yNy40MV0sIFsxNDUuNjcsIC0yNy41Ml0sIFsxNDYuODYsIC0yNy4wOV0sIFsxNDYuODIsIC0yNS42NF0sIFsxNDYuMjUsIC0yNS4wNF0sXG4gKiAgICAgICAgICAgICAgWzE0NS40NSwgLTI0LjY4XSwgWzE0NC42NiwgLTI0LjYwXSwgWzE0NC4wOSwgLTI0Ljc2XSwgWzE0My40MywgLTI1LjA4XSwgWzE0Mi45OSwgLTI1LjQwXSxcbiAqICAgICAgICAgICAgICBbMTQyLjY0LCAtMjYuMDNdLCBbMTQyLjY0LCAtMjcuMDVdLCBbMTQyLjY0LCAtMjguMjZdLCBbMTQzLjMwLCAtMjkuMTFdLCBbMTQ0LjE4LCAtMjkuNTddLFxuICogICAgICAgICAgICAgIFsxNDUuNDEsIC0yOS42NF0sIFsxNDYuNDYsIC0yOS4xOV0sIFsxNDYuNjQsIC0yOC43Ml0sIFsxNDYuODIsIC0yOC4xNF0sIFsxNDQuODQsIC0yOC40Ml0sXG4gKiAgICAgICAgICAgICAgWzE0NC4zMSwgLTI4LjI2XSwgWzE0NC4xNCwgLTI3LjQxXVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzE0NC4xOCwgLTI2LjM5XSwgWzE0NC41MywgLTI2LjU4XSwgWzE0NS4xOSwgLTI2LjYyXSwgWzE0NS43MiwgLTI2LjM1XSwgWzE0NS44MSwgLTI1LjkxXSxcbiAqICAgICAgICAgICAgICBbMTQ1LjQxLCAtMjUuNjhdLCBbMTQ0Ljk3LCAtMjUuNjhdLCBbMTQ0LjQ5LCAtMjUuNjRdLCBbMTQ0LCAtMjUuOTldLCBbMTQ0LjE4LCAtMjYuMzldXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIF1cbiAqICB9O1xuICogfVxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1kYXRhLWxheWVyJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtRGF0YUxheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgc3RhdGljIF9kYXRhT3B0aW9uc0F0dHJpYnV0ZXM6IEFycmF5PHN0cmluZz4gPSBbJ3N0eWxlJ107XG5cbiAgcHJpdmF0ZSBfYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGZlYXR1cmUgaW4gdGhlIGxheWVyIGlzIGNsaWNrZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgbGF5ZXJDbGljazogRXZlbnRFbWl0dGVyPERhdGFNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0YU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBnZW9Kc29uIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgQElucHV0KCkgZ2VvSnNvbjogT2JqZWN0IHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXllcidzIHN0eWxlIGZ1bmN0aW9uLlxuICAgKi9cbiAgQElucHV0KCkgc3R5bGU6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogRGF0YUxheWVyTWFuYWdlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hbmFnZXIuYWRkRGF0YUxheWVyKHRoaXMpO1xuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gW1xuICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IERhdGFNb3VzZUV2ZW50KSA9PiB0aGlzLmxheWVyQ2xpY2suZW1pdChldikgfSxcbiAgICBdO1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtRGF0YUxheWVyLSR7dGhpcy5faWQudG9TdHJpbmcoKX1gOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZURhdGFMYXllcih0aGlzKTtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBnZW9Kc29uQ2hhbmdlID0gY2hhbmdlc1snZ2VvSnNvbiddO1xuICAgIGlmIChnZW9Kc29uQ2hhbmdlKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnVwZGF0ZUdlb0pzb24odGhpcywgZ2VvSnNvbkNoYW5nZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cblxuICAgIGxldCBkYXRhT3B0aW9uczogRGF0YU9wdGlvbnMgPSB7fTtcblxuICAgIEFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzLmZvckVhY2goayA9PiAoZGF0YU9wdGlvbnMgYXMgYW55KVtrXSA9IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoaykgPyBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZSA6ICh0aGlzIGFzIGFueSlba10pO1xuXG4gICAgdGhpcy5fbWFuYWdlci5zZXREYXRhT3B0aW9ucyh0aGlzLCBkYXRhT3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==