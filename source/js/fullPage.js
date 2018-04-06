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
