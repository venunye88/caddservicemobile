import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ConnectionStatus, Network, NetworkStatus } from '@capacitor/network';
// import { NetworkStatus, PluginListenerHandle, Plugins } from '@capacitor/network';
import { StoreKeys } from './config-keys';
import { ToasterService } from './toaster.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private renderer: Renderer2;
  config: Config

  networkStatus: ConnectionStatus;
  // networkListener: PluginListenerHandle;


  constructor(private rendererFactory: RendererFactory2, private toaster: ToasterService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setConfig(isDark: boolean) {
    this.config = { darkMode: isDark, connectivity: false };
    localStorage.setItem(StoreKeys.Config, JSON.stringify(this.config));

    if (isDark) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  loadConfig() {
    let configValue = localStorage.getItem(StoreKeys.Config);
    if (configValue) {
      this.config = JSON.parse(localStorage.getItem(StoreKeys.Config));
      if (this.config.darkMode) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      }
      else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    } else { this.setConfig(true); }
  }

  async connectivity() {
    var config = <Config>JSON.parse(localStorage.getItem(StoreKeys.Config));
    this.toaster.hideToast();

    Network.addListener('networkStatusChange', (status) => {
      if (!status.connected) {
        this.toaster.showBanner('No internet connection', true);
        config.connectivity = false;
      }
      else {
        if (!config.connectivity) {
          this.toaster.showBanner('Connection restored', false);
          config.connectivity = true;
        }
      }
      localStorage.setItem(StoreKeys.Config, JSON.stringify(this.config));
      this.networkStatus = status;
    });

    this.networkStatus = await Network.getStatus();
  }

  // ngOnDestroy() {
  //   this.networkListener.remove();
  // }


}

export class Config {
  darkMode: boolean;
  connectivity: boolean = false;
}