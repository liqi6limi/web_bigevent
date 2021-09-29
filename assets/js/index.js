$(function() {
    getUserInfo();

    //    弹出提示框
    $('.tuichu').on('click', function() {
        var layer = layui.layer;
        layer.confirm('确认退出登录吗', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            // 2. 重新跳转到登录页面
            location.href = '/login.html';

            layer.close(index);
        });
    })
})

// 1.获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            } else {
                renderAvatar(res.data);
            }
        },
    })
}

//用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}