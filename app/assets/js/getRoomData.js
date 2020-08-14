let data;
// let roomData;
// let xhr = new XMLHttpRequest();
// xhr.open('get', 'https://raw.githubusercontent.com/snowcherry919/bookjson/master/room.json', true);
// xhr.send(null);
// xhr.onload = function () {
//     data = JSON.parse(xhr.responseText);
//     roomData = data.room;
//     console.log(roomData); //撈出房間的json資料



// };

//使用fetch撈取房間遠端資料
const url = 'https://raw.githubusercontent.com/snowcherry919/bookjson/master/room.json';

// async function getRoomData() {
//     await fetch(url)
//         .then(res => {
//             return res.json();
//         })
//         .then(result => {
//             // console.log(result);
//             let roomData = result.room;
//             console.log(roomData);
//             //渲染畫面
//             dataRender(roomData);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// };
fetch(url)
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res);
        let roomData = res.room;
        console.log(roomData);
        //渲染畫面
        dataRender(roomData);
    })
    .catch(err => {
        console.log(err);
    })



const roomCard = document.querySelector('.roomCard');



//渲染星等
function startIcon(num) {
    if (num == 1) {
        return `<i class="fas fa-star"></i>`
    } else if (num == 2) {
        return `<i class="fas fa-star"></i>
                <i class="fas fa-star"></i>`
    } else if (num == 3) {
        return `<i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>`
    } else if (num == 4) {
        return `<i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>`
    } else if (num == 5) {
        return `<i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>`
    }
}

//將資料塞入畫面
function dataRender(roomData) {
    const roomCardContent = roomData.map(item =>
        `
<div class="roomCard card">
    <div class="row no-gutters my-md-3 my-lg-4 flex-xl-nowrap ">
       
        <div class="col-auto">
            <img src="${item.imageUrl[0]}" class="card-img" alt="roomPhoto">
        </div>
        <div class="col col-md-8 col-lg-8 col-xl-8">
            <div class="card-body px-2 py-1 p-md-2 p-lg-3 h-100">
                <div class="roomHeader  d-md-flex justify-content-between mb-md-2 mb-lg-3">
                    <div class="d-flex flex-wrap flex-column">
                        <p class="fz-sm text-primary mb-0">
                            ${item.city}
                            <span class="fz-sm distance text-third d-none mb-0 d-xl-inline">
                            ${item.distanceFromCenter}
                            </span>
                        </p>
                        <h6 class = "card-title fontRaleway font-weight-bold mb-1 mb-md-0 fz-lg-h4"><a href="detail.html"> ${item.hotelName}</a></h6>
                    </div>
                    <div>
                        <p class=" mb-1 mb-md-0 start fz-sm fz-lg-md">
                            ${startIcon(Math.round(item.start))}
                            
                            <span class=" d-md-block d-xl-inline text-third text-md-right ">${item.start} (${item.evaluation})</span> 
                        </p>
                    </div>
                </div>
                <div class="roomBody d-lg-flex justify-content-lg-between">
                    <div class="roomStyle--change mb-md-0 ">
                        <p class="card-text fz-md font-weight-bold text-third mb-0 mb-lg-1">
                        ${item.roomSize}
                        </p>
                        <p class="roomPersonNum card-text fz-sm text-third  mb-2 mb-md-0 mb-lg-3">
                        ${item.descriptionShort.GuestMax} guests・${item.descriptionShort.Bed} ${item.descriptionShort.bedSize}
                        </p>
                        ${item.amenities.freeCancellation ? 
                        `<span class="badge badge-pill badge-primary-light text-third border-0 d-none  fz-md-xs mb-xl-1 d-lg-inline">Free cancellation</span>`:""}
                        ${item.amenities.noPrepayment ? 
                        `<span class="badge badge-pill badge-primary-light text-third border-0 d-none fz-md-xs mb-xl-1 d-lg-inline ">No prepayment</span>`:""}
                    </div>
                
                    <div class="roomPrice d-md-flex justify-content-md-between align-items-md-center">
                        <div class="mt-md-2">
                            ${item.amenities.freeCancellation ? 
                            `<span class="badge badge-pill badge-primary-light text-third border-0 d-none d-md-block fz-md-xs mb-md-1 mb-xl-0 d-lg-none ">Free cancellation</span>`:""}
                            ${item.amenities.noPrepayment ? 
                            `<span class="badge badge-pill badge-primary-light text-third border-0 d-none d-md-block fz-md-xs mb-md-1  mb-xl-0 d-lg-none">No prepayment</span>`:""}
                        </div>
                        <div class="text-right">
                            <p class="text-third  mb-0 d-none d-md-block  fz-md-sm  my-lg-1">per night</p>
                            ${item.holidayPrice ?
                            `<del class="text-third  fz-sm fz-lg-h6 fontRaleway">TWD 1,980</del>` : "" }
                            <p class="h6 fz-lg-h4  fontRaleway mb-0  font-weight-bold">TWD 
                            ${item.holidayPrice ? `<span class="text-primary">${item.holidayPrice.toLocaleString()} <span>` : `${item.normalDayPrice.toLocaleString()}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`).join('');
    roomCard.innerHTML = roomCardContent;
};