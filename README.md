#Image Caption Generator

This repository contains the code for the chrome extension "Image Caption Generator" and its backend.

##Introduction

The​ ​application​ ​is​ ​basically​ ​a​ ​functional​ ​Google​ ​Chrome​ ​Extension​ ​that generates​ ​a​ ​caption​ ​for​ ​an​ ​image​ ​which​ ​describes​ ​what​ ​is​ ​contained​ ​in​ ​the image.​ ​The​ ​image​ ​captioning​ ​is​ ​done​ ​by​ ​a​ ​deep​ ​learning​ ​network​ ​which​ ​runs​ ​on a​ ​cloud​ ​server (Heroku).​ ​The​ ​caption​ ​generated​ ​is​ ​converted​ ​into​ ​speech​ ​by JavaScript’s​ ​Web​ ​Speech​ ​AP (SpeechSynthesisUtterance​ ​API).

##Installation

1. Open Google Chrome and go to Extensions (under More Tools)
2. Select Load unpacked extension.
3. Select the folder image-caption Extension.

The extension is now installed.

##Usage

1. Right-click on an image for which you want to view the description.
2. Select Get Image Description from the menu.
3. The description will be displayed on an overlay. The text is also converted to audio.
4. Press escape to exit the overlay.

##Limitations

It can't​ ​be​ ​used​ ​for​ ​protected​ ​images.​ ​Example-​ ​It​ ​can’t​ ​be​ ​used​ ​on​ ​the images​ ​in​ ​facebook​ ​as​ ​they​ ​are​ ​protected​  ones.

Description for some pictures may not be accurate.

