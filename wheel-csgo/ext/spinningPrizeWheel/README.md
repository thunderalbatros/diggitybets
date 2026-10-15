## Description

[wrap=info]
This is an updated version of Lyfesaver74's Spinning Prize Wheel. Changelog can be found at the bottom. Once testing is completed, I plan on copying this documentation over the existing [Spinning Prize Wheel](https://extensions.streamer.bot/docs?topic=353)
[/wrap]

Spinning wheel used for all sorts of things to choose costumes, games, people, prizes... literally anything! This import includes an easy method to import into OBS, and most configuration can be done by editing the URL parameters. The wheel can be populated either by an included text file or by utilizing Streamer.bot's User Groups system, meaning this works multi-platform over Twitch, YouTube, and Trovo.

The core of the extension is also a prime example of HTML/CSS/JS using:
- Bi-directional websocket communication, incl variables
- URL parameters for variables
- Read from local file
- User Group management in Streamer.bot

## Video Example

[wrap=warning]I'm keeping the video for posterity. It does not reflect the current version.[/wrap]
https://www.youtube.com/watch?v=O3_zjtA43nw

## Import Code & Resources (Download)
Download the following zip containing everything you need
[spinningPrizeWheel-1.4.zip|attachment](upload://wN15geTLUud4sCjEN9xMNwUhWAm.zip) (40.3 KB)

## Installation

In Streamer.bot click the `Import` button in the top menu. Drag the **.sb** file into the `Import String` field.

![image|654x500, 100%](upload://KRHA0a7NSnyHoC3hEoGgaLR6Ak.png)

## Configuration

Most configuration will be done within the `Prize Wheel 1. Settings` action.
| Variable Name                    | Description                                                                       | Default Value               |
|----------------------------------|-----------------------------------------------------------------------------------|-----------------------------|
| `wsIpAddress`                    | Optional - Use only if connecting to a different PC                               | `127.0.0.1`                 |
| `wsPort`                         | Optional - Use only if connecting to a different Websocket port                   | `8080`                      |
| `img`                            | Optional - Provide a URL to an image to add that image to the center of the wheel |                             |
| `entriesGroupName`               | Group name for entering users to be on the wheel                                  | `Prize Wheel Entries`       |
| `winningGroupName`               | Group name for users that are selected by the wheel                                                     | `Prize Wheel Winner`        |
| `sendAllPlatforms`               | Setting to False will send only to to current platform                            | `True`                      |
| `sendAsBot`                      | This determines if messages sent will be sent from the connected bot account      | `True`                      |
| `platforms`                      | Set which platforms to send messages to                                           | `twitch,youtube,trovo`      |
| `obsConnection`                  | OBS Connection ID to connect to. Connection ID list is zero-indexed               | `0`                         |
| `spinningWheelSceneName`         | Name of nested scene to add wheel to                                              | `[NS] Spinning Prize Wheel` |
| `spinningWheelSpinnerSourceName` | Name of browser source for the wheel spinner to use                               | `Wheel Spinner`             |
| `spinningWheelWinnerSourceName`  | Name of browser source for announcing the wheel winner                            | `Wheel Winner`              |

### Easy Install via Import Action (recommended)

- Make sure you have the [latest version of Source Copy](https://obsproject.com/forum/resources/source-copy.1261/) installed
- Configure settings in the `Prize Wheel 1. Settings` action, variable explained above
- Go to the `Prize Wheel 2. Import`, right-click the `Core > Test` trigger, and click `Test Trigger`

[wrap=warning]
If a scene is created, but no sources are created, then run the `Prize Wheel 2. Import` action a second time.
[/wrap]

### Manual Installation

1. Extract the zip's contents into a folder (usually a folder containing your streaming assets).

3. In OBS add a browser source, name it "Wheel Spinner"
    a. Tick `"Local file"` & navigate to the index.html file in the new "Wheel Spinner" folder.
    b. Set size to be `1920 x 1080`
    c. Tick both "Shutdown source when not visible" & "Refresh browser when scene becomes active"

4. In OBS add a browser source, name it "Wheel Winner"
    a. Leave "local file" unticked (leave the URL as it is, dont change it)
    b. Set size to be `1920 x 1080`
    c. Tick both "Shutdown source when not visible" & "Refresh browser when scene becomes active"

5. Go into the new folder named "Wheel Spinner" and then into the folder "Wheel Winner" then double-click the `index.html` file to open it in your default browser.

6. Go to the top address bar and copy the entire address, including the starting from the `"file:///.." to the ending "../index.html"`

7. In Streamer.bot go to the "Wheel Winner" action and double-click the Set OBS Browser Source URL sub-action
    a. Set the Scene and Source fields to point to the "Wheel Winner" source you just created for both of the Set Source Visibility sub-actions
    b. Paste the URL you just copied from the address bar in front of the `?name=%winner%` that is already there so it is all one string

8. In Streamer.bot go to the "Wheel Spinner" action and set the Scene and Source fields to point to the "Wheel Spinner" source you just created for both of the Set Source Visibility sub-actions

9. Enable the !spinw command in Streamer.bot Commands tab

10. If it is not running, start the Websocket Server and and tick "Auto Start". If you have changed the address port, you will need to change the script.js file to match (around line 31).
![image|690x277](upload://25wCgdGLVf4ouBaPh5rpPHX024e.png)

11. Type `!spinw` in chat to see it in action

## Updating

If you have already installed this extension, you can update by simply downloading the new zip under `Resources` back toward the top of this page and then overwriting the old files with the new by unzipping on top of them.

## Configuration
[wrap="info"]
Advanced configuration is done by editing the `script.js` file in your `"Wheel Spinner"` folder using any text editor (VS Code, Notepad++, Notepad, etc).
[/wrap]

- You can also change the colors for each section if you want by changing the HSL values (Google if you need to find the HSL of your colors) by editing the values on (or around) lines 41-48 of script.js file.

- You can change the center image by changing the image link on line (or around line) 52

1. Click the three dots and navigate to the names.txt file from the zip
3. Tick `Append to file` box
4. Enter `%userName%` in the text field (with a capital N)

## Contributors

### [Lyfesaver74](https://www.twitch.tv/lyfesaver74) & [Whipstickgostop](https://www.twitch.tv/whipstickgostop)
[wrap="info"]This extension was developed from a [Codepen](https://codepen.io/hexagoncircle/pen/bGqVyxm) by [Ryan Mulligan](https://ryanmulligan.dev/)[/wrap]

## Changelog

### New Features

- Add easy import using [Source Copy plugin (minimum version 0.2.3 required)](https://obsproject.com/forum/resources/source-copy.1261/)
- Add a [ticking sound](https://freesound.org/people/door15studio/sounds/244774/) while the wheel spins - credit to door15studio
- Add new option to use User Groups instead of a text file to manage entries
- Add chat command actions for managing text file and user group entries

### Updates

- Switched Websocket to use [Streamer.bot Client library](https://streamerbot.github.io/client/)
- Moved all configuration to [URL Parameters](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL#parameters)

<div data-theme-toc="true"> </div>