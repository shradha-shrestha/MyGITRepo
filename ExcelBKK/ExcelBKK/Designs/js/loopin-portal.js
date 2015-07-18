$(document).ready(function () {
    $('a[name="selectCity"]').click(ChangePortalCity);
});

function ChangePortalCity() {
    var cityID = $(this).attr('ref');
    var param = { cityID: cityID };

    CallAJAX('/account/selectcity', param, null, function () {
        location.reload();
    });
}