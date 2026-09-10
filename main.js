const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

// Ma'lumotlar doim bitta joyda saqlanishi uchun nom qat'iy belgilanadi:
// C:\Users\<siz>\AppData\Roaming\Moliyam
app.setName('Moliyam');
app.setPath('userData', path.join(app.getPath('appData'), 'Moliyam'));

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    show: false,
    backgroundColor: '#0E7C7B',
    title: 'Moliyam',
    icon: path.join(__dirname, 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  win.once('ready-to-show', () => win.show());
  win.loadFile(path.join(__dirname, 'index.html'));

  // Tashqi havolalar brauzerda ochilsin, ilova ichida emas
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

const menu = Menu.buildFromTemplate([
  {
    label: 'Fayl',
    submenu: [
      { role: 'reload', label: 'Yangilash' },
      { type: 'separator' },
      { role: 'quit', label: 'Chiqish' }
    ]
  },
  {
    label: 'Ko\u2018rinish',
    submenu: [
      { role: 'zoomIn', label: 'Kattalashtirish' },
      { role: 'zoomOut', label: 'Kichraytirish' },
      { role: 'resetZoom', label: 'Asl o\u2018lcham' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'To\u2018liq ekran' },
      { role: 'toggleDevTools', label: 'Dasturchi vositalari' }
    ]
  },
  {
    label: 'Yordam',
    submenu: [
      {
        label: 'Ma\u2019lumotlar qayerda saqlanadi?',
        click() {
          dialog.showMessageBox(win, {
            type: 'info',
            title: 'Ma\u2019lumotlar joyi',
            message: 'Barcha yozuvlar shu papkada saqlanadi:',
            detail: app.getPath('userData') +
              '\n\nIlovadagi "Zaxira nusxa" (JSON) tugmasidan vaqti-vaqti bilan foydalaning.',
            buttons: ['Papkani ochish', 'Yopish'],
            defaultId: 0
          }).then(r => { if (r.response === 0) shell.openPath(app.getPath('userData')); });
        }
      },
      {
        label: 'Moliyam haqida',
        click() {
          dialog.showMessageBox(win, {
            type: 'info',
            title: 'Moliyam',
            message: 'Moliyam \u2014 shaxsiy moliya nazorati',
            detail: 'Versiya ' + app.getVersion() + '\nOflayn ishlaydi, ma\u2019lumotlar faqat shu kompyuterda.'
          });
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);

// Bitta nusxadan ortiq ochilmasin (ma'lumotlar to'qnashmasligi uchun)
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });
  app.whenReady().then(createWindow);
}

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
