var fullPage = (function () {
    return{
        scroll: function () {
            $('#fullpage').fullpage({
                scrollBar:true,
                controlArrows: false,
                menu: '#menu',
                anchors: ['page0','page1', 'page2', 'page3', 'page4','page5','page6','page7']
            });
        },
        slider:function(){
            $('#moveRight').on('click',function (e) {
                e.preventDefault();
                $.fn.fullpage.moveSlideRight();
            });
            $('#moveLeft').on('click',function (e) {
                e.preventDefault();
                $.fn.fullpage.moveSlideLeft();
            });
        }
    }
}());

var fullReviews = (function() {
    var text,
        title;
    return{
        init:function(){
            $('.btn-review').on('click', function(e){
                e.preventDefault();
                var $this = $(this),
                    container = $this.closest('.review__hover');
                title = container.find('.review__hover-title').text();
                text = container.find('.review__hover-text').text();

                $('#popupReview').find('.popup__title').text(title);
                $('#popupReview').find('.popup__text').text(text);

            });

            $(".btn-review").fancybox({
                'closeBtn':false,
                helpers : {
                    overlay : {
                        css : {
                            'background' : ' rgba(20, 20, 20, 0.7)'
                        }
                    },
                    title :null
                }
            });

            $('.popup__btn-close').on('click',function(e){
                e.preventDefault();
                $.fancybox.close();
            });
        }
    }

}());



var teamAccordion = (function(){
    function openItem(item){
        var info = item.find('.team__info');
        var infoScrollHeight = info.prop('scrollHeight');
        item.addClass('active');
        info.css('max-height',infoScrollHeight+'px');
    };
    function closeItem(item){
        var info = item.find('.team__info');
        item.removeClass('active');
        info.css('max-height',0);
    };
    function closeAllItem(){
        $('.team__item').each(function(){
            closeItem($(this));
        });
    };
    return{
        init:function(){
            $('.team__link').on('click',function (e) {
                e.preventDefault();
                var item = $(this).closest('.team__item');
                if(item.hasClass('active')){
                    closeItem(item);
                }else{
                    closeAllItem();
                    openItem(item);
                }
            });
        },
        onload :function(){
            $('.team__item').each(function(){
                if($(this).hasClass('active')){
                    var info = $(this).find('.team__info');
                    var infoScrollHeight = info.prop('scrollHeight');
                    info.css('max-height',infoScrollHeight+'px');
                }
            });
        }
    }
}());
var menuAccordion = (function(){
    function openItem(item){
        var info = item.find('.menu__info');
        var infoWidth = 550;
        item.addClass('active');
        info.css('max-width',infoWidth+'px');
    };
    function closeItem(item){
        var info = item.find('.menu__info');
        item.removeClass('active');
        info.css('max-width',0);
    };
    function closeAllItem(){
        $('.menu__item').each(function(){
            closeItem($(this));
        });
    };
    return{
        init:function(){
            $('.menu__link').on('click',function (e) {
                e.preventDefault();
                var item = $(this).closest('.menu__item');
                if(item.hasClass('active')){
                    closeItem(item);
                }else{
                    closeAllItem();
                    openItem(item);
                }
            });
        },
        onload:function(){
            $('.menu__item').each(function(){
                if($(this).hasClass('active')){
                    var info = $(this).find('.menu__info');
                    var infoWidth = 550;
                    info.css('max-width',infoWidth+'px');
                }
            });
        }
    }
}());


var orderForm = (function(){
    var form = $(document).find('#form');
    var fields = new Array("name", "tel", "street","house","text");//поля обязательные
    var error =0;
    function checkEmptyFields (input){
        if (!input.val()) {
            input.addClass('error');
            error = 1;
            input.attr('placeholder', "Поле обязательно для заполнения");
        }else{
            input.removeClass('error');
            input.attr('placeholder', "");
        }
    };
    function checkNameField(input) {
        var rv_name = /^[a-zA-Zа-яА-Я]+$/;
        if(!(input.val().length > 2 && rv_name.test(input.val()))){
            error = 2;
            input.addClass('error');
        }else{
            input.removeClass('error');
        }
    };
    function checkTelField(input){
        var rv_tel=/^[0-9_-]+$/;
        if(!(input.val().length > 5 && rv_tel.test(input.val()))){
            error = 2;
            input.addClass('error');
        }else{
            input.removeClass('error');
        }
    };
    function reset(){
        form[0].reset();
    };
    function validation(){
        form.find(":input").each(function () {
            for (var i = 0; i < fields.length; i++) {
                if ($(this).attr("name") == fields[i]) {
                    checkEmptyFields($(this));
                    if ($(this).attr('name') == 'name') {
                        checkNameField($(this));
                    }
                    if ($(this).attr('name') == 'tel') {
                        checkTelField($(this));
                    }
                }
            };
        });
        if(error==0){
            reset();
            return true;
        }else{
            return false;
        }
    }

    return{
        init:function () {
            if(form.length){
                var submitBtn = form.find('#order');
                submitBtn.on('click',function (e) {
                   e.preventDefault();
                   error = 0;
                   validation();
                });
            }
        }
    }
}());

var piter_map;
function init(){
    ymaps.ready(function () {
        piter_map = new ymaps.Map(document.getElementById('map'),{
            center: [59.94, 30.32],
            zoom: 12
        });
        piter_map.controls.add('zoomControl');
        piter_map.controls.add('searchControl');
        var locations = [
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.93542929153893, 30.3570662692548]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.945403579427676,30.38178550753605]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.94058878055074,30.26093589816105]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.969982543158174,30.30093299899113]
            }
        ];

        var myCollection = new ymaps.GeoObjectCollection();
        for(var i = 0;i < locations.length; i++){
            myCollection.add(new ymaps.Placemark(locations[i].coords, {
                    hintContent: 'MrBurger',
                    balloonContent: locations[i].adress
                },{
                    iconLayout: 'default#image',
                    iconImageHref:'../assets/img/icon/map-marker.svg'
                //,
                   // iconImageSize: [30, 42]
                }
            ));
        }
        piter_map.geoObjects.add(myCollection);
    });
};

$(document).ready(function () {
    fullReviews.init();
    fullPage.scroll();
    fullPage.slider();
    teamAccordion.onload();
    teamAccordion.init();
    menuAccordion.onload();
    menuAccordion.init();
    orderForm.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZ1bGxQYWdlLmpzIiwicmV2aWV3cy5qcyIsImFjY29yZGlvbi5qcyIsIm9yZGVyRm9ybS5qcyIsIm1hcC5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZnVsbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIHNjcm9sbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcjZnVsbHBhZ2UnKS5mdWxscGFnZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxCYXI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xBcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWVudTogJyNtZW51JyxcclxuICAgICAgICAgICAgICAgIGFuY2hvcnM6IFsncGFnZTAnLCdwYWdlMScsICdwYWdlMicsICdwYWdlMycsICdwYWdlNCcsJ3BhZ2U1JywncGFnZTYnLCdwYWdlNyddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJyNtb3ZlUmlnaHQnKS5vbignY2xpY2snLGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLm1vdmVTbGlkZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKCcjbW92ZUxlZnQnKS5vbignY2xpY2snLGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLm1vdmVTbGlkZUxlZnQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG4iLCJ2YXIgZnVsbFJldmlld3MgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGV4dCxcclxuICAgICAgICB0aXRsZTtcclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5idG4tcmV2aWV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoJy5yZXZpZXdfX2hvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9IGNvbnRhaW5lci5maW5kKCcucmV2aWV3X19ob3Zlci10aXRsZScpLnRleHQoKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSBjb250YWluZXIuZmluZCgnLnJldmlld19faG92ZXItdGV4dCcpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcjcG9wdXBSZXZpZXcnKS5maW5kKCcucG9wdXBfX3RpdGxlJykudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjcG9wdXBSZXZpZXcnKS5maW5kKCcucG9wdXBfX3RleHQnKS50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiLmJ0bi1yZXZpZXdcIikuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgJ2Nsb3NlQnRuJzpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGhlbHBlcnMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQnIDogJyByZ2JhKDIwLCAyMCwgMjAsIDAuNyknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlIDpudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLnBvcHVwX19idG4tY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJC5mYW5jeWJveC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KCkpO1xyXG5cclxuXHJcbiIsInZhciB0ZWFtQWNjb3JkaW9uID0gKGZ1bmN0aW9uKCl7XHJcbiAgICBmdW5jdGlvbiBvcGVuSXRlbShpdGVtKXtcclxuICAgICAgICB2YXIgaW5mbyA9IGl0ZW0uZmluZCgnLnRlYW1fX2luZm8nKTtcclxuICAgICAgICB2YXIgaW5mb1Njcm9sbEhlaWdodCA9IGluZm8ucHJvcCgnc2Nyb2xsSGVpZ2h0Jyk7XHJcbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaW5mby5jc3MoJ21heC1oZWlnaHQnLGluZm9TY3JvbGxIZWlnaHQrJ3B4Jyk7XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2xvc2VJdGVtKGl0ZW0pe1xyXG4gICAgICAgIHZhciBpbmZvID0gaXRlbS5maW5kKCcudGVhbV9faW5mbycpO1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGluZm8uY3NzKCdtYXgtaGVpZ2h0JywwKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbEl0ZW0oKXtcclxuICAgICAgICAkKCcudGVhbV9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2xvc2VJdGVtKCQodGhpcykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy50ZWFtX19saW5rJykub24oJ2NsaWNrJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy50ZWFtX19pdGVtJyk7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbkl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25sb2FkIDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcudGVhbV9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5mbyA9ICQodGhpcykuZmluZCgnLnRlYW1fX2luZm8nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5mb1Njcm9sbEhlaWdodCA9IGluZm8ucHJvcCgnc2Nyb2xsSGVpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mby5jc3MoJ21heC1oZWlnaHQnLGluZm9TY3JvbGxIZWlnaHQrJ3B4Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxudmFyIG1lbnVBY2NvcmRpb24gPSAoZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIG9wZW5JdGVtKGl0ZW0pe1xyXG4gICAgICAgIHZhciBpbmZvID0gaXRlbS5maW5kKCcubWVudV9faW5mbycpO1xyXG4gICAgICAgIHZhciBpbmZvV2lkdGggPSA1NTA7XHJcbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaW5mby5jc3MoJ21heC13aWR0aCcsaW5mb1dpZHRoKydweCcpO1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNsb3NlSXRlbShpdGVtKXtcclxuICAgICAgICB2YXIgaW5mbyA9IGl0ZW0uZmluZCgnLm1lbnVfX2luZm8nKTtcclxuICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpbmZvLmNzcygnbWF4LXdpZHRoJywwKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbEl0ZW0oKXtcclxuICAgICAgICAkKCcubWVudV9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2xvc2VJdGVtKCQodGhpcykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5tZW51X19saW5rJykub24oJ2NsaWNrJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5tZW51X19pdGVtJyk7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbkl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25sb2FkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5tZW51X19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmZvID0gJCh0aGlzKS5maW5kKCcubWVudV9faW5mbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmZvV2lkdGggPSA1NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mby5jc3MoJ21heC13aWR0aCcsaW5mb1dpZHRoKydweCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcbiIsIlxyXG52YXIgb3JkZXJGb3JtID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZm9ybSA9ICQoZG9jdW1lbnQpLmZpbmQoJyNmb3JtJyk7XHJcbiAgICB2YXIgZmllbGRzID0gbmV3IEFycmF5KFwibmFtZVwiLCBcInRlbFwiLCBcInN0cmVldFwiLFwiaG91c2VcIixcInRleHRcIik7Ly/Qv9C+0LvRjyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0LVcclxuICAgIHZhciBlcnJvciA9MDtcclxuICAgIGZ1bmN0aW9uIGNoZWNrRW1wdHlGaWVsZHMgKGlucHV0KXtcclxuICAgICAgICBpZiAoIWlucHV0LnZhbCgpKSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICBlcnJvciA9IDE7XHJcbiAgICAgICAgICAgIGlucHV0LmF0dHIoJ3BsYWNlaG9sZGVyJywgXCLQn9C+0LvQtSDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+INC00LvRjyDQt9Cw0L/QvtC70L3QtdC90LjRj1wiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIGlucHV0LmF0dHIoJ3BsYWNlaG9sZGVyJywgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNoZWNrTmFtZUZpZWxkKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHJ2X25hbWUgPSAvXlthLXpBLVrQsC3Rj9CQLdCvXSskLztcclxuICAgICAgICBpZighKGlucHV0LnZhbCgpLmxlbmd0aCA+IDIgJiYgcnZfbmFtZS50ZXN0KGlucHV0LnZhbCgpKSkpe1xyXG4gICAgICAgICAgICBlcnJvciA9IDI7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2hlY2tUZWxGaWVsZChpbnB1dCl7XHJcbiAgICAgICAgdmFyIHJ2X3RlbD0vXlswLTlfLV0rJC87XHJcbiAgICAgICAgaWYoIShpbnB1dC52YWwoKS5sZW5ndGggPiA1ICYmIHJ2X3RlbC50ZXN0KGlucHV0LnZhbCgpKSkpe1xyXG4gICAgICAgICAgICBlcnJvciA9IDI7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gcmVzZXQoKXtcclxuICAgICAgICBmb3JtWzBdLnJlc2V0KCk7XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvbigpe1xyXG4gICAgICAgIGZvcm0uZmluZChcIjppbnB1dFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoXCJuYW1lXCIpID09IGZpZWxkc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRW1wdHlGaWVsZHMoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignbmFtZScpID09ICduYW1lJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja05hbWVGaWVsZCgkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignbmFtZScpID09ICd0ZWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVGVsRmllbGQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGVycm9yPT0wKXtcclxuICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihmb3JtLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VibWl0QnRuID0gZm9ybS5maW5kKCcjb3JkZXInKTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ0bi5vbignY2xpY2snLGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICBlcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuIiwidmFyIHBpdGVyX21hcDtcclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgeW1hcHMucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBpdGVyX21hcCA9IG5ldyB5bWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTkuOTQsIDMwLjMyXSxcclxuICAgICAgICAgICAgem9vbTogMTJcclxuICAgICAgICB9KTtcclxuICAgICAgICBwaXRlcl9tYXAuY29udHJvbHMuYWRkKCd6b29tQ29udHJvbCcpO1xyXG4gICAgICAgIHBpdGVyX21hcC5jb250cm9scy5hZGQoJ3NlYXJjaENvbnRyb2wnKTtcclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhZHJlc3M6XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0YPQuy4g0JHQsNCx0YPRiNC60LjQvdCwINC0MTIvMSwgMTVcIixcclxuICAgICAgICAgICAgICAgIGNvb3JkczpbNTkuOTM1NDI5MjkxNTM4OTMsIDMwLjM1NzA2NjI2OTI1NDhdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFkcmVzczpcItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzLCDRg9C7LiDQkdCw0LHRg9GI0LrQuNC90LAg0LQxMi8xLCAxNVwiLFxyXG4gICAgICAgICAgICAgICAgY29vcmRzOls1OS45NDU0MDM1Nzk0Mjc2NzYsMzAuMzgxNzg1NTA3NTM2MDVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFkcmVzczpcItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzLCDRg9C7LiDQkdCw0LHRg9GI0LrQuNC90LAg0LQxMi8xLCAxNVwiLFxyXG4gICAgICAgICAgICAgICAgY29vcmRzOls1OS45NDA1ODg3ODA1NTA3NCwzMC4yNjA5MzU4OTgxNjEwNV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWRyZXNzOlwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMsINGD0LsuINCR0LDQsdGD0YjQutC40L3QsCDQtDEyLzEsIDE1XCIsXHJcbiAgICAgICAgICAgICAgICBjb29yZHM6WzU5Ljk2OTk4MjU0MzE1ODE3NCwzMC4zMDA5MzI5OTg5OTExM11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHZhciBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbigpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG15Q29sbGVjdGlvbi5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhsb2NhdGlvbnNbaV0uY29vcmRzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGludENvbnRlbnQ6ICdNckJ1cmdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6IGxvY2F0aW9uc1tpXS5hZHJlc3NcclxuICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOicuLi9hc3NldHMvaW1nL2ljb24vbWFwLW1hcmtlci5zdmcnXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgICAgIC8vIGljb25JbWFnZVNpemU6IFszMCwgNDJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwaXRlcl9tYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuICAgIH0pO1xyXG59O1xyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBmdWxsUmV2aWV3cy5pbml0KCk7XHJcbiAgICBmdWxsUGFnZS5zY3JvbGwoKTtcclxuICAgIGZ1bGxQYWdlLnNsaWRlcigpO1xyXG4gICAgdGVhbUFjY29yZGlvbi5vbmxvYWQoKTtcclxuICAgIHRlYW1BY2NvcmRpb24uaW5pdCgpO1xyXG4gICAgbWVudUFjY29yZGlvbi5vbmxvYWQoKTtcclxuICAgIG1lbnVBY2NvcmRpb24uaW5pdCgpO1xyXG4gICAgb3JkZXJGb3JtLmluaXQoKTtcclxufSk7Il19
