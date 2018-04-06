
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
