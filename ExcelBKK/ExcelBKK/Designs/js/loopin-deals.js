var initDate;

function text_counter(input_text, target) {
    var max = $(input_text).attr("maxlength");
    $(input_text).keydown(function () {
        var text = $(input_text).val();
        var current = text.length;
        $(target).html("Characters left: " + current + "/" + max);
    });

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    initDate = now;
    initDate.setMonth(initDate.getMonth() + 1);

    //$('#dp3').datepicker({
    //    format: 'mm-dd-yyyy',
    //    onRender: function (date) {
    //        return date.valueOf() < initDate.valueOf() ? 'disabled' : '';
    //    }
    //});

    //$('#dp3').datepicker('setValue', initDate);
}

text_counter("#dealShortTitle", "#dealShortTitleCount");
text_counter("#dealShortDescription", "#dealShortDescriptionCount");
text_counter("#dealLongTitle", "#dealLongTitleCount");
text_counter("#dealLongTitle", "#dealLongTitleCount");
text_counter("#dealLongDescription", "#dealLongDescriptionCount");


function CalculateDiscountPercentage() {
    var originalPrice = parseInt($('#origPrice').val());
    var discountPrice = parseInt($('#dealPrice').val());
    var discountPercentage = 0;
    var commissionPercentage = 30;

    if ($('#origPrice').val().length == 0)
        originalPrice = 0;

    if ($('#dealPrice').val().length == 0)
        discountPrice = 0;

    if ((originalPrice > 0) && (discountPrice > 0)) {
        var discountAmount = originalPrice - discountPrice;
        var calcPercentage = ((discountAmount / originalPrice * 100)).toFixed(2);
        if (calcPercentage > 100)
            calcPercentage = 100;

        discountPercentage = calcPercentage;
        if (discountPercentage <= 40) {
            commissionPercentage = 30;
        } else if ((discountPercentage > 40) && (discountPercentage <= 50)) {
            commissionPercentage = 20;
        } else if (discountPercentage > 50) {
            commissionPercentage = 10;
        }
    }

    if (discountPercentage % 1 == 0) {
        discountPercentage = parseInt(discountPercentage.toString().replace('.00', ''));
    }

    return discountPercentage;
}

function CalculateCommissionPercentage() {
    var originalPrice = parseInt($('#origPrice').val());
    var discountPrice = parseInt($('#dealPrice').val());
    var discountPercentage = 0;
    var commissionPercentage = 30;

    if ($('#origPrice').val().length == 0)
        originalPrice = 0;

    if ($('#dealPrice').val().length == 0)
        discountPrice = 0;

    if ((originalPrice > 0) && (discountPrice > 0)) {
        var discountAmount = originalPrice - discountPrice;
        var calcPercentage = ((discountAmount / originalPrice * 100)).toFixed(2);
        if (calcPercentage > 100)
            calcPercentage = 100;

        discountPercentage = calcPercentage;
        if (discountPercentage <= 40) {
            commissionPercentage = 30;
        } else if ((discountPercentage > 40) && (discountPercentage <= 50)) {
            commissionPercentage = 20;
        } else if (discountPercentage > 50) {
            commissionPercentage = 10;
        }
    }

    if (discountPercentage % 1 == 0) {
        discountPercentage = parseInt(discountPercentage.toString().replace('.00', ''));
    }

    return commissionPercentage;
}