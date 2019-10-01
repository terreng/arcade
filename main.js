// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// !!!!
//hide window on creation, programatically wait for firebase command and then show
// !!!!

const fs = require('fs');

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
	frame: false,
	kiosk: true,
	skipTaskbar: true,
	alwaysOnTop: false,
    webPreferences: {
	  webSecurity: false,
	  nativeWindowOpen: true
    }
  })
 // mainWindow.setMenuBarVisibility(false)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  
  mainWindow.webContents.on('did-finish-load', () => {
	 
var games_array = [];

fs.readdirSync("C:\\games").forEach(file => {
	
var contents = fs.readFileSync("C:\\games\\"+file+"\\manifest.json", {encoding: 'utf-8'});
console.log(contents)
contents = JSON.parse(contents);
	
games_array.push({
	title: contents.title,
	author: contents.author,
	thumbnail: "C:\\games\\"+file+"\\thumbnail.png",
	path: "C:\\games\\"+file+"\\index.html",
	id: file
});

  //console.log(file);
});
	  
	  
	  
    mainWindow.webContents.send('message', {type:"main_load",games:games_array});
});

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	createWindow();
	registerAllKeyListeners();
})

function registerAllKeyListeners() {
globalShortcut.register('Enter', () => {
	mainWindow.webContents.send('message', {type:"enter"});
})
globalShortcut.register('Escape', () => {
	mainWindow.webContents.send('message', {type:"escape"});
})
globalShortcut.register('Left', () => {
	mainWindow.webContents.send('message', {type:"left"});
})
globalShortcut.register('Right', () => {
	mainWindow.webContents.send('message', {type:"right"});
})
globalShortcut.register('Up', () => {
	mainWindow.webContents.send('message', {type:"up"});
})
globalShortcut.register('Down', () => {
	mainWindow.webContents.send('message', {type:"down"});
})
globalShortcut.register('Insert', () => {
	globalShortcut.unregisterAll();
setTimeout(function() {
	globalShortcut.register('Insert', () => {
		globalShortcut.unregisterAll();
		setTimeout(function() {
			registerAllKeyListeners();
		},300)
	})
},300)
})
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.