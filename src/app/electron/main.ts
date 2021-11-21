import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

/**
 * BrowserWindow: classe é usada para criar uma janela de desktop
 * para nosso aplicativo.
 *
 * loadFile: método, passado como parâmetro o arquivo HTML que
 * queremos carregar dentro da janela.
 * O index.htmlarquivo que passamos no loadFilemétodo é o arquivo
 * HTML principal do aplicativo Angular. Ele será carregado usando
 * o file://protocolo, por isso removemos a basetag na seção
 * Adicionando uma biblioteca WYSIWYG Angular .
 *
 * O appobjeto é o objeto global de nosso aplicativo de desktop,
 * assim como o windowobjeto em uma página da web. Ele expõe uma
 * whenReadypromessa de que, quando resolvida, significa que podemos
 * executar qualquer lógica de inicialização para nosso aplicativo,
 * incluindo a criação da janela.
 *
 * A fsbiblioteca é responsável por interagir com o sistema de
 * arquivos. A path biblioteca fornece utilitários para trabalhar
 * com caminhos de arquivos e pastas. O ipcMain objeto nos permite
 * trabalhar com o processo principal do Elétron
 *
 * Quando o processo principal recebe uma solicitação neste canal,
 * ele usa o existsSyncmétodo da fs biblioteca para verificar se o
 * arquivo com o conteúdo do editor já existe. Se existir, ele o lê
 * usando o readFileSync método e retorna seu conteúdo ao processo de
 * renderização.
 */
const contentFile = path.join(app.getPath('userData'), 'content.html');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});


ipcMain.handle('getContent', () => {
  if (fs.existsSync(contentFile)) {
    const result = fs.readFileSync(contentFile);
    return result.toString();
  }
  return '';
});

ipcMain.handle('setContent', ({ }, content: string) => {
  fs.writeFileSync(contentFile, content);
});
