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
    'sap/ui/core/Control'
],
    function (jQuery, Control) {
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
         * @alias openui5.camera.Camera
         */
        var oCamera = Control.extend("project.camera.camera.Camera", {
            /**
             * Control API
             */
            metadata: {
                properties: {

                    /**
                     * Width of the preview window in pixels
                     */
                    "width": {
                        type: "string",
                        defaultValue: "640"
                    },

                    /**
                     * Height of the preview window in pixels
                     */
                    "height": {
                        type: "string",
                        defaultValue: "480"
                    },

                    /**
                     * Width of the video capture window in pixels
                     */
                    "videoWidth": {
                        type: "string",
                        defaultValue: "1280"
                    },

                    /**
                     * Height of the video capture window in pixels
                     */
                    "videoHeight": {
                        type: "string",
                        defaultValue: "960"
                    },

                    "buttonOnly": {
                        type: "boolean",
                        defaultValue: false
                    },

                    "enabled": {
                        type: "boolean",
                        defaultValue: true
                    }
                },
                events: {
                    /**
                     * Raised when the user clicks/taps the video preview.
                     * The event object contain a parameter called "image"
                     * which contains a base64 encoded png file. This is a
                     * string.
                     */
                    "snapshot": {},

                    "onChange": {}

                }
            },

            /**
             * Lifecycle hook to initialize the control
             */
            init: function () {
                var that = this;
                this._displayingVideo = false; // Is the control displaying video at the moment?
            },


            /**
             * Handler for when the user clicks the video preview.
             * Fires the Snapshot event with the image inside.
             **/
            _onUserClickedBtnCamera: function (oInputCamera) {
                oInputCamera.click();
            },


            /**
             * Takes a screenshot of the video element and returns its
             * data in PNG format.
             **/
            _takePicture: function (width, height) {
                var oCanvas = this._getCanvas();
                var oVideo = this._getVideo();
                var oImageData = null;
                var context = oCanvas.getContext('2d');
                if (width && height) {
                    context.drawImage(oVideo, 0, 0, width, height);
                    oImageData = oCanvas.toDataURL('image/png');
                }
                return oImageData;
            },


            _getButton: function () {
                return document.getElementById("__Button-Camera");
            },


            /**
             *
             */
            stopCamera: function () {
                this._displayingVideo = false;
                if (this._stream) {
                    this._stream.getVideoTracks().forEach(function (t) { t.stop(); });
                }
            },


            /**
             *
             */
            onAfterRendering: function () {
                var that = this;
                var oCameraBtn = this._getButton();
                var oInputCamera = document.getElementById("__Input-Camera");

                oInputCamera.addEventListener("change", function (oEvent) {
                    var selectedFile = oEvent.target.files[0];
                    var reader = new FileReader();

                    reader.onload = function (event) {
                        var url = event.target.result;

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
            }
        });
        return oCamera;
    });