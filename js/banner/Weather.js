/// <reference path="../Scripts/jquery-2.0.3.min.js" />


function onObjectClick(evt) {

    $(evt.target.parentNode).children('div').toggle(300);
  //  console.log(evt.target.parentNode);

}
function render(o) { 
        var s = '';
        for (var a in o) {
            if (typeof o[a] === 'object') {
                s += '<div class="lobject package" style="display:none" ><h3>' + a + '</h3>';
                s += render(o[a])+'</div>';
            } else {
                s += '<div id="litem" style="display:none">' + a + ': <font color=blue>' + o[a] + '</font></div>';
            }
        }
        return s;   
}
function renderWeather(obj) {
    var s = '';
   
    s += '<div style="font-size: xx-large; margin-left:-3px; margin-top:15px; ">' + obj.tempc + '&deg;C</div>';
    s += '<div><img src="' + obj.img + '"/></div>';
    s += '<div>';
    s += '<li>' + obj.loc + '</li>';
    s += '<li>' + obj.descr + '</li>';
    s += '<li>Visibility:' + obj.vis_km + 'Km</li>';
    s += '<li>Pressure:' + obj.press_mb + 'Mb</li>';
   
        s += '</div>';
      
    
  
    
     
   
   // s+'</tbody></table>';
    
    return s;
}
function showWeather(obj) {
   // $('#weather').css('background-image','url(' + obj.img + ')');
   // delete obj.img;
    $('#weather').html(renderWeather(obj));
}
function onWeather(result) {
    if (typeof result === 'object' && result.hasOwnProperty('current_observation')) {  
        var weather = result.current_observation;
        var obj = {
            img: weather.icon_url,
            loc : weather.display_location.full,
            tempc : weather.temp_c,
            tempf : weather.temp_f,
            descr : weather.weather,
            press_mb : weather.pressure_mb,
            vis_km : weather.visibility_km
        };
        showWeather(obj);

    } else console.log('EEEEEERRRRRRRRRRORRRRRRRRRRR: '+result);
   
}
function getWeather(id) {
    var url = 'http://api.wunderground.com/api/5b9eb056e60d346d/conditions/q/' + id + '.json';
    $.ajax({
        dataType: "jsonp",
        url: url,
        data: null,
        success: onWeather
    });
}

function populateLocation(data) {
   // console.log('populateData');
    $('#location').html('<div class="lobject package" ><h3>Yor Location</h3>' + render( data.location)+'</div>');
    $('.lobject >h3').on('click', onObjectClick);
   // var country = data.location.country_name == "USA" ? data.location.state : data.location.country_iso3166;
   // var city = data.location.city;
    var id = data.location.lat + ',' + data.location.lon;
    getWeather(id);

    //console.log(data);
    //saveLocation(data);
}
function onResult1(data) {
   // trace(data);
    if (data.result === 'not exists')  getLocation();
  
    else if (data.hasOwnProperty('response')) populateLocation(data);
    else {
        trace("ERRRRROORRR  onResult ");
        trace(data)
    }

}
function onFail(data) {
    console.log('onFail');
    console.log(data);
}

function onSaveResult(res) {
   console.log('onSaveResult'+res);   
}

function fCallback(data,success){   
    $.post('/Services/?a=location.save', data, onSaveResult);
    onResult1(data);
}
function getLocation() {
   // console.log('getLocation');
    var url = 'http://api.wunderground.com/api/5b9eb056e60d346d/geolookup/q/autoip.json';
    $.ajax({
        dataType: "jsonp",
        url: url,
        data: null,
        success: fCallback
    });
}

(function () {

    $.ajax({
        url: '/Services/?a=location.get',
        contentType: 'json',
        dataType: 'json'
    }).done(onResult1).fail(onFail);
    /*
    var url = '/data/toronto.json';
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: onWeather
    });
    */
  
})();
