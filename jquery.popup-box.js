/**
 * jQuery popup boxes plugin
 * 
 * Requires jQuery and jQuery UI 
 */

(function ($) {
  $.extend({
    prompt: function(msg, defaultValue, options) {
      var dfd = new jQuery.Deferred();
      var promtDiv = $('<div />', {title: msg});
      var _ok = function() {
        dfd.resolve(promtDiv.find('input').val());
        promtDiv.remove();
      }
      var _close = function() {
        dfd.reject();
        promtDiv.remove();
      }
      var settings = $.extend({
        close: _close,
        buttons: {
          "OK": _ok,
          "Cancel": _close
        }
      }, $.popupDialog, options);
      promtDiv
        .append($('<input />', {type: "text", val: defaultValue || "", keypress: function(e) {if (e.which == 13) _ok()}}).focus())
        .appendTo('body')
        .dialog(settings)
        .find('input')
          .focus()
          .select();
      return dfd.promise();
    },
    confirm: function(msg, titleMsg, options) {
      var dfd = new jQuery.Deferred();
      var confirmDiv = $('<div />', {title: titleMsg || ""});
      var _resolveFunction = function(respoveMethod) {
        return function() {
          dfd[respoveMethod]();
          confirmDiv.remove();
        }
      };
      var settings = $.extend({
        close: _resolveFunction("reject"),
        buttons: {
          "OK": _resolveFunction("resolve"),
          "Cancel":  _resolveFunction("reject")
        }
      }, $.popupDialog, options);
      confirmDiv
        .append(msg)
        .appendTo('body')
        .dialog(settings);
      return dfd.promise();
    },
    alert: function(msg, titleMsg, options) {
      var dfd = new jQuery.Deferred();
      var alertDiv = $('<div />', {title: titleMsg || ""});
      var _resolveFunction = function(msg) {
        return function() {
          dfd.resolve(msg);
          alertDiv.remove();
        }
      };
      var settings = $.extend({
        close: _resolveFunction("Close"),
        buttons: {
          "OK": _resolveFunction("OK")
        }
      }, $.popupDialog, options);
      alertDiv
        .append(msg)
        .appendTo('body')
        .dialog(settings);
      return dfd.promise();
    },
    popupDialog: {
      modal: true,
      width: 350,
      height: 200
    }
  })
})(jQuery)