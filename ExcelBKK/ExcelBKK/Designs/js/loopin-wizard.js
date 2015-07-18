$(document).ready(function () {
    $('#rootwizard').bootstrapWizard({
        onNext: function (tab, navigation, index) {
            if (index == 2) {
                // Make sure we entered the name
                if (!$('#selectShop').val()) {
                    alert('You must select Shop');
                    $('#selectShop').focus();
                    return false;
                }
                if (!$("#dealShortTitle").val()) {
                    alert('You must enter your deal short title');
                    $('#dealShortTitle').focus();
                    return false;
                }
                if (!$("#dealShortDescription").val()) {
                    alert('You must enter your deal short title');
                    $('#dealShortDescription').focus();
                    return false;
                }
                if (!$("#dealLongTitle").val()) {
                    alert('You must enter your deal short title');
                    $('#dealLongTitle').focus();
                    return false;
                }
                if (!$("#dealLongDescription").val()) {
                    alert('You must enter your deal short title');
                    $('#dealLongDescription').focus();
                    return false;
                }
                if (!$("#origPrice").val()) {
                    alert('You must enter your deal short title');
                    $('#origPrice').focus();
                    return false;
                }
                if (!$("#dealPrice").val()) {
                    alert('You must enter your deal short title');
                    $('#dealPrice').focus();
                    return false;
                }
                if (!$("#dealPrice").val()) {
                    alert('You must enter your deal short title');
                    $('#dealPrice').focus();
                    return false;
                }
                return true;
                GeneratePreview();
            }

            if (index == 4) {
                if (!$("#contactName").val()) {
                    alert('You must enter your deal short title');
                    $('#contactName').focus();
                    return false;
                }
                if (!$("#contactNumber").val()) {
                    alert('You must enter your deal short title');
                    $('#contactNumber').focus();
                    return false;
                }
                if (!$("#email").val()) {
                    alert('You must enter your deal short title');
                    $('#email').focus();
                    return false;
                }
                if (!$("#bank").val()) {
                    alert('You must enter your deal short title');
                    $('#bank').focus();
                    return false;
                }
                if (!$("#bankAccount").val()) {
                    alert('You must enter your deal short title');
                    $('#bankAccount').focus();
                    return false;
                }
                if (!$("#accountNumber").val()) {
                    alert('You must enter your deal short title');
                    $('#accountNumber').focus();
                    return false;
                }
                if (!$("#agreementChk").is(":checked")) {
                    alert("You must checked");
                    return false;
                }
            }

        }, onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#rootwizard').find('.bar').css({ width: $percent + '%' });

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $('#rootwizard').find('.pager .next').hide();
                $('#rootwizard').find('.pager .finish').show();
                $('#rootwizard').find('.pager .finish').removeClass('disabled');
            } else {
                $('#rootwizard').find('.pager .next').show();
                $('#rootwizard').find('.pager .finish').hide();
            }

        }, onTabClick: function (tab, navigation, index) {

            return false;
        }

    });
    $('#rootwizard .finish').click(function () {
        onFinishCallback();
    });
});



function onFinishCallback() {
        $('form').submit();
}
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