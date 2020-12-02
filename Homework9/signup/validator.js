var validator = {
    form: {
        username: {
            status: false,
            errorMessage: '6~18 letter,digits or _ (letter begin)'
        },
        sid: {
            status: false,
            errorMessage: '8 digits cannot start with 0'
        },
        phone: {
            status: false,
            errorMessage: '11 digits cannot start with 0'
        },
        email: {
            status: false,
            errorMessage: 'Please enter a legal email'
        }
    },

    //使用正则表达式检查数据有效性
    isUsernameValid: function (username) {
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/.test(username);
    },

    isSidValid: function (sid) {
        return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
    },

    isPhoneValid: function(phone) {
        return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
    },

    isEmailValid: function(email) {
        return this.form.email.status = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    },

    //函数调用接口，方便外界调用上面的四种检查数据有效的方法
    isFieldValid: function(fieldname, value) {
        var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFiledname + 'Valid'](value);
    },

    //检查表单是否有效
    isFormValid: function() {
        return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
    },

    //检查数据是否唯一
    isAttrValueUnique: function(registry, user, attr) {
        for (var key in registry) {
            if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
        }
        return true;
    }
}

if (typeof module == 'object') { //对模块中的数据导出，供index.js调用
    module.exports = validator  
}