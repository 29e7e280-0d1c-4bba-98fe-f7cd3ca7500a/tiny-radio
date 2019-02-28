const electron = require("electron");
const nativeImage = require('electron').nativeImage
const path = require('path')
const iconPath = path.join(__dirname, '/res/start.png');
const trayIcon = nativeImage.createFromPath(iconPath)

const { ipcMain, app, dialog, BrowserWindow, Tray, Menu } = electron;

function createWindow() {
  const win = new BrowserWindow({ width: 670, height: 500 });

  const tray = new Tray(trayIcon);

  win.loadFile("index.html");

  win.on("minimize", () => {
    win.hide();
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: "关于"}
  ]);
  tray.setToolTip("双击显示窗口");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });
  
  win.on("closed", () => {
    tray.destroy()
  });
}
app.on("ready", createWindow);

app.on('window-all-closed', () => {
  app.quit()
})