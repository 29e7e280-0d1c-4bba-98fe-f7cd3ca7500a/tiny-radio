const electron = require("electron");

const { ipcMain, app, dialog, BrowserWindow, Tray, Menu } = electron;

function createWindow() {
  const win = new BrowserWindow({ width: 670, height: 543 });

  const tray = new Tray("res/start.png");

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