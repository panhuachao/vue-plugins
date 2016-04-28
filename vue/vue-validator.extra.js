/**
 * Created by Dev02 on 2016/4/18.
 */
//验证必填
Vue.validator('required', {
    message: '必填信息项缺填入', // error message
    check: function (val) { // custome validator
        if(val==undefined||val==null||val.length==0||val.trim().length==0)
        {
            return false;
        }
        return true;
    }
});

//验证邮箱
Vue.validator('email', {
    message: '邮箱地址格式错误', // error message
    check: function (val) { // custome validator
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }
});

//验证手机
Vue.validator('mobile', {
    message: '手机号格式错误', // error message
    check: function (val) { // custome validator
        if(val==undefined)
        {
            return false;
        }
        return /^[1][3-8]+\d{9}$/.test(val);
    }
});
//手机验证码
Vue.validator('telcode', {
    message: 'invalid telcode', // error message
    check: function (val) { // custome validator
        if(val==undefined)
        {
            return false;
        }
        return /^\d{4}$/.test(val)
    }
});

//验证密码
Vue.validator('password', {
    message: 'invalid password', // error message
    check: function (val) { // custome validator
        if(val==undefined)
        {
            return false;
        }
        return /^[A-Za-z0-9]{6,20}$/.test(val)
    }
});

//验证姓名
Vue.validator('username', {
    message: '姓名格式错误', // error message
    check: function (val) { // custome validator
        if(val==undefined)
        {
            return false;
        }
        return /^(([\u4e00-\u9fa5]+)|([a-zA-Z]+)|\s){2,20}$/.test(val)
    }
});

//验证会议名称
Vue.validator('meetingname', {
    message: '会议名称格式错误', // error message
    check: function (val) { // custome validator
        if(val==undefined)
        {
            return false;
        }
        return /^(([\u4e00-\u9fa5]+)|([a-zA-Z]+)|[0-9]|\s|_){2,50}$/.test(val)
    }
});