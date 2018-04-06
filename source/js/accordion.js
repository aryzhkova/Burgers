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
