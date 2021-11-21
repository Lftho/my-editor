import { Inject, Injectable } from '@angular/core';
import { WINDOW, ElectronWindow } from './window';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(
    @Inject(WINDOW) private window: ElectronWindow
  ) { }

  private get ipcRenderer(): Electron.IpcRenderer {
    const { ipcRenderer } = this.window.require('electron')

    const getIcpRender = ipcRenderer.ipcRenderer;
    return getIcpRender;
  }

  getContent(): Promise<string> {
    const ipcRender = this.ipcRenderer.invoke('getContent');
    return ipcRender;
  }

  setContent(content: string) {
    this.ipcRenderer.invoke('setContent', content);
  }
}
