# AuthenticView Extension

This repository contains the code for the chrome extension "AuthenticView", which allows users to right-click on images to see visually if they have been manipulated with photoshop. This helps promote better body positivity and self-image.

The model used in the backend is described in the paper ["Detecting Photoshopped Faces by Scripting Photoshop"](https://arxiv.org/abs/1906.05856) by Wang et al.

## Introduction

## Installation

1. Open Google Chrome and go to Extensions (under More Tools)
2. Select "Load unpacked extension".
3. Select the folder "manipulation_detection_extension" which is in the 'extension' directory.

The extension is now installed.

## Usage

1. Right-click on an image you want to check is manipulated.
2. Select "Highlight Likely Manipulation" from the context menu.
3. After a few seconds, a heatmap will be overlayed on top of the image showing where the image is likely manipulated. Red areas represent areas that are very likely to have been touched up whereas blue are areas of less confidence.
4. Press escape to exit the overlay.
