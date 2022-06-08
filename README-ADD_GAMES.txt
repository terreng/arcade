|---- HOW TO ADD GAMES TO THE RIDER ARCADE ----|

# Step 0: Compile
Compile your game into HTML so it can be used in the arcade

# Step 1: Add game to directory
Put HTML compiled game into a folder if all of it is not already in a folder

Put that folder in the C:\games directory on the arcade

# Step 2: Add 'manifest.json'
Create a file in your game's folder called 'manifest.json'

+==========================================================+
| A note about JSON: The arcade uses .json files to store  |
| game information. If you aren't familiar with JSON, you  |
| should look at the examples in this file. Importantly:   |
|  - all strings need to be in quotes, numbers without     |
|  - \ is the escape character, and \n is newline          |
|  - each line ends with a comma, except for the last line,|
|    which CANNOT end in a comma                           |
|  - { } signifies key-value pairs, and [ ] is an array    |
|  - JSON has no comment mechanism whatsoever              |
+==========================================================+

You want to add this to the file, replacing the words in caps with the actual things:
{
    title: "TITLE_OF_YOUR_GAME",
    author: "AUTHOR_OF_THE_GAME",
    type: "GAME_ENGINE_USED_FOR_GAME"
}

(for right now the game engine can only be "html5")

At this point, the game will show up on the menu, but it won't have a thumbnail. You should add one.

# Step 3: Add a thumbnail (Highly recommended)
1. Take a screenshot of your game
2. Name it 'thumbnail.png'
3. Add it to your game folder on the arcade

# Step 4: Add a video preview (Optional)
This video will play when you hover over the game on the main menu.
1. Take a screen recorded video of your game
2. Name it 'video_thumbnail.mp4'
3. Add it to your game folder on the arcade

# Step 5: Change keybindings
If your game does not work properly with the arcade controls or you just want to
mess around with the keybindings, here's what you can do:

1. To change a keybinding, you need to provide 2 things: the id of the button on the arcade, 
and the keycode(s) you want it to send to your game.

If you look at the image file 'KEYCODE_GUIDE.png' you will need the Key ID of the button
on the arcade that you want to use (like "1_stick_up" or "menu").

You can't remap the Close/Exit button (key id "escape") to anything.

You will also need the keycode of the key you want to use on the keyboard, which you
can find by looking it up, or using this website: https://www.toptal.com/developers/keycode
(the keycode is the big number in the middle of the screen, you can't miss it)

2. Now you want to add the 'keybindings' parameter to the 'manifest.json' file. Example:
{
    title: "Epic Dragon Slayer",
    author: "Dugan Nash",
    type: "html5",
    keybindings: {
        "1_stick_up": 65,
        "2_action_2": [69, 82]
    }
}

Inside the braces in the keybindings option, you should provide key id to keycode pairs, like
in the example above.

You can add as many of these keybinding pairs as you want. When you remap a key, it will
only send the new keycode you specify. This replaces the default.

You can also provide an array of keycodes, like: [35, 77, 54]
This will cause the arcade button to trigger multiple key events, in the order specified.


If you need extra help understanding these steps, look at the manifest.json of the game under
the folder named '0'
