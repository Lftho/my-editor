import { InjectionToken } from '@angular/core';

/**
 * O framework Electron é um módulo JavaScript que pode ser
 * arregado a partir do window objeto global do navegador.
 * Usamos a InjectionTokeninterface para tornar o window objeto
 * injetável para que possamos usá-lo em nossos componentes e
 * serviços Angular. Além disso, utilizamos um factory método
 * para retorná-lo de forma que seja fácil substituí-lo em
 * plataformas sem acesso ao window objeto, como o servidor.
 *
 * Electron é carregado usando o requiremétodo do window objeto,
 * que está disponível apenas no ambiente Node.js. Para usá-lo em
 * um aplicativo Angular, criamos a ElectronWindow interface
 * que estende a Window interface, definindo esse método.
 */

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});

export interface ElectronWindow extends Window {
  require(module: string): any;
}
