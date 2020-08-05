$(function () {
    $('#loginBtn').bind("click", login); //監聽登入按鈕
})

function login() {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://hexschool-tutorial.herokuapp.com/api/signin",
        data: {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        },
        success: showlogin  
        ,
        error: function () {
            alert("login api error");
        }
});
}
function showlogin(data){
    console.log(data);
    if(data.message == "登入成功"){
        alert("登入成功");
        location.href="../../member.html";
    }else if (data.message == "此帳號不存在或帳號密碼錯誤"){
        alert ("此帳號不存在或帳密錯誤!歡迎立即註冊");
    }else if (data.message == "密碼不得為空"){
        alert("請輸入您的密碼");
    }else if (data.message == "Email 格式不正確"){
        alert ("Email格式不正確");
    }
};
