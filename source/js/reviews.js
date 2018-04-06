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


