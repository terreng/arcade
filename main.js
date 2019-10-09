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

const ioHook = require('iohook');

ioHook.on('keydown', event => {
  console.log(event);
});

ioHook.on('keyup', event => {
  console.log(event);
});

ioHook.start();

app.on('ready', function() {
	createWindow();
	registerAllKeyListeners();
})

function registerAllKeyListeners() {
//SYSTEM KEYS
globalShortcut.register('Enter', () => {//Enter key
	mainWindow.webContents.send('message', {type:"enter"});
})
globalShortcut.register('Escape', () => {//Exit key
	mainWindow.webContents.send('message', {type:"escape"});
})
//

//PLAYER ONE
globalShortcut.register('Left', () => {//Player one left
	mainWindow.webContents.send('message', {type:"1_left"});
})
globalShortcut.register('Right', () => {//player one right
	mainWindow.webContents.send('message', {type:"1_right"});
})
globalShortcut.register('Up', () => {//player one up
	mainWindow.webContents.send('message', {type:"1_up"});
})
globalShortcut.register('Down', () => {//player one down
	mainWindow.webContents.send('message', {type:"1_down"});
})
globalShortcut.register('A', () => {//player one joystick left
	mainWindow.webContents.send('message', {type:"1_stick_left"});
})
globalShortcut.register('D', () => {//player one joystick right
	mainWindow.webContents.send('message', {type:"1_stick_right"});
})
globalShortcut.register('W', () => {//player one joystick up
	mainWindow.webContents.send('message', {type:"1_stick_up"});
})
globalShortcut.register('S', () => {//player one joystick down
	mainWindow.webContents.send('message', {type:"1_stick_down"});
})
globalShortcut.register('Q', () => {//player one action 1
	mainWindow.webContents.send('message', {type:"1_action_1"});
})
globalShortcut.register('E', () => {//player one action 2
	mainWindow.webContents.send('message', {type:"1_action_2"});
})
//

//PLAYER TWO
globalShortcut.register('4', () => {//Player two left
	mainWindow.webContents.send('message', {type:"2_left"});
})
globalShortcut.register('6', () => {//player two right
	mainWindow.webContents.send('message', {type:"2_right"});
})
globalShortcut.register('8', () => {//player two up
	mainWindow.webContents.send('message', {type:"2_up"});
})
globalShortcut.register('5', () => {//player two down
	mainWindow.webContents.send('message', {type:"2_down"});
})
globalShortcut.register('J', () => {//player two joystick left
	mainWindow.webContents.send('message', {type:"2_stick_left"});
})
globalShortcut.register('L', () => {//player two joystick right
	mainWindow.webContents.send('message', {type:"2_stick_right"});
})
globalShortcut.register('I', () => {//player two joystick up
	mainWindow.webContents.send('message', {type:"2_stick_up"});
})
globalShortcut.register('K', () => {//player two joystick down
	mainWindow.webContents.send('message', {type:"2_stick_down"});
})
globalShortcut.register('U', () => {//player two action 1
	mainWindow.webContents.send('message', {type:"2_action_1"});
})
globalShortcut.register('O', () => {//player two action 2
	mainWindow.webContents.send('message', {type:"2_action_2"});
})
//

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
