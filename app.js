var privacyNotice=document.querySelector("#remove");
var privacyDiv=document.querySelector(".main-privacy");

var userName=document.querySelector("#name");
var dateCollector=document.querySelector("#dob");

var submitIco=document.querySelector("#btn-submit");
var form=document.querySelector("#main-form");
var resetIco=document.querySelector("#btn-reset")

var loadingAnimate=document.querySelector(".loading-show")
var outputDiv=document.querySelector(".main-output");
var outputMsg=document.querySelector("#main-msg");
var outputImg=document.querySelector("#main-img")
var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]



function reverseFormat(sentence){
    var sentenceArr=sentence.split("");
    var sentenceArrReversed=sentenceArr.reverse();
    var reversed=sentenceArrReversed.join("");
    return reversed;
}

function checkPalindrome(sentence){
    var reverseSentence=reverseFormat(sentence);
    return sentence===reverseSentence;
}



function convertDateToString(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }else{
        dateStr.day=date.day.toString()
    }

    if(date.month<10){
        dateStr.month='0'+date.month;
    }else{
        dateStr.month=date.month.toString()
    }

    dateStr.year=date.year.toString()
    return dateStr;
}
function getAllDateFormats(date){
    var dateStr=convertDateToString(date);

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyyddmm=dateStr.year+dateStr.day+dateStr.month;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yyddmm=dateStr.year.slice(-2)+dateStr.day+dateStr.month;

    return [ddmmyyyy,mmddyyyy,yyyyddmm,ddmmyy,mmddyy,yyddmm];
}

function checkPalindromeForAllDateFormats(date){
    var status=false;
    var newDateArray=getAllDateFormats(date);
    for(let i of newDateArray){
        if(checkPalindrome(i)){
            status=true;
            break;
        }
    }
    return status
}
function checkLeapYear(year){
    if(year%400===0 || year%4===0 && year%100!==0){
        return true;
    }else{
        return false;
    }

}
function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    if(month===2){
        if(checkLeapYear(year)){
            if(day>29){
                day=1
                month=month+1;
            }
        }else{
            if(day>28){
                day=1
                month=month+1;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month=month+1;
        }
    }
    if(month>12){
        month=1;
        year=year+1;
    }
    
    return {
        day:day,
        month:month,
        year:year
    }
    
}

function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
            ctr++;
            var signal=checkPalindromeForAllDateFormats(nextDate);
            if(signal){
               break; 
            }
               nextDate=getNextDate(nextDate)
               
        }
    return [ctr,nextDate]
}

function getPrevDate(date){
    var day=date.day-1;
    var month=date.month;
    var year=date.year;

    if(month===3){
        if(checkLeapYear(year)){
            if(day<1){
                day=29;
                month=month-1
            }
        }else{
            if(day<1){
                day=28;
                month=month-1;
            }    
        }
    }else{
            if(day<1){
                month=month-1;
                if(month<1){
                    month=12;
                    year=year-1;  
                }
                day=daysInMonth[month-1];
            }
        }

    return{
        day:day,
        month:month,
        year:year
    }
}

function getPrevPalindromeDate(date){
    var ctr=0;
    var prevDate=getPrevDate(date);
    while(1){
            ctr++;
            var signal=checkPalindromeForAllDateFormats(prevDate);
            if(signal){
               break; 
            }
               prevDate=getPrevDate(prevDate)
               
        }
    return [ctr,prevDate]
}

function formResponseHandler(event){
    event.preventDefault();
    var nameValue=userName.value;
    var dobValue=dateCollector.value;

    loadingAnimate.style.display="block";
    outputDiv.style.display='none'

    setTimeout(()=>{
        loadingAnimate.style.display='none'
        outputDiv.style.display='block'
        responseGiver(nameValue,dobValue)
        
    },1500)

}





function responseGiver(nameValue,dobValue){
    var dobSplitter=dobValue.split("-");
    var date={
        day:Number(dobSplitter[2]),
        month:Number(dobSplitter[1]),
        year:Number(dobSplitter[0])
    }
    var checker=checkPalindromeForAllDateFormats(date);
    if(checker){ 
        outputMsg.innerText=`Yay ${nameValue} your birthday is a palindrome`;
        outputDiv.style.backgroundColor='#77ACF1'
        outputMsg.style.color='#FFC107';
        outputImg.src='images/happy-gif.gif'
    }else{
        var [c1,d1]=getNextPalindromeDate(date);
        var [c2,d2]=getPrevPalindromeDate(date);
        var d1Mod=convertDateToString(d1);
        var d2Mod=convertDateToString(d2);
        outputDiv.style.backgroundColor='black'
        outputMsg.innerText=`OOPS ${nameValue}! Your birthday is not a palindrome. The next palindrome date is on ${d1Mod.day}-${d1Mod.month}-${d1Mod.year} which is ${c1} ${c1>1?"days":"day"} away.The previous palindrome date was on ${d2Mod.day}-${d2Mod.month}-${d2Mod.year} which was ${c2} ${c2>1?"days":"day"} away.`
        outputMsg.style.color='#F55C47'
        outputImg.src='images/sad-theme.gif'
    }
    
}
form.addEventListener("submit",(e)=>formResponseHandler(e))
privacyNotice.addEventListener("click",()=>{
    privacyDiv.style.display="none";
})

resetIco.addEventListener("click",()=>{
    privacyDiv.style.display="block";
    userName.value="";
    dateCollector.value="";
    outputDiv.style.display='none';
    outputMsg.innerText='';
    outputImg.src='';
})