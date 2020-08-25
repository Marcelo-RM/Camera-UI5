sap.ui.define([],
    function () {
        "use strict";

        /**
         * @namespace openui5.camera
         */
        var CameraRenderer = {};

        /**
         * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
         *
         * @param {sap.ui.core.RenderManager} oRm RenderManager object
         * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
         */
        CameraRenderer.render = function (oRm, oControl) {

            var sText = oControl.getProperty('text'),
                sInputImage = '<input style="display:none" type="file" id="__Input-Camera' + oControl + '" accept="image/*">';

            //Open button tag
            oRm.openStart('button', '__Button--Camera' + oControl);
            oRm.class('sapMBtnBase');
            oRm.class('sapMBtn');
            oRm.openEnd();

            //Open Div Tag
            oRm.openStart('span');
            oRm.class('sapMBtnInner');
            oRm.class('sapMBtnHoverable');
            oRm.class('sapMFocusable');

            //Classes para quando exibir texto
            if (sText) {
                oRm.class('sapMBtnIconLast');
                oRm.class('sapMBtnText');
            } else {
                oRm.class('sapMBtnIconFirst');
            }

            //Classes para tratar o tipo
            switch (oControl.getProperty('type')) {
                case "Accept": oRm.class('sapMBtnAccept'); break;
                case "Success": oRm.class('sapMBtnSuccess'); break;
                case "Reject": oRm.class('sapMBtnReject'); break;
                case "Negative": oRm.class('sapMBtnNegative'); break;
                case "Attention": oRm.class('sapMBtnAttention'); break;
                case "Critical": oRm.class('sapMBtnCritical'); break;
                case "Ghost": oRm.class('sapMBtnGhost'); break;
                case "Emphasized": oRm.class('sapMBtnEmphasized'); break;
                default: oRm.class('sapMBtnDefault'); break;
            }
            oRm.openEnd();

            oRm.write(sInputImage);

            if (sText) {
                oRm.write('<span class="sapMBtnContent">' + sText + '</span>');
            }

            //Open span icon image tag
            oRm.openStart('span', '__Icon-camera');
            oRm.attr('role', 'presentation');
            oRm.attr('aria-hidden', true);
            oRm.attr('data-sap-ui-icon-content', '');
            oRm.class('sapUiIcon');
            oRm.class('sapUiIconMirrorInRTL');
            oRm.class('sapMBtnCustomIcon');
            oRm.class('sapMBtnIcon');
            if (sText) {
                oRm.class('sapMBtnIconRight');
            } else {
                oRm.class('sapMBtnIconLeft');
            }
            oRm.style('font-family', 'SAP-icons');
            oRm.openEnd();
            oRm.close('span');

            //Close Div tag
            oRm.close('span');

            //Close Button tag
            oRm.close('button');
        };

        return CameraRenderer;

    }, /* bExport= */ true);