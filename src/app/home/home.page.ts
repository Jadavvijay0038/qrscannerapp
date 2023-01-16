import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CapacitorFlash } from '@capgo/capacitor-flash'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  myAngularxQrCode:string = ''
  scannedResult: any = null;
  showbutton = false;
  content_visibility: string ='';

  async checkPermission() {
    try {
      const { granted } = await BarcodeScanner.checkPermission({ force: true });
      return granted;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      if (!await this.checkPermission()) {
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
      }
      this.stopScan();
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

  ngOnDestroy() {
    this.stopScan();
  }
}
