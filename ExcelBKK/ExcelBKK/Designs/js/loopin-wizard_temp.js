﻿var isDealPriceInput = false;
        transitionEffect: 'slideleft',

    $('a[class="buttonNext"]').attr('id', 'aNextStep');
    $('a[class="buttonPrevious"]').attr('id', 'aPreviousStep');
    $('a[class="buttonFinish"]').attr('id', 'aFinishStep');

    function leaveAStepCallback(obj) {
        var step_num = obj.attr('rel');
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
        }
    }
        if (validateAllSteps()) {
            $('form').submit();
        }
    }
    function validateAllSteps() {
        isDealPriceInput = false;
        isCommissionPriceInput = false;
        var isStepValid = true;
            isStepValid = false;
        } else {

        }
            isStepValid = false;
        } else {
            $('#wizard').smartWizard('setError', { stepnum: 4, iserror: false });
        }
            $('#txtDealDetail').val(CKEDITOR.instances.txtDealDetail.getData());
        }
    }
        var isStepValid = true;
            if (validateStep2() == false) {
                isStepValid = false;
            } else {
                $('#wizard').smartWizard('setError', { stepnum: step, iserror: false });
            }
        }
            if (validateStep4() == false) {
                isStepValid = false;


            }
        }
    }
        var isValid = true;
            // alert("test");
            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {
            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {
            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {
            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {
            isCommissionPriceInput = true;
            isValid = false;
                scrollTop: $("#selectShop").eq(0).offset().top - 100
            }, 500);      */
                $(this).removeClass("focus-err");
            });
        } else {
            isDealPriceInput = true;
            var dld = CalculateDiscountPercentage();
                isValid = false;
                    $(this).removeClass("focus-err");
                });
            } else {

        }
            isValid = false;
                $(this).removeClass("focus-err");
            });
        }
        //    isValid = false;
        //        scrollTop: $("#ExpireDate").eq(0).offset().top - 100
        //    }, 500);
        //        $(this).removeClass("focus-err");
        //    });
        //}
    }
        var isValid = true;
            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                scrollTop: $("#contactName").eq(0).offset().top - 100
            }, 500);
                $(this).removeClass("focus-err");
            });
        } else {

            if (!isValidEmailAddress(email)) {
                    $(this).removeClass("focus-scc");
                });
                    scrollTop: $("#contactName").eq(0).offset().top - 100
                }, 500);
            } else {
                $('#msg_email').html('').hide();
            }
        } else {
            isValid = false;
                $(this).removeClass("focus-err");
            });
        }
            isValid = false;
                scrollTop: $("#contactName").eq(0).offset().top - 100
            }, 500);
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

            isValid = false;
                $(this).removeClass("focus-err");
            });
        } else {

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