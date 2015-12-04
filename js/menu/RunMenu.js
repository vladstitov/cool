/// <reference path="../Scripts/jquery-2.0.3.min.js" />
/// 
var onMenuMouseOver = function (evt) {
    // console.log('animate')
    $(evt.currentTarget).off('mouseover');

    $(evt.currentTarget).animate({
        top: '25px'
    }, 100);

};
var onMouseOut = function (evt) {
    //console.log('mouseleave');
    //console.dir(evt.currentTarget);

    $(evt.currentTarget).children("a").animate({
        top: '0px'
    }, 100, null, function (evt2) {
        // console.log(this);
        $(evt.currentTarget).children("a").on('mouseover', onMenuMouseOver);
        $(this).on('mouseover', onMenuMouseOver);
    });
    // $('#menu_left200 li').animate({top:'0px'},20);
};

$(document).ready(function () {
   // console.log('load(htms/left_menu.htm)')
    $('#RunMenu').load('htms/left_menu.htm', function () {
       // $('li a').mouseover(onMenuMouseOver);
        $('#RunMenu a').on('mouseover', onMenuMouseOver);
        $('#RunMenu li').mouseleave(onMouseOut);
    });
   /*
    $(window).scroll(function (evt) {

        if ($(window).scrollTop() > 180) {
            $('#menu_left200').css('position','fixed');
        } else $('#menu_left200').css('position', 'relative');

    });
    */

});