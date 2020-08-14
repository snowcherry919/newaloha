$(document).ready(() => {
    // 日曆選取器
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    $('#reportrange').daterangepicker({

        "autoApply": true,
        "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "1 月",
                "2 月",
                "3 月",
                "4 月",
                "5 月",
                "6 月",
                "7 月",
                "8 月",
                "9 月",
                "10 月",
                "11 月",
                "12 月"
            ],
            "firstDay": 0
        },
        "startDate": "07/18/2020",
        "endDate": "07/20/2020"
    }, cb);
    // cb(start, end);即時顯示


    //bangkok range slider

    var $range = $(".js-range-slider");
    var $inputFrom = $(".js-input-from");
    var $inputTo = $(".js-input-to");
    var instance;
    var min = 0;
    var max = 1000;
    var from = 0;
    var to = 0;
    $range.ionRangeSlider({
        type: "double",
        skin: "round",
        grid: true,
        min: 0,
        max: 10000,
        from: 0,
        to: 10000,
        prefix: "$",
        onStart: updateInputs,
        onChange: updateInputs,
        onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }
    $inputFrom.on("change", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });

        $(this).prop("value", val);

    });
    $inputTo.on("change", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });

        $(this).prop("value", val);
    });



    $('.reserveControl').click(function () {
        //     // 價格開啟與隱藏
        //     $(".totalPrice").toggle();
        //     //箭頭旋轉
        $(".rotate").toggleClass('active');
    })

    //Swiper

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

// 註冊頁面
var $flag_signupName = false;
var $flag_signupEmail = false;
var $flag_signupPassword = false;
var $flag_signupRepassword = false;
var $flag_checkuni = false;

$(function () {
    $('#signupBtn').bind('click', saveSignupData); //監聽送出按鈕
    //即時監聽username
    $('#signupName').bind("input propertychange", function () {

        if ($(this).val().length < 2) {
            $('#erro_signupName').html("不得小於2個字");
            $('#erro_signupName').css("color", "red");
            $('#erro_signupName').css("marginTop", "4px");
            $flag_signupName = false;
        } else {
            $('#erro_signupName').html("");
            $flag_signupName = true;
        }
    });
    //即時監聽 密碼
    $('#signupPassword').bind("input propertychange", function () {

        if ($(this).val().length < 8) {
            $('#erro_signupPassword').html("Password length must be greater than 8 characters.");
            $('#erro_signupPassword').css("color", "red");
            $('#erro_signupPassword').css("marginTop", "4px");
            $flag_signupPassword = false;
        } else {
            $('#erro_signupPassword').html("");
            $flag_signupPassword = true;
        }
    });
    //即時監聽 密碼必須與確認密碼相同才能送出表單 
    $('#signupRepassword').bind("input propertychange", function () {

        if ($(this).val() != $('#signupPassword').val()) {
            $('#erro_signupRepassword').html("Password must be same.");
            $('#erro_signupRepassword').css("color", "red");
            $('#erro_signupRepassword').css("marginTop", "4px");
            $('#signupBtn').attr('disabled', true);
            $flag_signupRepassword = false;
        } else {
            $('#erro_signupRepassword').html("");
            $('#signupBtn').attr('disabled', false);
            $flag_signupRepassword = true;
        }
    });
    //即時監聽 email
    $('#signupEmail').bind("input propertychange", function () {
        if ($(this).val().length < 5) {
            $('#erro_signupEmail').html("Please provide your Email.");
            $('#erro_signupEmail').css("color", "red");
            $('#erro_signupEmail').css("marginTop", "4px");
            $flag_signupEmail = false;
        } else {
            $('#erro_signupEmail').html("");
            $flag_signupEmail = true;
            $.ajax({
                type: "POST",
                url: "http://hexschool-tutorial.herokuapp.com/api/signup",
                data: {
                    email: $('#signupEmail').val()
                },
                success: function (data) {
                    console.log(data);
                    if (data.message == "此帳號已被使用") {
                        $('#erro_signupEmail').html("此帳號已被使用");
                        $('#erro_signupEmail').css("color", "red");
                        //帳號如果存在，讓btn無法按
                        $('#signupBtn').attr('disabled', true);
                        $flag_checkuni = false;
                    } else {
                        $('#erro_signupEmail').html("此帳號可以使用");
                        $('#erro_signupEmail').css("color", "green");
                        //帳號如果沒有註冊過，讓btn可以按
                        $('#signupBtn').attr('disabled', false);
                        $flag_checkuni = true;
                    };
                },
                error: function () {
                    alert('失敗');
                }
            })
        }
    })
});

function saveSignupData() {
    if ($flag_signupEmail && $flag_signupName && $flag_signupPassword && $flag_signupRepassword && $flag_checkuni) {
        console.log($('#signupName').val());
        console.log($('#signupEmail').val());
        console.log($('#signupPassword').val());
        console.log($('#signupRepassword').val());
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://hexschool-tutorial.herokuapp.com/api/signup",
            data: {
                email: $('#signupEmail').val(),
                password: $('#signupPassword').val()
            },
            success: function show(data) {
                console.log(data);
                if (data.message == "帳號註冊成功") {
                    alert("帳號註冊成功");
                    location.href = "../../login.html";
                } else {
                    $('#erro_signupEmail').html("");
                    $('#erro_signupRepassword').html("");
                    $('#erro_signupPassword').html("");
                    $('#erro_signupName').html("");
                    $('#signupBtn').attr('disabled', false);

                }
            },
            error: function () {
                alert('失敗');
            }
        })
    } else {
        alert("Please comfirm your data!");
    }


};

// 搜尋面板

// location
//監聽location按鈕，當按下時觀察使用者選到哪一個地區
const locationBtn = document.querySelector('.location');
const showLocation = document.getElementById('serchBar');

//讓使用者選到的地區秀在btn上
function checkLocation(e) {
    e.preventDefault(); //取消a連結的預設動作
    let selectLocation = e.target.textContent;
    showLocation.innerHTML = `<span class="mb-0 text-center"><i class="fas fa-map-marker-alt mr-3 text-dark"></i>${selectLocation}<span>`;

}

locationBtn.addEventListener('click', checkLocation, false);



// function changeRoomCount(e){
//     console.log(e.target);
// }




// roomCount.addEventListener('click',changeRoomCount);



const guests = document.getElementById('dropdownGuests');

//操控下拉選單開啟與關閉的時機
function openPannel() {

    const roomCount = document.querySelector('.roomCount');

    if (roomCount.style.display === "none") {
        roomCount.style.display = "block";
    } else {
        roomCount.style.display = "none";
    };
}

function showData(e) {

}
guests.addEventListener('click', openPannel);
guests.addEventListener('click', showData);




// 人數按鈕
// adult減號按鈕
// const adultDel = document.getElementById('adultDel');
// //adult加號按鈕
// const adultPlus = document.getElementById('adultPlus');
// //adult 人數

//計算 當按下 - 按鈕時，數字-1
function del(id) {
    let num = parseInt(id.textContent) - 1;
    //如果人數少於0，將它設為0，不要有負數
    if (num <= 0) {
        alert("不得少於1");
        id.textContent = 1;
        num = 1;

    } else {
        id.textContent = num;
    }
};

//計算 兒童最少可以到0人

function cDel(id) {
    let num = parseInt(id.textContent) - 1;
    if (num < 0) {
        id.textContent = 0;
        num = 0;
    } else {
        id.textContent = num;
    }
}
//計算 按下＋按鈕數字＋1
function add(id) {
    let num = parseInt(id.textContent) + 1;
    id.textContent = num;
}
//取得最後房間數量與人數
const adult = document.getElementById('adultNum');
const child = document.getElementById('childNum');
const room = document.getElementById('roomNum');

function getTotal() {
    //取得成人的人數
    let adultSum = parseInt(adult.textContent);
    //取得小孩的人數
    let childSum = parseInt(child.textContent);
    //取得房間數量
    let roomSum = parseInt(room.textContent);
    //將人數加總
    let totalSum = adultSum + childSum;
    //寫回button內容中
    guests.innerHTML = `<span class="text-third"><i class="fas fa-user-alt mr-3 text-dark"></i>${totalSum} guests / ${roomSum} room </span>`;

}

//當按下-按鈕時
adultDel.onclick = function () {
    del(adultNum);
    getTotal();
};
childDel.onclick = function () {
    cDel(childNum);
    getTotal();
}
roomDel.onclick = function () {
    del(roomNum);
    getTotal();
}

//當按下 ＋按鈕時
adultPlus.onclick = function () {
    add(adultNum);
    getTotal();
}
childPlus.onclick = function () {
    add(childNum);
    getTotal();
}
roomPlus.onclick = function () {
    add(roomNum);
    getTotal();
}


//監聽search按鈕
//當使用者按下時會跳轉到result頁面，並且搜尋資料要帶過去，所以先監聽按鈕

const serchBtn = document.getElementById('js-serchBtn');
const reserveDay = document.getElementById('reportrange');

let saveSerchData = [];
let userData;
//取得搜尋面板的資訊
function getSerchData(e) {
    e.preventDefault();
    //存取地點
    let saveLocation = showLocation.innerText;
    //存取查詢時間
    let saveReserveDay = reserveDay.innerText;
    //存取人數房間
    let saveGuests = guests.innerText;


    //將資料存入物件中
    saveSerchData = [{
        Location: saveLocation,
        ReserveDay: saveReserveDay,
        Guests: saveGuests
    }];
    console.log(saveSerchData);
    savetoLocal();

    //如果沒有填入資料，提醒使用者
    if (saveLocation == "Destination") {
        alert('Must be select your destination.');
    } else if (saveGuests == "Guests") {
        alert('Must be select how many person and room you want.');
    } else {
        //如果填入完成跳轉頁面
        location.href = "result.html";

    };

}
//將資料存進localstorage
let allData = [];

function savetoLocal() {
    //將資料存到localstorage中
    let userSelect = JSON.stringify(saveSerchData);
    localStorage.setItem('serchData', userSelect);
    //將字串型態轉型為JSON
    let getUserSelect = JSON.parse(localStorage.getItem('serchData'));
    // let getUserSelectAry = JSON.parse(getUserSelect);

    //取出localstorage的資料
    userData = getUserSelect[0].Location;
    console.log(userData);
    let b = [];


    b.push(userData);
    console.log(b);

}
// showUserSelect();
//將資料寫入result搜尋頁面
// function pushSerchData() {
//     let pushlocalstr = localStorage.getItem('location');
//     alert(pushlocalstr);
// }

//監聽serch按鈕，並取得使用者輸入的資料
serchBtn.addEventListener('click', getSerchData);

// function showUserSelect() {
//     //帶入資料錯誤 需更改
//     document.querySelector('.js-resultLocation').innerHTML = `<span class="mb-0 text-center"><i class="fas fa-map-marker-alt mr-3 text-dark"></i>123<span>`;

// }





// totalPerson.addEventListener()


// function checkPersonNum(e){
//     e.preventDefault();//取消a連結的預設動作
//     let guests=e.target.textContent;
//     showLocation.innerHTML=`<span class="mb-0 text-center"><i class="fas fa-map-marker-alt mr-3 text-dark"></i>${selectLocation}<span>`;

// }




//計算人數
// function total(){
//     console.log(totalPerson.textContent);

// }
// total();



// const roomBtn=document.getElementsByClassName('js-btn');
// function add(id){
//     let num=parseInt(id.textContent)+1;
//     id.textContent=num;
//     // let total2=num;
//     // console.log(total2);

//     // guests.innerHTML=`<span>${total2}</span>`;


// }   

// for (let i=0;i < roomBtn.length;i++){
//     let button =roomBtn[i];
//     const getAdultNum = document.getElementById('adultNum');
//     button.addEventListener('click',function(e){
//         console.log(button.id);//取得click時的id名稱

//         let buttonClicked = button.id;
//         if (buttonClicked == "adultPlus"){

//             let adultNum = parseInt(getAdultNum.textContent);
//             adultNum+=1;

//             console.log(adultNum);

//             getAdultNum.innerText=adultNum;
//         }else if (buttonClicked == "adultDel"){
//             let adultNum=parseInt(document.getElementById('adultNum').textContent);
//             if(adultNum<=1){
//                 alert("至少要有一位成人入住");
//                 adultNum=1;

//             }else{
//                 adultNum-=1;
//             }

//             console.log(adultNum);

//             document.getElementById('adultNum').innerText=adultNum;


//         }else if(buttonClicked == "childPlus"){
//             let childNum=parseInt(document.getElementById('childNum').textContent);
//             childNum+=1;
//             console.log(childNum);
//             document.getElementById('childNum').innerText=childNum;
//         }else if (buttonClicked == "childDel"){
//             let childNum=parseInt(document.getElementById('childNum').textContent);
//             if(childNum <= 1){
//                 childNum = 0;
//             }else{
//                 childNum -= 1;
//             }

//             console.log(childNum);
//             document.getElementById('childNum').innerText = childNum;
//         }


//     })
// }