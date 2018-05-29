// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path');
const Observable = require('rxjs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const iconPath = path.join(__dirname, 'clock2.png');


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({show: false})
  var tray = new Tray(iconPath);
  tray.setTitle("Worktime: 00:00");
  
  var start = new Date(Date.now());
  var startMsec = start.getTime();  

  this.sub = Observable.interval(10000)
    .subscribe((val) => { 
      var elapsed = (new Date(Date.now()).getTime() - startMsec);  
      tray.setTitle("Worktime: " + msToTime(elapsed));
    });
}

function msToTime(duration) {
  var milliseconds = parseInt((duration%1000)/100)
      , seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
