Add games to C:/games like normal. All HTML5 games are type “stencyl” in the config.json file.
I know that doesn’t make sense, but that’s how it is. Don’t @ me.

Game Maker:
Make sure the window size is a 16:9 aspect ratio for best results.

Unity:
Export Web GL/HTML5, and make sure to disable Brotli compression by going to:
	Player Settings… > Publishing Settings > Compression Format > Disabled.

Then go to the Resolution and Presentation section.
Switch to “Minimal” template.
Set width to 1920 and height to 1080.
Then build to a directory.
