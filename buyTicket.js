
// 跑很久就爆了 進去的時間點不對
// 在看一下時間刷
// Enter 可以狂按



// game -> verify -> area
const reSelectDOMTime = 10
let answer ="20190928"

// 張數
// https://www.indievox.com/wearesouthrocks/event-post/21821
const selectTicket =()=>{


// 火球祭直接跳過 step2 
   



    // dd 代表 一列 以及 立即訂購按鈕 因此，要選第四列，就要選 8，7啦幹 
    let dd = document.getElementsByClassName('gridc')
    let num = 1 || 3
    let ddLengthSubtract1 = dd.length -1
    // if ( !dd[num] || dd[num].childNodes[0].innerHTML!== '' ){
    //     console.log("sold out");
    //     // location.reload()
    // }


    
    // 選最後一行
    if (!dd[num] || dd[num].childNodes[0].innerHTML!== '') return setTimeout(function () { 
        // console.log(buyButton1);
        selectTicket() 
    }, reSelectDOMTime)
    
    console.log("in add-ons");

    dd[num].childNodes[0].click()


    // 有兩個購買鍵 兩個購買鍵 分別是看各自的 幾人票決定
    // let buttonGroup = document.querySelectorAll('.btn-group.btn-group-vertical.btn-block')
    // buttonGroup[0].childNodes[buttonGroup[1].childNodes.length-2].click()
    // console.log(buyButton1, "not less than 1");
    // buyButton1[1].click()

    // redirect 後 要怎麼處理
    // content_scripts 被迫刷新
    purchase()


    // document.getElementById("mySelect").selectedIndex = "2";
    // 請再次確認訂單 alert ?


    // let nextStepButton = document.querySelector('.btn.btn-3d')
    // // if(nextStepButton) nextStepButton.click()
    // document.onkeydown = function (e) {  //對整個頁面文件監聽 
    //     if (e.keyCode == 13) {
    //         nextStepButton.click()
    //     }
    // };

}

// https://www.indievox.com/m/purchase/buy-ticket-select-payment

// step 1.5
const verify = ()=> {
    // 要給答案嗎?
    // 輸入錯誤的話 enter 之後他會在原視窗，跳 alert，所以只要 focus 第一次就好
    let er = document.getElementById('checkCode')
    if ( !er || er.length < 1) return setTimeout(function () { 
        console.log('SelectPayment is :', er);
        verify() 
    }, reSelectDOMTime)
    er.focus()
    // er.value = answer
}

const selectZone = ()=>{
    let whichArea = 2 // the most expensive area
    let WhichSubArea = 2 // C
    // step 2 
    // 假如沒有 也要做
    let zone = document.getElementsByClassName('zone area-list')
    // To Do
    // error handling 
    if( !zone[0] ) return setTimeout(function () { 
        console.log('SelectPayment is :', zone);
        purchase() 
    }, reSelectDOMTime)
    if( !zone[0].childNodes[whichArea].childNodes[WhichSubArea] ){
        zone[0].childNodes[whichArea].childNodes[0].childNodes[0].click()
    } else{
        zone[0].childNodes[whichArea].childNodes[WhichSubArea].childNodes[0].click()
    }
    // 再來是 選位置 這個要看場地 lol
}

const purchase = () =>{





    // step 3
    let tickets = document.getElementsByClassName('gridc')


    // let sss = tickets[0].childNodes[3].childNodes[1]

    // sss.selectedIndex = sss.length -1



    if (tickets.length < 1) return setTimeout(function () { 
        console.log('SelectPayment is :', tickets);
        purchase() 
    }, reSelectDOMTime)
    let sss = tickets[0].childNodes[3].childNodes[1]
        if (sss.length < 1) return setTimeout(function () { 
            console.log('SelectPayment is :', tickets);
            purchase() 
        }, reSelectDOMTime)
    sss.selectedIndex = sss.length -1


// focus 沒用
    // actually, it works
    let ver = document.getElementById('TicketForm_verifyCode')
    ver.focus()
    console.log("after focus");




// 
// let tickets = document.getElementsByClassName('gridc')


// let sss = tickets[0].childNodes[3].childNodes[1]

// sss.selectedIndex = sss.length -1
// 


    // 只用 click 過不了啊
    let ss = document.getElementsByName('TicketForm[agrees]')[0]
    // ss.click()
    console.log(chrome);

    chrome.debugger.attach(ss, "1.2", function() {
        console.log("in cb");
        // chrome.debugger.sendCommand(ss, "Input.dispatchMouseEvent", arguments)
    })

    // chrome.debugger.attach(ss, "click", function() {
    //     console.log("in cb");
    //     chrome.debugger.sendCommand(ss, "Input.dispatchMouseEvent", arguments)
    // })
    // ss.click()


    // var event = new Event('click');
    // var event3 = new Event('click');
    // 監聽事件
    // elem.addEventListener('build', function (e) { ... }, false);
    // 觸發事件
    // ss.dispatchEvent(event3);


    // ss.checked = true




// 不用 submit 了 它自動幫你做好 enter 了
    // let agr = document.getElementById('ticketPriceSubmit')
    // agr.click()
    // 剩下 isTrusted 了

}

selectTicket()
verify()
selectZone()
purchase()

// window.onload = ()=>{
//     selectTicket()
//     purchase()
// } 