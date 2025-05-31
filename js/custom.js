/*@@@ Created By Ajeet Kanojia*/

"use strict";

/*@@@Select form Preference*/
$('#selectKundli button').on('click',function(){

    $(this).addClass('button-gradient').removeClass('button-clear').siblings().addClass('button-clear');

    var target = $(this).attr('data-attr');

    $('#'+target).fadeIn().siblings('.form-wrapper .row').hide();

});



/*@@@ Get Geo Details*/
//Auto select api by google

//google.maps.event.addDomListener(window, 'load', function () {
//
//    function eventListenerForMaps(domId, latId, longId, tzone)
//    {
//        var places = new google.maps.places.Autocomplete(document.getElementById(domId));
//
//        google.maps.event.addListener(places, 'place_changed', function () {
//
//            var place = places.getPlace(),
//                timestamp = new Date(),
//                tmsp = Math.floor(Date.now() / 1000),
//                latitude = place.geometry.location.lat(),
//                longitude = place.geometry.location.lng(),
//                country = place.formatted_address,
//                timezone = null;
//
//            var googleKey = "Your Google timezone key";
//
//            if(country.search('India')<0)
//            {
//                $.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+','+longitude+"&timestamp="+tmsp+"&key="+googleKey, function(data) {
//
//                    timezone = (data.rawOffset)/3600;
//                    $(tzone).val(timezone);
//                });
//            }
//            else
//            {
//                timezone = 5.5;
//                $(tzone).val(timezone);
//            }
//
//            $(latId).val(latitude);
//            $(longId).val(longitude);
//
//        });
//    }
//
//    $('#hr-place').on('keyup',function()
//    {
//        eventListenerForMaps('hr-place','#hr-lat','#hr-lon','#hr-tzone');
//    });
//    $('#pn-place').on('keyup',function()
//    {
//        eventListenerForMaps('pn-place','#pn-lat','#pn-lon','#pn-tzone');
//    });
//
//    $('#m-place').on('keyup',function()
//    {
//        eventListenerForMaps('m-place','#m-lat','#m-lon','#m-tzone');
//    });
//
//    $('#f-place').on('keyup',function()
//    {
//        eventListenerForMaps('f-place','#f-lat','#f-lon','#f-tzone');
//    });
//
//});


function validateHoroscopeForm()
{
    var name = $("#hr-name").val(),
        dob = $("#hr-dob").val(),
        tob = $("#hr-tob").val(),
        tzone = $("#hr-tzone").val(),
        lat = $("#hr-lat").val(),
        lon = $("#hr-lon").val();

    if(name == '' || dob == '' || tob == '' || tzone == '' || lat == '' || lon == '')
    {
        return {status:false};
    }
    else
    {
        var date = dob.split('/'),
            time = tob.split(':');

        return {status: true ,isFor:'horoscope',name : name, day: date[0],month:date[1],year:date[2], hour: time[0],minute:time[1],timezone:tzone,latitude:lat,longitude:lon};
    }
}

function validatePanchangForm()
{
    var dob = $("#pn-dob").val(),
        tzone = $("#pn-tzone").val(),
        lat = $("#pn-lat").val(),
        lon = $("#pn-lon").val();

    if(dob == '' || tzone == '' || lat == '' || lon == '')
    {
        return {status:false};
    }
    else
    {
        var date = dob.split('/');

        return {status: true ,isFor:'panchang', day: date[0],month:date[1],year:date[2],timezone:tzone,latitude:lat,longitude:lon};
    }
}

function validateMatchingForm()
{
    var name = $("#m-name").val(),
        dob = $("#m-dob").val(),
        tob = $("#m-tob").val(),
        tzone = $("#m-tzone").val(),
        lat = $("#m-lat").val(),
        lon = $("#m-lon").val(),
        f_name = $("#f-name").val(),
        f_dob = $("#f-dob").val(),
        f_tob = $("#f-tob").val(),
        f_tzone = $("#f-tzone").val(),
        f_lat = $("#f-lat").val(),
        f_lon = $("#f-lon").val();

    if(name == '' || dob == '' || tob == '' || tzone == '' || lat == '' || lon == '' || f_name == '' || f_dob == '' || f_tob == '' || f_tzone == '' || f_lat == '' || f_lon == '')
    {
        return {status:false};
    }
    else
    {
        var date = dob.split('/'),
            time = tob.split(':'),
            f_date = f_dob.split('/'),
            f_time = f_tob.split(':');

        return {
            status: true ,isFor:'matching',
            name : name, day: date[0],month:date[1],year:date[2], hour:time[0],minute:time[1],timezone:tzone,latitude:lat,longitude:lon,
            f_name : f_name, f_day: f_date[0],f_month:f_date[1],f_year:f_date[2], f_hour:f_time[0],f_minute:f_time[1],f_timezone:tzone,f_latitude:lat,f_longitude:f_lon
        };
    }
}

//@@@Start Generating Horoscope
$("#generateHoroscope").on('click', function(event){

    $("#horoscopeFormError").fadeOut(100);

    event.preventDefault();
    var response = validateHoroscopeForm();

    if(response.status)
    {
        //alert(JSON.stringify(response));
        var res = $.ajax({
            url: "http://localhost/api-php-demo/php/setRequestData.php",
            method: "POST",
            dataType: "json",
            data:(response)
        });

        res.then(function(a) {
            $('#horoscopeForm').submit();

        }, function(a) {
            $("#horoscopeFormError").html('Some Error Occluded Please Try Again Later.').fadeIn(200);
        });
    }
    else
    {
        $("#horoscopeFormError").fadeIn(200);
    }

});

//@@@ Start match Making
$('#startMatching').on('click',function(event){

    $("#matchingFormError").fadeOut(100);

    event.preventDefault();
    var response = validateMatchingForm();

    if(response.status)
    {
        //alert(JSON.stringify(response));
        var res = $.ajax({
            url: "http://localhost/api-php-demo/php/setRequestData.php",
            method: "POST",
            dataType: "json",
            data:(response)
        });

        res.then(function(a) {
            $('#matchingForm').submit();

        }, function(a) {
            $("#matchingFormError").html('Some Error Occluded Please Try Again Later.').fadeIn(200);
        });
    }
    else
    {
        $("#matchingFormError").fadeIn(200);
    }
});

//@@@ Start Panchang
$('#generatePanchang').on('click',function(event){

    $("#panchangFormError").fadeOut(100);

    event.preventDefault();
    var response = validatePanchangForm();

    if(response.status)
    {
        //alert(JSON.stringify(response));
        var res = $.ajax({
            url: "http://localhost/api-php-demo/php/setRequestData.php",
            method: "POST",
            dataType: "json",
            data:(response)
        });

        res.then(function(a) {
            $('#panchangForm').submit();

        }, function(a) {
            $("#panchangFormError").html('Some Error Occluded Please Try Again Later.').fadeIn(200);
        });
    }
    else
    {
        $("#panchangFormError").fadeIn(200);
    }
});


var planet_abbr = {

    'SUN' : 'Su',
    'MOON' : 'Mo',
    'MARS' : 'Ma',
    'MERCURY' :'Me',
    'JUPITER' : 'Ju',
    'VENUS' : 'Ve',
    'SATURN' : 'Sa',
    'RAHU' : 'Ra',
    'KETU' : 'Ke',
    'URANUS' : 'Ur',
    'NEPTUNE' : 'Ne',
    'PLUTO' : 'pl',
    "सूर्य":"सूर्य","चन्द्र":"चन्द्र","मंगल":"मंगल","बुध":"बुध","बुध ":"बुध","गुरु":"गुरु","शुक्र":"शुक्र","शनि":"शनि","राहु":"राहु","केतु":"केतु","प्लूटो;":"प्लूटो","यूरेनस":"यूरेनस","नेप्चून":"नेप्चून"

};

function getSignArray(data)
{
    var resp = [];

    for (var i =0; i<data.length; i++)
    {
        resp.push(data[i].sign);
    }

    return resp;
}

function getSignPlanetArray(data)
{

    var resp = ['','','','','','','','','','','',''];

    for (var i = 0; i< data.length; i++)
    {
        for (var j = 0; j<data[i]['planet'].length; j++)
        {
            resp[data[i]['sign']-1]+= (planet_abbr[data[i]['planet'][j]]) +' ';
        }

    }

    return resp;
}

function getPlanetArray(data)
{
    var planet_abbr = {

    'SUN' : 'Su',
    'MOON' : 'Mo',
    'MARS' : 'Ma',
    'MERCURY' :'Me',
    'JUPITER' : 'Ju',
    'VENUS' : 'Ve',
    'SATURN' : 'Sa',
    'RAHU' : 'Ra',
    'KETU' : 'Ke',
    'URANUS' : 'Ur',
    'NEPTUNE' : 'Ne',
    'PLUTO' : 'pl',
    "सूर्य":"सूर्य","चन्द्र":"चन्द्र","मंगल":"मंगल","बुध":"बुध","बुध ":"बुध","गुरु":"गुरु","शुक्र":"शुक्र","शनि":"शनि","राहु":"राहु","केतु":"केतु","प्लूटो;":"प्लूटो","यूरेनस":"यूरेनस","नेप्चून":"नेप्चून"
    };
    console.log(planet_abbr);
    var resp = ['','','','','','','','','','','',''];

    for (var i =0; i<data.length; i++)
    {
        for (var j = 0; j<data[i]['planet'].length;j++)
        {
            resp[i]+= (planet_abbr[data[i]['planet'][j]]) +' ';
        }
    }

    return resp;
}
