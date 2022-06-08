INSTALLATION INSTRUCTIONS

Install node & npm.
https://nodejs.org/en/download/
- Make sure to check the box about installing Chocolatey and VS Code C++ whatever
(Tested and working on 14.17.0)

Download and install Python
- Make sure to check the box about adding python to your Windows PATH variable
(Tested and working on 3.9.5)

Run "npm config set python C:\Python39\python.exe"
(Make sure to update this command for whatever version of python you're using)

Download this repository to C:/arcade

Open a terminal window to C:/arcade and run "npm install electron@4.1.3 -g", "npm install iohook -g", and "npm install"

Install Joy2Key
https://joytokey.net/en/download
Map all of the buttons to match "internal keybindings" column of "docs/Keybindings Guide.xlsx"

Put all of the games in C:/games
(Make sure to add the manifest.json files with the title, author and type)
(thumbnails are called 'thumbnail.png' and previews are called 'video_thumbnail.mp4')

Add keybindings if need be
(An object of the key on the arcade to a keycode on the keyboard)

See README-ADD_GAMES.txt for more detailed instructions
