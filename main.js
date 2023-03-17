// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut } = require('electron')
app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required')
var path = require("path")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const fs = require('fs');

function carefullyParseJSON(string){
    try {
        var mightbeparsed = JSON.parse(string);
        if (mightbeparsed && typeof mightbeparsed === "object") {
            return mightbeparsed;
        }
    }
    catch (error) { }
    return false;
};

function createWindow () {	
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		frame: false,
		kiosk: true,
		skipTaskbar: true,
		alwaysOnTop: true,
		webPreferences: {
			webSecurity: false,
			nativeWindowOpen: true,
			enableRemoteModule: true,
			preload: path.join(__dirname, "preload.js")
		}
	});
	// mainWindow.setMenuBarVisibility(false)

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');

	// mainWindow.webContents.openDevTools();

	mainWindow.webContents.on('did-finish-load', () => {
	 
		var games_array = [];
		var invalid_manifests = [];

		fs.readdirSync("C:\\games").forEach(file => {

			try {
				var contents = fs.readFileSync("C:\\games\\"+file+"\\manifest.json", {encoding: 'utf-8'});
			}
			catch {
				invalid_manifests.push(file+" - failed to open C:\\games\\"+file+"\\manifest.json. Does it exist? Make sure not to leave other files or non-game directories in C:\\games, and make sure all games have a manifest file.");
				return;
			}
			
			contents = carefullyParseJSON(contents);

			if (!contents) {
				invalid_manifests.push(file+" - failed to parse JSON, probably formatted invalidly.");
				return;
			}

			if (!(contents.title && typeof contents.title == "string" && contents.author && typeof contents.author == "string" && contents.type && (contents.type.toLowerCase() == "html5" || (contents.type.toLowerCase() == "windows" && contents.path && typeof contents.path == "string")))) {
				invalid_manifests.push(file+" - missing or invalid required fields: title, author, type. See README-ADD_GAMES.txt for help.");
				return;
			}
				
			games_array.push({
				title: contents.title,
				author: contents.author,
				keybindings: contents.keybindings,
				type: contents.type,
				thumbnail: "C:\\games\\"+file+"\\"+(contents.thumbnail ? contents.thumbnail : "thumbnail.png"),
				video_thumbnail: "C:\\games\\"+file+"\\"+(contents.video_thumbnail ? contents.video_thumbnail : "video_thumbnail.mp4"),
				path: (contents.type.toLowerCase() == "html5" ? "C:\\games\\"+file+"\\index.html" : contents.path),
				id: file
			});

		});

		if (invalid_manifests.length > 0) {
			mainWindow.webContents.send('message', {type:"load_error",message:"Error: Invalid manifest.json for game(s):\n\n "+invalid_manifests.join("\n")+"\n\nUse ALT + F4 to exit. See README-ADD_GAMES.txt for help with the file format."});
		} else {
			mainWindow.webContents.send('message', {type:"main_load",games:games_array});
		}
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

var internal_keycodes_to_names = {
	"13": "enter",
	"27": "escape",
	"36": "menu",
	"38": "1_up",
	"40": "1_down",
	"37": "1_left",
	"39": "1_right",
	"87": "1_stick_up",
	"83": "1_stick_down",
	"65": "1_stick_left",
	"68": "1_stick_right",
	"81": "1_action_1",
	"69": "1_action_2",
	"56": "2_up",
	"53": "2_down",
	"52": "2_left",
	"54": "2_right",
	"73": "2_stick_up",
	"75": "2_stick_down",
	"74": "2_stick_left",
	"76": "2_stick_right",
	"85": "2_action_1",
	"79": "2_action_2"
}

ioHook.on('keydown', event => {
	if (internal_keycodes_to_names[String(event.rawcode)]) {
		mainWindow.webContents.send('message', {type:internal_keycodes_to_names[String(event.rawcode)],origin:"keydown"});
	}
});

ioHook.on('keyup', event => {
	if (internal_keycodes_to_names[String(event.rawcode)]) {
		mainWindow.webContents.send('message', {type:internal_keycodes_to_names[String(event.rawcode)],origin:"keyup"});
	}
});

ioHook.start();

app.on('ready', function() {
	createWindow();
	registerAllKeyListeners();
})

function registerAllKeyListeners() {
//SYSTEM KEYS
globalShortcut.register('Enter', () => {//Enter key
	mainWindow.webContents.send('message', {type:"enter",origin:"global"});
})
globalShortcut.register('Escape', () => {//Exit key
	mainWindow.webContents.send('message', {type:"escape",origin:"global"});
})
globalShortcut.register('Home', () => {//Exit key
	mainWindow.webContents.send('message', {type:"menu",origin:"global"});
})
//

//PLAYER ONE
globalShortcut.register('Left', () => {//Player one left
	mainWindow.webContents.send('message', {type:"1_left",origin:"global"});
})
globalShortcut.register('Right', () => {//player one right
	mainWindow.webContents.send('message', {type:"1_right",origin:"global"});
})
globalShortcut.register('Up', () => {//player one up
	mainWindow.webContents.send('message', {type:"1_up",origin:"global"});
})
globalShortcut.register('Down', () => {//player one down
	mainWindow.webContents.send('message', {type:"1_down",origin:"global"});
})
globalShortcut.register('A', () => {//player one joystick left
	mainWindow.webContents.send('message', {type:"1_stick_left",origin:"global"});
})
globalShortcut.register('D', () => {//player one joystick right
	mainWindow.webContents.send('message', {type:"1_stick_right",origin:"global"});
})
globalShortcut.register('W', () => {//player one joystick up
	mainWindow.webContents.send('message', {type:"1_stick_up",origin:"global"});
})
globalShortcut.register('S', () => {//player one joystick down
	mainWindow.webContents.send('message', {type:"1_stick_down",origin:"global"});
})
globalShortcut.register('Q', () => {//player one action 1
	mainWindow.webContents.send('message', {type:"1_action_1",origin:"global"});
})
globalShortcut.register('E', () => {//player one action 2
	mainWindow.webContents.send('message', {type:"1_action_2",origin:"global"});
})
//

//PLAYER TWO
globalShortcut.register('4', () => {//Player two left
	mainWindow.webContents.send('message', {type:"2_left",origin:"global"});
})
globalShortcut.register('6', () => {//player two right
	mainWindow.webContents.send('message', {type:"2_right",origin:"global"});
})
globalShortcut.register('8', () => {//player two up
	mainWindow.webContents.send('message', {type:"2_up",origin:"global"});
})
globalShortcut.register('5', () => {//player two down
	mainWindow.webContents.send('message', {type:"2_down",origin:"global"});
})
globalShortcut.register('J', () => {//player two joystick left
	mainWindow.webContents.send('message', {type:"2_stick_left",origin:"global"});
})
globalShortcut.register('L', () => {//player two joystick right
	mainWindow.webContents.send('message', {type:"2_stick_right",origin:"global"});
})
globalShortcut.register('I', () => {//player two joystick up
	mainWindow.webContents.send('message', {type:"2_stick_up",origin:"global"});
})
globalShortcut.register('K', () => {//player two joystick down
	mainWindow.webContents.send('message', {type:"2_stick_down",origin:"global"});
})
globalShortcut.register('U', () => {//player two action 1
	mainWindow.webContents.send('message', {type:"2_action_1",origin:"global"});
})
globalShortcut.register('O', () => {//player two action 2
	mainWindow.webContents.send('message', {type:"2_action_2",origin:"global"});
})
//

globalShortcut.register('Insert', () => {
	mainWindow.webContents.send('message', {type:"system_handling_enabled"});
	globalShortcut.unregisterAll();
	setTimeout(function() {
		globalShortcut.register('Insert', () => {
			mainWindow.webContents.send('message', {type:"system_handling_disabled"});
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
