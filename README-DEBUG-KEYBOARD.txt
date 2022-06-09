While the program is running, it intercepts keyboard events for certain keys at
a system level, which prevents them from being received by any other program.

The following keys are intercepted, and will not function normally while the
program is running: W, A, S, D, Q, E, I, J, K, L, U, O, 4, 5, 6, 8, Enter,
Escape, Home, Arrow Up, Arrow Left, Arrow Down, Arrow Right, Insert.
All other keys will work normally.

For debugging purposes, it may be necessary to type some of these keys, such
as into the DevTools console (Which can be opened with CTRL + SHIFT + I)
For this reason, I built in a toggle to disable the program's interception
of certain keys.

To disable the program's interception of certain keys, press the Insert key.
When the program's handling of keyboard events is disabled, you will see a
"System handling key events" message at the top left of the screen.
To re-enable the program's handling of key events, simply press the Insert
key again.

Because the Insert key is used to toggle this mode, it is impossible to use
the Insert key in any other program while the arcade is running. That's why
I chose the Insert key.

When the program's handling of key events is disabled, keyboard events may
still be sent to the program and html5 games that are open. However, results
may be unpredictable, such as keys still registering while the quit game menu
is open, and custom keyboard mappings not working. When the program's handling
of key events is disabled, the program no longer has the ability to prevent
certain key events from reaching html5 games, and remapping keys.