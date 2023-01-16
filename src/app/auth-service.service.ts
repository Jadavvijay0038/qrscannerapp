import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  async userislogedin() {
    const ret = await Preferences.get({ key: 'loginCredential' });
    if (ret.value != undefined) {
      return true
    } else {
      return false
    }
  }
}
