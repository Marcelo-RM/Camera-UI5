# Camera-UI5

An UI5 control that uses the browser's camera API to capture images taken over the phone. It is also possible to select images from the gallery and different directories.

## Demo
Check a demo app [here](https://marcelo-rm.github.io/Camera-UI5/webapp/)

## Usage
To use it you must create a folder called camera inside the webapp folder of your project, and add the Camera.js and CameraRender.js inside camera folder.

In the view you want to use the control, insert the following:
``` xml
<mvc:View
	xmlns:c="project.namespace.camera"
	xmlns:mvc="sap.ui.core.mvc"
...

<c:Camera icon="sap-icon://add-photo" onChange=".selectImage" class="sapUiSmallMarginBegin" type="Accept" />
```

In the view controller, create the event that will be triggered when selecting / taking the photo. To capture the return of the event it is necessary to take the parameter image of the event:

``` javascript
selectImage: function (oEvent) {
    var sImage = oEvent.getParameter("image");
}
```

The Image parameter return a base64String of image.

## Contributing
Contributions are welcome. 
When developing a new feature, use a feature branch.
Feel free to update the contributors section.

## Contributors
Marcelo Montalvão - marcelordrgs98@gmail.com - @mr_montalvao - [web site](https://marcelo-rm.github.io/portifolio)
