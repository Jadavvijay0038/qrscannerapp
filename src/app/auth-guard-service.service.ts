import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanLoad {

  constructor(private router: Router) {
  }
  async canLoad(route: Route): Promise<boolean> {
    const ret = await Preferences.get({ key: 'loginCredential' });
    if (ret.value != undefined) {
      this.router.navigate(['/home']);
      return true
    } else {
      // this.router.navigate(['/login-page']);
      return false
    }
  }
}
