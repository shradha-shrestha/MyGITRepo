var isDealPriceInput = false;var isCommissionPriceInput = false;var isPreviewOnLoading = false;var isPreviewReady = true;$(document).ready(function () {    // Smart Wizard           $('#wizard').smartWizard({
        transitionEffect: 'slideleft',        onLeaveStep: leaveAStepCallback,        onFinish: onFinishCallback,        enableFinishButton: false,        keyNavigation: true,        // contentURL:"service.php?action=1"    });

    $('a[class="buttonNext"]').attr('id', 'aNextStep');
    $('a[class="buttonPrevious"]').attr('id', 'aPreviousStep');
    $('a[class="buttonFinish"]').attr('id', 'aFinishStep');

    function leaveAStepCallback(obj) {
        var step_num = obj.attr('rel');        var isValid = validateSteps(step_num);        var canGoing = true;        if (isValid && step_num == 2) {
            if (currentshopdata == null) {
                isPreviewReady = true;

                if ($.isFunction(GeneratePreview)) {
                    canGoing = true;
                    GeneratePreview();
                }
                else {
                    canGoing = true;
                }
            } else {
                canGoing = true;
                if (!isPreviewReady) {
                    GeneratePreview();
                } else {
                    canGoing = true;
                }
            }
        } else {
            isPreviewReady = false;
            canGoing = isValid;
        }        return canGoing;
    }    function onFinishCallback() {
        if (validateAllSteps()) {
            $('form').submit();
        }
    }
    function validateAllSteps() {
        isDealPriceInput = false;
        isCommissionPriceInput = false;
        var isStepValid = true;        if (validateStep2() == false) {
            isStepValid = false;            $('#wizard').smartWizard('setError', { stepnum: 2, iserror: true });
        } else {
            $('#wizard').smartWizard('setError', { stepnum: 2, iserror: false });
        }        if (validateStep4() == false) {
            isStepValid = false;            $('#wizard').smartWizard('setError', { stepnum: 4, iserror: true });
        } else {
            $('#wizard').smartWizard('setError', { stepnum: 4, iserror: false });
        }        if (!isStepValid) {            //$('#wizard').smartWizard('showMessage','Please correct the errors in the steps and continue');        } else {
            $('#txtDealDetail').val(CKEDITOR.instances.txtDealDetail.getData());
        }        return isStepValid;
    }    function validateSteps(step) {
        var isStepValid = true;        // validate step 2        if (step == 2) {
            if (validateStep2() == false) {
                isStepValid = false;                //$('#wizard').smartWizard('showMessage','Please correct the errors in step'+step+ ' and click next.');                $('#wizard').smartWizard('setError', { stepnum: step, iserror: true });
            } else {
                $('#wizard').smartWizard('setError', { stepnum: step, iserror: false });
            }
        }        if (step == 4) {
            if (validateStep4() == false) {
                isStepValid = false;                $('#wizard').smartWizard('setError', { stepnum: step, iserror: true });
            } else {
                $('#wizard').smartWizard('setError', { stepnum: step, iserror: false });
            }
        }        return isStepValid;
    }    function validateStep2() {
        var isValid = true;        var selectShop = $("#selectShopID").val();        if (selectShop == 0) {
            // alert("test");
            isValid = false;            $("#selectShop").addClass("focus-err");                      $("#selectShop").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // Validate Deal Short Title        var dst = $('#dealShortTitle').val();        if (!dst && dst.length <= 0) {
            isValid = false;            $("#dealShortTitle").addClass("focus-err");                     $("#dealShortTitle").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {            // Add more code        }        // validate Deal Short Description        var dsd = $('#dealShortDescription').val();        if (!dsd && dsd.length <= 0) {
            isValid = false;            $("#dealShortDescription").addClass("focus-err");                     $("#dealShortDescription").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {            //$('#msg_dealShortDescription').html('').hide();        }        // validate Deal Long  Title        var dlt = $('#dealLongTitle').val();        if (!dlt && dlt.length <= 0) {
            isValid = false;            $("#dealLongTitle").addClass("focus-err");                     $("#dealLongTitle").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {            // $('#msg_dealLongTitle').html('').hide();        }        // validate Deal Long  Title        var dld = $('#dealLongDescription').val();        if (!dld && dld.length <= 0) {
            isValid = false;            $("#dealLongDescription").addClass("focus-err");                     $("#dealLongDescription").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // validate Orig Price        var dld = $('#origPrice').val();        if (!dld && dld.length <= 0 || (dld <= 0)) {
            isValid = false;            $("#origPrice").addClass("focus-err");                     $("#origPrice").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
            isCommissionPriceInput = true;        }        // validate Deal Price        var dld = $('#dealPrice').val();        if (!dld && dld.length <= 0 || (dld <= 0)) {
            isValid = false;            $("#dealPrice").addClass("focus-err");            /*$('html, body').animate({
                scrollTop: $("#selectShop").eq(0).offset().top - 100
            }, 500);      */            $("#dealPrice").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
            isDealPriceInput = true;        }        // validate Percentage Price        if (isDealPriceInput && isCommissionPriceInput) {
            var dld = CalculateDiscountPercentage();            if (dld < 30) {
                isValid = false;                $("#dealPrice").addClass("focus-err");                              $("#dealPrice").change(function () {
                    $(this).removeClass("focus-err");                    $(this).addClass("focus-scc");
                });
            } else {
            }
        }                // validate Limited Amount        var isUnlimit = $('#IsUnlimited').attr('checked') != null;        var limitAmount = $('#LimitAmount').val();        if (!isUnlimit && (limitAmount <= 0 || limitAmount.toString().length == 0)) {
            isValid = false;            $("#LimitAmount").addClass("focus-err");                       $("#LimitAmount").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        }        //// validate Expiry Date        //var expireDate = new Date(Date.parse($('#ExpireDate').val()));        //if (expireDate < initDate) {
        //    isValid = false;        //    $("#ExpireDate").addClass("focus-err");        //    $('html, body').animate({
        //        scrollTop: $("#ExpireDate").eq(0).offset().top - 100
        //    }, 500);        //    $("#ExpireDate").change(function () {
        //        $(this).removeClass("focus-err");        //        $(this).addClass("focus-scc");
        //    });
        //}        //return isValid;
    }    function validateStep4() {
        var isValid = true;        // validate Contact  Name        var contactName = $('#contactName').val();        if (!contactName && contactName.length <= 0) {
            isValid = false;            $("#contactName").addClass("focus-err");            $("#contactName").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // validate Contact Number        var contactNumber = $('#contactNumber').val();        if (!contactNumber && contactNumber.length <= 0) {
            isValid = false;            $("#contactNumber").addClass("focus-err");            $('html, body').animate({
                scrollTop: $("#contactName").eq(0).offset().top - 100
            }, 500);            $("#contactNumber").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        //validate email        var email = $('#email').val();        if (email && email.length > 0) {
            if (!isValidEmailAddress(email)) {                // alert("Test");                isValid = false;                $('#msg_email').html('Email is invalid').show();                $("#email").addClass("focus-err");                $("#email").change(function () {
                    $(this).removeClass("focus-scc");                    $(this).addClass("focus-err");
                });                $('html, body').animate({
                    scrollTop: $("#contactName").eq(0).offset().top - 100
                }, 500);
            } else {
                $('#msg_email').html('').hide();
            }
        } else {
            isValid = false;            $("#email").addClass("focus-err");            $("#email").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        }        // validate bank        var bank = $('#bank').val();        if (!bank && bank.length <= 0) {
            isValid = false;            $("#bank").addClass("focus-err");            $('html, body').animate({
                scrollTop: $("#contactName").eq(0).offset().top - 100
            }, 500);            $("#bank").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // validate Bank Account        var bankAccount = $('#bankAccount').val();        if (!bank && bank.length <= 0) {
            isValid = false;            $("#bankAccount").addClass("focus-err");            $("#bankAccount").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // validate Account Number        var bankAccount = $('#accountNumber').val();        if (!bank && bank.length <= 0) {
            isValid = false;            $("#accountNumber").addClass("focus-err");            $("#accountNumber").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        // validate Agreement        var isAgree = $('#agreementChk').attr('checked') != null;        if (!isAgree) {
            isValid = false;            $("#agreementChk").addClass("focus-err");            $("#agreementChk").change(function () {
                $(this).removeClass("focus-err");                $(this).addClass("focus-scc");
            });
        } else {
        }        return isValid;
    }
});

function GeneratePreview() {
    BindDealData();
    if (currentshopdata != null) {
        isPreviewReady = true;
        BindShopData(currentshopdata);

        if (isPreviewReady)
            $('#aNextStep').click();
    }
    else {
        if (!isPreviewOnLoading) {
            isPreviewReady = false;
            isPreviewOnLoading = true;
            $('#aNextStep').attr('class', $('#aNextStep').attr('class') + ' buttonDisabled');
            $('#aPreviousStep').attr('class', $('#aPreviousStep').attr('class') + ' buttonDisabled');
            $('#aNextStep').text("Loading...");
            DisableShopSelector(true);

            var shopID = $("#selectShopID").val();
            var reqParam = { shopID: shopID };
            CallAJAX(getshopajax, reqParam, function (data) {
                if (data != null) {
                    currentshopdata = data;
                    BindShopData(data);

                    isPreviewReady = true;
                }
            }, function () {
                $('#aNextStep').attr('class', $('#aNextStep').attr('class').replace('buttonDisabled', ''));
                $('#aPreviousStep').attr('class', $('#aPreviousStep').attr('class').replace('buttonDisabled', ''));
                $('#aNextStep').text("Next");
                DisableShopSelector(false);
                isPreviewOnLoading = false;

                if (isPreviewReady)
                    $('#aNextStep').click();
            });
        }
    }
}

function BindDealData() {
    if ($('#IsShowOriginPrice').attr('checked') == null) {
        $('#txtOriginalLabel').hide();
        $('#txtOriginalPrice').hide();
    } else {
        $('#txtOriginalLabel').show();
        $('#txtOriginalPrice').show();
    }

    $('#txtDiscountPrice').html('฿' + $('#dealPrice').val());
    $('#txtOriginalPrice').html('฿' + $('#origPrice').val());

    if ($('#IsShowDiscountPercent').attr('checked') == null) {
        $('#txtSavingPercentageLabel').hide();
    } else {
        $('#txtSavingPercentageLabel').show();
    }

    $('#txtSavingPercentage').html(CalculateDiscountPercentage() + '%');

    if ($('#IsUnlimited').attr('checked') == null) {
        $('#divRemainingAmount').show();
    } else {
        $('#divRemainingAmount').hide();
    }

    $('#txtRemainAmount').html($('#LimitAmount').val());

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var expireDate = new Date(Date.parse($('#ExpireDate').val()));
    var diffDay = daydiff(now, expireDate);

    $('#txtRemainDay').html(diffDay + ' DAY');
    $('#txtDescription').html($('#dealShortDescription').val());

    $('#txtDirection').html($('textarea[name="shopDirection"]').val());
    $('#txtDealCondition').html(CKEDITOR.instances.txtDealDetail.getData());
}

function BindShopData(data) {
    if (data.Web != null && data.Web.length > 0) {
        $('#shopDetailWeb').show();
        $('#shopDetailWeb').text(data.WebDisplay);
        $('#shopDetailWeb').attr('href', data.Web);
    } else
        $('#shopDetailWeb').hide();

    if (data.Tel != null && data.Tel.length > 0) {
        $('#shopDetailTel').show();
        $('#shopDetailTel').html(data.Tel);
    }
    else
        $('#shopDetailTel').hide();

    if (data.Address != null && data.Address.length > 0) {
        $('#shopDetailAddress').show();
        $('#shopDetailAddress').html(data.Address);
    } else
        $('#shopDetailAddress').hide();

    if (data.ViewShopURL != null && data.ViewShopURL.length > 0) {
        $('#shopViewPage').show();
        $('#shopViewPage').attr('href', data.ViewShopURL);
    } else
        $('#shopViewPage').hide();

    if (data.ListServiceHour != null && data.ListServiceHour.length > 0) {
        var serviceHourTxt = '';

        for (var i = 0; i < data.ListServiceHour.length; i++) {
            serviceHourTxt = serviceHourTxt + data.ListServiceHour[i];
            if ((i + 1) < data.ListServiceHour.length) {
                serviceHourTxt + serviceHourTxt + ',';
            }
        }

        $('#shopDetailServiceHour').show();
        $('#shopDetailServiceHour').html(serviceHourTxt);
    } else
        $('#shopDetailServiceHour').hide();

    //if (data.ListPhoto.length > 0) {
    //    $('#main').show();
    //    $('#noPhoto').hide();

    //    var htmlSlider = $('#tpPhotoSlider').tmpl(data.ListPhoto);
    //    var htmlThumb = $('#tpPhotoThumb').tmpl(data.ListPhoto);

    //    $('#images').html(htmlSlider);
    //    $('#thumbs').html(htmlThumb);
    //} else if (data.ListPhotos.length == 1) {
    //    $('#main').hide();
    //    $('#noPhoto').show();

    //    var htmlPhoto = $('#tpSinglePhoto').tmpl(data.ListPhoto);
    //    $('#noPhoto').html(htmlPhoto);
    //} else {
    //    $('#main').show();
    //    $('#noPhoto').hide();

    //    var htmlPhoto = $('#tpNoPhoto').tmpl();
    //    $('#noPhoto').html(htmlPhoto);
    //}
}

function isValidEmailAddress() {
    return true;
}