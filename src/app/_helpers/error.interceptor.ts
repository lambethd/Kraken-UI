import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';
import { AlertService } from '@/_services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private alertService: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.alertService.error("You have been logged out and will need to log back in");
                location.reload(true);
            }
            if(err.status === 500){
                // alert to say there has been an error
                this.alertService.error("Something has gone wrong, please try again");
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}