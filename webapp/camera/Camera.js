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
        var oCamera = Control.extend("project.camera.camera.Camera", {
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