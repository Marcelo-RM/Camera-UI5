/*
 * A simple UI5 control wrapping the HTML5 media API
 * allowing the library user to easily take Pictures in javascript
 * very easily. The control renders a Video preview element
 * (technically a video html tag). When clicked the image is grabbed
 * as a base64 encoded PNG. In the future would be nice to have the
 * format configurable.
 */
sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/Control',
    'sap/ui/core/IconPool'
],
    function (jQuery, Control, IconPool) {
        "use strict";

        /**
         * Constructor for a new Camera control.
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class
         *
         * @public
         * @alias project.camera.camera.Camera
         */
        var sNameSpace = Object.keys(window['sap-ui-config'].resourceroots)[0];
        var oCamera = Control.extend(sNameSpace + ".camera.Camera", {
            /**
             * Control API
             */
            metadata: {
                properties: {

                    /**
                     * Text to show in Button
                     */
                    "text": {
                        type: "string",
                        defaultValue: ""
                    },

                    /**
                     * Type of button, defines style
                     */
                    "type": {
                        type: "string",
                        defaultValue: ""
                    },

                    /**
                     * Icon for button
                     */
                    "icon": {
                        type: "sap.ui.core.URI",
                        group: "Appearance",
                        defaultValue: "sap-icon://camera"
                    },

                    /**
                     * Config if button is active
                     */
                    "enabled": {
                        type: "boolean",
                        defaultValue: true
                    }
                },
                events: {
                    /**
                     * Raised when the user clicks/taps the button.
                     * The event object contain a parameter called "image"
                     * which contains a base64 encoded png file. This is a
                     * string.
                     */
                    "onChange": {}

                }
            },

            /**
             * Lifecycle hook to initialize the control
             */
            init: function () {
                var that = this;
            },


            /**
             * Handler for when the user clicks the camera button.
             * Fires the onclick event with the image inside.
             **/
            _onUserClickedBtnCamera: function (oInputCamera) {
                oInputCamera.click();
            },

            _getButton: function () {
                return document.getElementById("__Button--Camera" + this);
            },

            onBeforeRendering: function () {
                //set icon for button
                var oIconPool = IconPool.getIconInfo(this.getIcon());
                this.icon = oIconPool ? oIconPool.content : '';
            },

            /**
             *
             */
            onAfterRendering: function () {
                var that = this;
                var oCameraBtn = this._getButton();
                var oInputCamera = document.getElementById("__Input-Camera" + this);

                oInputCamera.addEventListener("change", function (oEvent) {
                    var selectedFile = oEvent.target.files[0];
                    var reader = new FileReader();

                    reader.onload = function (event) {
                        var url = event.target.result;
                        url = that.resizedataURL(url);

                        that.fireOnChange({
                            image: url
                        });
                    };

                    reader.readAsDataURL(selectedFile);
                });

                // Attach a click handler to the video element
                if (oCameraBtn && !oCameraBtn.onclick) {
                    oCameraBtn.onclick = function () {
                        that._onUserClickedBtnCamera(oInputCamera);
                    };
                }
            },

            //RESIZE METHODS
            resizedataURL: function (oldUrl) {
                // Create an image element to receive oldUrl
                var img = document.createElement('img');

                // When the event "onload" is triggered we can resize the image.
                img.onload = function () {
                    // Create a canvas and get its context.
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    // Get the new dimensions.
                    var dimensions = this.getNewSize(img.width, img.height);
                    var newWidth = dimensions[0];
                    var newHeight = dimensions[1];

                    // Set the new dimensions.
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // Resize the image with the canvas method drawImage();
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    var dataURI = canvas.toDataURL();

                    // This is used to see diferences in size
                    console.info("Old size: " + this.bytesToSize(new Blob([oldUrl]).size));
                    console.info("New size: " + this.bytesToSize(new Blob([dataURI]).size));

                    // Fire the onChange Method from Camera Component
                    this.fireOnChange({
                        image: dataURI
                    });

                }.bind(this);

                // Load the image with the url
                img.src = oldUrl;

            },

            getNewSize: function (width, height) {
                return width <= 500 || height <= 500 ? [width, height] : this.getNewSize(width / 1.2, height / 1.2);
            },

            bytesToSize: function (bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
        });
        return oCamera;
    });