const { contextBridge, ipcRenderer, shell, app } = require('electron');

ipcRenderer.on('console', (event, data) => {
    console[data.method].apply(console, data.args)
});

contextBridge.exposeInMainWorld('api', {
    initipc: ipcMessageEvent => {
        ipcRenderer.on('message', ipcMessageEvent);
    }
})