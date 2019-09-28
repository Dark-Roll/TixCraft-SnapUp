
// 搶票前須知：
// 驗證通常會跳 alert 需要再按一次 enter
// 沒驗證就可以切換英文 打驗證碼了
// 跑很久就爆了 進去的時間點不對，在看一下時間刷
// Enter 可以狂按

// 信用卡帳戶驗證卡號前六碼(?)

// Todo 
// *isTrusted 
// 訂票張數
// 選位置
// redirect game to detail
// areaArr1 .sort (?)，選最貴的區域



// Page flow: game -> verify -> area
const reSelectDOMTime = 10
let answer ="20191231"

let whichActivity = 3 || 3 // 第一場是 1，第二場是 3

let whichArea = 2 // most expensive area ex.2,4,6,8...
let WhichSubArea = 1 // 1 是第一個 subArea ex.1,2,3,4....

// 會有上限問題，等 isTrusted 做好再改 4
let howMuchTickets = 2


const selectActivity =()=>{
    // 火球祭直接跳過 step2 

    // activityArea 代表 一列 以及 立即訂購按鈕 因此，要選第四列，就要選 8，7啦幹 
    let activityArea = document.getElementsByClassName('gridc')
    let activityAreaLengthSubtract1 = activityArea.length -1
    // if ( !activityArea[whichActivity] || activityArea[whichActivity].childNodes[0].innerHTML!== '' ){
    //     console.log("sold out");
    //     // location.reload()
    // }
 
    if (!activityArea[whichActivity] || activityArea[whichActivity].childNodes[0].innerHTML!== '') return setTimeout(function () { 
        selectActivity() 
    }, reSelectDOMTime)
    
    // activityArea[whichActivity].childNodes[0].click()

    // redirect 後 要怎麼處理
    // content_scripts 被迫刷新
    purchase()
}

// step 1.5，答案通常不會一樣
const verify = ()=> {
    // 要給答案嗎?
    // 輸入錯誤的話 enter 之後他會在原視窗，跳 alert，所以只要 focus 第一次就好
    let checkCodeDom = document.getElementById('checkCode')
    if ( !checkCodeDom || checkCodeDom.length < 1) return setTimeout(function () { 
        // console.log('SelectPayment is :', checkCodeDom);
        verify() 
    }, reSelectDOMTime)
    checkCodeDom.focus()
    // checkCodeDom.value = answer
}


// step 2
const selectZone = ()=>{
    // 假如沒有 也要做
    let zone = document.getElementsByClassName('zone area-list')
    // 一個 tab 代表一個 .childNodes[i]
        // 1 是 區域的 title 
        // 2 是 區域的內容 (可點選)
        // 所以選下一個區域要加2
        //     0 是第一個 subArea，1是第二個，依此類推
        //         再一個 0 選到 a tag 
        //             0是 subArea 顏色
        //             1是 區域價位
        //             2是 剩餘數量
        //             有剩的話，color === #FF0000，顯示為 剩餘 x
    // example
    // zone[0].childNodes[2].childNodes[1].childNodes[0].childNodes[2].color === "#FF0000"
            //  第一區        第二個 subArea 

    if( !zone[0] ) return setTimeout(function () { 
        // console.log('SelectPayment is :', zone);
        purchase() 
    }, reSelectDOMTime)
 

    // 假如理想的沒搶到，至少挑一個搶，用 forEach 跑
    if( zone[0].childNodes[whichArea].childNodes[WhichSubArea].childNodes[0].childNodes[2] ){
        zone[0].childNodes[whichArea].childNodes[WhichSubArea].childNodes[0].click()
    } else{
        //    let totalAreaNumber = zone[0].childNodes.length/2 -1
        let areaArr1 = Array.prototype.filter.call(zone[0].childNodes, (e, i) => {
            return i !== 0 && i !== zone[0].childNodes.length -1 && i%2 === 0
        })

        areaArr1.map((area, ind)=>{
            let totalSubAreaNumber = area.childNodes.length 
            Array.prototype.map.call( area.childNodes, ( (subArea, i) => {
                // 可以判斷 childNodes[2] 是不是 undefined，是的話就代表完售，因為完售沒有 grandChild 
                if(subArea.childNodes[0].childNodes[2]){
                    // filter 出來還有票的
                    console.log(ind); //哪一區域的
                    console.log( subArea.childNodes[0] )
                    subArea.childNodes[0].click()
                }
                if(i === totalSubAreaNumber -1){
                    console.log(`Area${ind} tickets are sold out `);
                }
            }))
        })
    }


    // 再來是 選位置 這個要看場地 lol
    
}

// step 3
const purchase = () =>{

    let tickets = document.getElementsByClassName('gridc')

    if (tickets.length < 1) return setTimeout(function () { 
        // console.log('SelectPayment is :', tickets);
        purchase() 
    }, reSelectDOMTime)

    let ticketSelectArea = tickets[0].childNodes[3].childNodes[1]
    if (ticketSelectArea && ticketSelectArea.length < 1) return setTimeout(function () { 
        purchase() 
    }, reSelectDOMTime)

    if (0 < howMuchTickets < ticketSelectArea.length ){
        ticketSelectArea.selectedIndex = howMuchTickets
    }else{
        ticketSelectArea.selectedIndex = ticketSelectArea.length -1 // ticketSelectArea.length -2 -3 
    }



// focus 沒用
    // actually, it works
    let ver = document.getElementById('TicketForm_verifyCode')
    ver.focus()
    console.log("after focus");



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

}

selectActivity()
verify()
selectZone()
purchase()

// window.onload = ()=>{
//     selectActivity()
//     purchase()
// } 