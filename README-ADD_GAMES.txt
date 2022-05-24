|---- HOW TO ADD GAMES TO THE RIDER ARCADE ----|

# Step 0: Compile
Compile your game into HTML so it can be used in the arcade

# Step 1: Add game to directory
Put HTML compiled game into a folder if all of it is not already in a folder

Put that folder in the C:\games directory on the arcade

# Step 2: Add 'manifest.json'
Create a file in your game's folder called 'manifest.json'

You want to add this to the file, replacing the words in caps with the actual things:
{
    title: TITLE_OF_YOUR_GAME,
    author: AUTHOR_OF_THE_GAME,
    type: GAME_ENGINE_USED_FOR_GAME,
}

(for right now the game engine can only be stencyl)

And that's basically it! There are some extra little things you can do like adding a
thumbnail which are explained below.

# Step 3: Add a thumbnail
1. Take a screenshot of your game
2. Name it 'thumbnail.png'
3. Add it to your game folder on the arcade

# Step 4: Add a preview
1. Take a screen recorded video of your game
2. Name it 'video_thumbnail.mp4'
3. Add it to your game folder on the arcade

# Step 5: Change keybindings
If your game does not work properly with the arcade controls or you just want to
mess around with the keybindings, here's what you can do:

1. To add a keybinding, you need 2 things: the button you want on the arcade and the 
keycode of the key on the keyboard that you want that arcade button to be remapped to

If you look at the image file 'KEYCODE_GUIDE.png' you will need the Key ID of the button
on the arcade that you want to use

You will also need the keycode of the key you want to use on the keyboard, which you
can find by looking it up

2. Now you want to add the 'keybindings' parameter to the 'manifest.json' file in your game folder like so:
{
    title: TITLE,
    author: AUTHOR,
    type: TYPE,
    keybindings: {

    }
}

The words in capital letters should be the actual things not the words themselves

3. In the {} of the keybindings parameter, you want to put:
"KEY_ID": KEYCODE_ON_KEYBOARD

Replacing capital words with the actual things

You can add as many keybindings as you see fit by adding another of the line above
in the curly brackets of 'keybindings'

If you need extra help understanding these steps, look at the manifest.json of the game under
the folder named '0'
