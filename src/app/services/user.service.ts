import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  emails = ['contact@mail.com', 'support@mail.com'];

  constructor() { }

  emailExist(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map((email) => {
        return this.emails.includes(email);
      })
    );
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExist(control.value).pipe(
        map((exists) => (exists ? { emailExists: true } : null)),
        catchError(async (err) => null)
      );
    };
  }
}

