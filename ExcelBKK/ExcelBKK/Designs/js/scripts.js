var lastHilightObj = null;
var _ajaxReq = false;
var loaded = false;
var _isUserLeave = false;

$(document).ready(function () {
    $('#dialog').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    });

    $(window).bind('beforeunload', function () {
        _isUserLeave = true;
    });

    BindTextHilightEvent($('#place'));
    BindTextHilightEvent($('#address'));
});

$.fn.outerHTML = function () {

    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (
      function (el) {
          var div = document.createElement('div');
          div.appendChild(el.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
      })(this[0]));
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.textboxNumeric = function () {

    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;


            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers   
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // Backspace and Tab and Enter
               key == 8 || key == 9 || key == 13 ||
                // Home and End
               key == 35 || key == 36 ||
                // left and right arrows
               key == 37 || key == 39 ||
                // Del and Ins
               key == 46 || key == 45)
                return true;

            return false;
        });
    });
}

$.fn.textboxCurrency = function () {

    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers   
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
               key == 190 || key == 188 || key == 109 || key == 110 ||
                // Backspace and Tab and Enter
               key == 8 || key == 9 || key == 13 ||
                // Home and End
               key == 35 || key == 36 ||
                // left and right arrows
               key == 37 || key == 39 ||
                // Del and Ins
               key == 46 || key == 45)
                return true;

            return false;
        });
    });
}

function aggregateArray (char, array) {
    var res = '';
    if ((array != null) && (array instanceof Array) && (array.length > 0)) {
        for (var i = 0; i < array.length; i++) {
            res = res + array[i];
            if ((i + 1) < array.length)
                res = res + ",";
        }
    }
    return res;
}

function daydiff(first, second) {
    return (second - first) / (1000 * 60 * 60 * 24)
}

function getBase64Image(file, previewID) {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#' + previewID).html('<img src="' + e.target.result + '" style="max-height: 100px;" />');
    }

    reader.readAsDataURL(file);
}

function getFileSize(elemID) {
    var imgSizemBytes = document.getElementById(elemID).files[0].size;

    //if ($.browser.msie) {
    //    if (window.ActiveXObject) {
    //        var fso = new ActiveXObject("Scripting.FileSystemObject");
    //        var filepath = document.getElementById(elemID).value;
    //        var thefile = fso.getFile(filepath);
    //        imgSizemBytes = thefile.size;
    //    } else {
    //        imgSizemBytes = document.getElementById(elemID).files[0].size;
    //    }
    //} else {
    //    var fileInput = $("#" + elemID)[0];
    //    imgSizemBytes = fileInput.files[0].fileSize; // Size returned in bytes.
    //}

    if (imgSizemBytes > 0)
        imgSizemBytes = (parseInt(imgSizemBytes) / 1024 / 1024).toFixed(2);

    return imgSizemBytes;
}

//=========================================== AJAX
function CallAJAX(url, objParam, afterFunc, requiredFunc) {
    //Modify Last  By Tum
    //AJAXStartLoading();
    //$(".loading").show();
    //if (loaded) return;
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(objParam, null, 2),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (result) {
            AJAX_Success(result, afterFunc, requiredFunc);
        },
        complete: function (result) {
            $('.loading').hide();
        },
        error: function (result) {
            // Take out for not make any error dialog.
            //AJAX_Error(result, requiredFunc);
        }
    });
    
}

function AJAX_Success(ajaxRes, afterFunc, requiredFunc) {
    AJAXStopLoading();

    if (ajaxRes.IsError) {
        OpenErrorDialog("Error", ajaxRes.ErrorMessage, function () {
            if ((afterFunc != null) && (typeof (afterFunc) == "function")) {
                afterFunc(ajaxRes.Result);
            }

            if ((requiredFunc != null) && (typeof (requiredFunc) == "function")) {
                requiredFunc();
            }
        });
    } else {
        if ((afterFunc != null) && (typeof (afterFunc) == "function")) {
            afterFunc(ajaxRes.Result);
        }

        if ((requiredFunc != null) && (typeof (requiredFunc) == "function")) {
            requiredFunc();
        }
    }
}

function AJAX_Error(ajaxRes, requiredFunc) {
    AJAXStopLoading();

    if (!_isUserLeave) {
        if (ajaxRes.ErrorMessage != null) {
            OpenErrorDialog("Error", ajaxRes.ErrorMessage, function () {
                if ((requiredFunc != null) && (typeof (requiredFunc) == "function")) {
                    requiredFunc();
                }
            });
        } else {
            OpenErrorDialog(null, 'Internal error occurred.<br />Please contact administrator.', function () {
                if ((requiredFunc != null) && (typeof (requiredFunc) == "function")) {
                    requiredFunc();
                }
            });
        }
    }
}

function AJAXStartLoading() {
    _ajaxReq = true;
}

function AJAXStopLoading() {
    _ajaxReq = false;
}
//===========================================

//=========================================== MISC
function BindTextHilightEvent(obj) {
    $(obj).focus(function () {
        $(obj).select();
    });

    $(obj).mouseup(function () {
        if (lastHilightObj != obj) {
            lastHilightObj = obj;
            return false;
        }
        else {
            return true;
        }
    });
}

function resetForm(id) {
    $('#' + id).each(function () {
        this.reset();
    });
}

function ValidateFileName(filename) {
    var isValid = false;
    var extension = filename.replace(/^.*\./, '');

    if (extension == filename) {
        extension = '';
    } else {
        extension = extension.toLowerCase();
    }

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
            isValid = true;
    }

    return isValid;
}
//===========================================

//=========================================== Dialog Box
function OpenInfoDialog(dialogTitle, dialogMsg, closeFunction) {
    if (dialogTitle == null) {
        dialogTitle = "Message";
    }

    $('#dlgHeader').html(dialogTitle);
    $('#dlgBody').html(dialogMsg);

    $('#btnDlgOK').show();
    $('#btnDlgYes').hide();
    $('#btnDlgNo').hide();
    $('#btnDlgConfirm').hide();
    $('#btnDlgCancel').hide();

    $('#dialog').on('hidden', closeFunction);

    $('#dialog').modal('show');
}

function OpenErrorDialog(dialogTitle, dialogMsg, closeFunction) {
    if (dialogTitle == null) {
        dialogTitle = "Error";
    }

    $('#dlgHeader').html(dialogTitle);
    $('#dlgBody').html(dialogMsg);

    $('#btnDlgOK').show();
    $('#btnDlgYes').hide();
    $('#btnDlgNo').hide();
    $('#btnDlgConfirm').hide();
    $('#btnDlgCancel').hide();

    $('#dialog').on('hidden', closeFunction);

    $('#dialog').modal('show');
}

function OpenYesNoDialog(dialogTitle, dialogMsg, yesFunction, noFunction, closeFunction) {
    if (dialogTitle == null) {
        dialogTitle = "Are you sure ?";
    }

    $('#dlgHeader').html(dialogTitle);
    $('#dlgBody').html(dialogMsg);

    $('#btnDlgOK').hide();
    $('#btnDlgYes').show();
    $('#btnDlgNo').show();
    $('#btnDlgConfirm').hide();
    $('#btnDlgCancel').hide();

    $('#btnDlgYes').click(yesFunction);
    $('#btnDlgNo').click(noFunction);
    $('#dialog').on('hidden', closeFunction);

    $('#dialog').modal('show');
}

function OpenConfirmDialog(dialogTitle, dialogMsg, confirmFunction, closeFunction) {
    if (dialogTitle == null) {
        dialogTitle = "Message";
    }

    $('#dlgHeader').html(dialogTitle);
    $('#dlgBody').html(dialogMsg);

    $('#btnDlgOK').hide();
    $('#btnDlgYes').hide();
    $('#btnDlgNo').hide();
    $('#btnDlgConfirm').show();
    $('#btnDlgCancel').show();

    $('#btnDlgConfirm').click(confirmFunction);
    $('#dialog').on('hidden', closeFunction);

    $('#dialog').modal('show');
}
//===========================================