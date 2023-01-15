import { Component, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CapacitorFlash } from '@capgo/capacitor-flash'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  public myAngularxQrCode: any | undefined;
  public scannedResult: any;
  public content_visibility = '';
  showbutton: boolean = false;
  constructor() { }

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      this.showbutton = true;
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
      this.showbutton = false;

    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
    this.showbutton = false;

  }

  async useflashlight() {
    let status = await CapacitorFlash.isAvailable();
    if (status) {
      CapacitorFlash.toggle();
    }
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
