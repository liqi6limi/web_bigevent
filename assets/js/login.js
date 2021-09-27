$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();

    })

    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name =password ]').val();
            if (value !== pwd) {
                return '两次输入密码不一致';
            }
        }
    })

    // 注册表单
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功，请登录');
            $('#link_login').click();
        })
    })

    // 登录表单
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})