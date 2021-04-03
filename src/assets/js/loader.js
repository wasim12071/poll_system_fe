var mApp = function () {
    return {
        blockPage: function () {
            $('#loader-screen').show();
        },
        unblockPage: () => {
            $('#loader-screen').fadeOut(700);
        },
        showLoader: (element) => {
            $(element).encapsulateOverlay({
                iconClass: 'fa fa-spinner fa-spin fa-2x'
            }).encapsulateOverlay('show')
        },
        hideLoader: (element) => {
            $(element).encapsulateOverlay('hide');
        }
    }
}();
!function ($) {
    "use strict";
    var defaults = {
        'displayIcon': true,
        'iconColor': 'text-main',
        'iconClass': 'fa fa-refresh fa-spin fa-2x',
        'title': '',
        'desc': ''
    };
    var uID = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var methods = {
        'show': function (el) {
            var target = $(el),
                ovId = 'encapsulate-overlay-' + uID() + uID() + "-" + uID(),
                panelOv = $('<div id="' + ovId + '" class="panel-overlay"></div>');

            el.prop('disabled', true).data('encapsulateOverlay', ovId);
            target.addClass('panel-overlay-wrap');
            panelOv.appendTo(target).html(el.data('overlayTemplate'));
            return null;
        },
        'hide': function (el) {
            var target = $(el);
            var boxLoad = $('#' + el.data('encapsulateOverlay'));

            if (boxLoad.length) {
                el.prop('disabled', false);
                target.removeClass('panel-overlay-wrap');
                boxLoad.hide().remove();
            }
            return null;
        }
    };
    var loadBox = function (el, options) {
        if (el.data('overlayTemplate')) {
            return null;
        }
        var opt = $.extend({}, defaults, options),
            icon = `
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
        el.data('overlayTemplate', '<div class="panel-overlay-content pad-all unselectable">' + icon + '<h4 class="panel-overlay-title">' + opt.title + '</h4><p>' + opt.desc + '</p></div>');
        return null;
    };

    $.fn.encapsulateOverlay = function (method) {
        if (methods[method]) {
            return methods[method](this);
        } else if (typeof method === 'object' || !method) {
            return this.each(function () {
                loadBox($(this), method);
            });
        }
        return null;
    };

}(jQuery);
