import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { bindCallback, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as i0 from "@angular/core";
import * as i1 from "./maps-api-loader/maps-api-loader";
var AgmGeocoder = /** @class */ (function () {
    function AgmGeocoder(loader) {
        var _this = this;
        var connectableGeocoder$ = new Observable(function (subscriber) {
            loader.load().then(function () { return subscriber.next(); });
        })
            .pipe(map(function () { return _this._createGeocoder(); }), multicast(new ReplaySubject(1)));
        connectableGeocoder$.connect(); // ignore the subscription
        // since we will remain subscribed till application exits
        this.geocoder$ = connectableGeocoder$;
    }
    AgmGeocoder.prototype.geocode = function (request) {
        var _this = this;
        return this.geocoder$.pipe(switchMap(function (geocoder) { return _this._getGoogleResults(geocoder, request); }));
    };
    AgmGeocoder.prototype._getGoogleResults = function (geocoder, request) {
        var geocodeObservable = bindCallback(geocoder.geocode);
        return geocodeObservable(request).pipe(switchMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), results = _b[0], status = _b[1];
            if (status === GeocoderStatus.OK) {
                return of(results);
            }
            return throwError(status);
        }));
    };
    AgmGeocoder.prototype._createGeocoder = function () {
        return new google.maps.Geocoder();
    };
    AgmGeocoder.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    AgmGeocoder.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(i0.ɵɵinject(i1.MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
    AgmGeocoder = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], AgmGeocoder);
    return AgmGeocoder;
}());
export { AgmGeocoder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dlb2NvZGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBeUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBNkMsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbEU7SUFHRSxxQkFBWSxNQUFxQjtRQUFqQyxpQkFhQztRQVpDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBQSxVQUFVO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQzthQUNDLElBQUksQ0FDSCxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxFQUNqQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDRyxDQUFDO1FBRXZDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBQzFELHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFBaEMsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN4QixTQUFTLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLFFBQWtCLEVBQUUsT0FBd0I7UUFDcEUsSUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE9BQU8saUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNwQyxTQUFTLENBQUMsVUFBQyxFQUFpQjtnQkFBakIsMEJBQWlCLEVBQWhCLGVBQU8sRUFBRSxjQUFNO1lBQ3pCLElBQUksTUFBTSxLQUFLLGNBQWMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxxQ0FBZSxHQUF2QjtRQUNFLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBYyxDQUFDO0lBQ2hELENBQUM7O2dCQXBDbUIsYUFBYTs7O0lBSHRCLFdBQVc7UUFEdkIsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLFdBQVcsQ0F3Q3ZCO3NCQWpERDtDQWlEQyxBQXhDRCxJQXdDQztTQXhDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmluZENhbGxiYWNrLCBDb25uZWN0YWJsZU9ic2VydmFibGUsIE9ic2VydmFibGUsIG9mLCBSZXBsYXlTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG11bHRpY2FzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR2VvY29kZXIsIEdlb2NvZGVyUmVxdWVzdCwgR2VvY29kZXJSZXN1bHQsIEdlb2NvZGVyU3RhdHVzIH0gZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQWdtR2VvY29kZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZ2VvY29kZXIkOiBPYnNlcnZhYmxlPEdlb2NvZGVyPjtcblxuICBjb25zdHJ1Y3Rvcihsb2FkZXI6IE1hcHNBUElMb2FkZXIpIHtcbiAgICBjb25zdCBjb25uZWN0YWJsZUdlb2NvZGVyJCA9IG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHN1YnNjcmliZXIubmV4dCgpKTtcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLl9jcmVhdGVHZW9jb2RlcigpKSxcbiAgICAgICAgbXVsdGljYXN0KG5ldyBSZXBsYXlTdWJqZWN0KDEpKSxcbiAgICAgICkgYXMgQ29ubmVjdGFibGVPYnNlcnZhYmxlPEdlb2NvZGVyPjtcblxuICAgIGNvbm5lY3RhYmxlR2VvY29kZXIkLmNvbm5lY3QoKTsgLy8gaWdub3JlIHRoZSBzdWJzY3JpcHRpb25cbiAgICAvLyBzaW5jZSB3ZSB3aWxsIHJlbWFpbiBzdWJzY3JpYmVkIHRpbGwgYXBwbGljYXRpb24gZXhpdHNcblxuICAgIHRoaXMuZ2VvY29kZXIkID0gY29ubmVjdGFibGVHZW9jb2RlciQ7XG4gIH1cblxuICBnZW9jb2RlKHJlcXVlc3Q6IEdlb2NvZGVyUmVxdWVzdCk6IE9ic2VydmFibGU8R2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLmdlb2NvZGVyJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChnZW9jb2RlcikgPT4gdGhpcy5fZ2V0R29vZ2xlUmVzdWx0cyhnZW9jb2RlciwgcmVxdWVzdCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEdvb2dsZVJlc3VsdHMoZ2VvY29kZXI6IEdlb2NvZGVyLCByZXF1ZXN0OiBHZW9jb2RlclJlcXVlc3QpOiBPYnNlcnZhYmxlPEdlb2NvZGVyUmVzdWx0W10+IHtcbiAgICBjb25zdCBnZW9jb2RlT2JzZXJ2YWJsZSA9IGJpbmRDYWxsYmFjayhnZW9jb2Rlci5nZW9jb2RlKTtcbiAgICByZXR1cm4gZ2VvY29kZU9ic2VydmFibGUocmVxdWVzdCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3Jlc3VsdHMsIHN0YXR1c10pID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICByZXR1cm4gb2YocmVzdWx0cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzdGF0dXMpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlR2VvY29kZXIoKTogR2VvY29kZXIge1xuICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKSBhcyBHZW9jb2RlcjtcbiAgfVxufVxuIl19