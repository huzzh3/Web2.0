$(function(){
    $('input:not(.button)').blur(function(){                          //当选择框失去焦点之后，判断数据的有效性
        if (validator.isFieldValid(this.id, $(this).val())) {
            $(this).parent().find('.error').text('').hide();         //如果有效，那么久隐藏错误信息
        } else {
            $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();    //否则就展示错误信息
        }
    });

    $('input.button').click(function(){
        $('input:not(.button)').blur();                              //让选择框都失去焦点，同时开启检查数据有效性
        if (!validator.isFormValid()) return false;                  //阻止提交表单
    });
});