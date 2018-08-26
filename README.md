# Image Caption Generator

This repository contains the code for the chrome extension "Image Caption Generator" and its backend.

The model used in the backend is described in the CVPR2015 paper ["Show and tell: A neural image caption generator"](https://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Vinyals_Show_and_Tell_2015_CVPR_paper.pdf).

## Introduction

The​ ​application​ ​is​ ​basically​ ​a​ ​functional​ ​Google​ ​Chrome​ ​Extension​ ​that generates​ ​a​ ​caption​ ​for​ ​an​ ​image​ ​which​ ​describes​ ​what​ ​is​ ​contained​ ​in​ ​the image.​ ​The​ ​image​ ​captioning​ ​is​ ​done​ ​by​ ​a​ ​deep​ ​learning​ ​network​ ​which​ ​runs​ ​on a​ ​cloud​ ​server (Heroku).​ ​The​ ​caption​ ​generated​ ​is​ ​converted​ ​into​ ​speech​ ​by JavaScript’s​ ​Web​ ​Speech​ ​AP (SpeechSynthesisUtterance​ ​API).

## Installation

1. Open Google Chrome and go to Extensions (under More Tools)
2. Select "Load unpacked extension".
3. Select the folder "image-caption Extension" which is inside the directory "Code Of Google Chrome Extension".

The extension is now installed.

If you want to run the backend in local system, then the model has to be trained first. The trained model can be downloaded from this [link](https://drive.google.com/open?id=17hjhnGVt5pHuH_s6__-N8FC_Qx0SaQ01) . Once it is downloaded, extract the files in the directory *Code Running In Heroku Cloud Server/image-caption/saved_models*.

## Usage

1. Right-click on an image for which you want to view the description.
2. Select "Get Image Description" from the menu.
3. The description will be displayed on an overlay. The text is also converted to audio.
4. Press escape to exit the overlay.

## Screenshots

1. Options shown when an image is right-clicked 

![Options shown when an image is right-clicked](https://i.imgur.com/yBnGDRs.png)

2. Overlay displayed after selecting the "Get Image Description" option

![Overlay displayed after selecting the "Get Image Description" option](https://i.imgur.com/NXYceiv.png)

3. Response from the cloud server when there is no error

![Response from the cloud server when there is no error](https://i.imgur.com/J6aoOvj.png)

4. Response from the cloud server when there is an error

![Response from the cloud server when there is an error](https://i.imgur.com/jhumqWp.png)

## Limitations

* It can't​ ​be​ ​used​ ​for​ ​protected​ ​images.​ ​Example-​ ​It​ ​can’t​ ​be​ ​used​ ​on​ ​the images​ ​in​ ​facebook​ ​as​ ​they​ ​are​ ​protected​  ones.
* Description for some pictures may not be accurate.

