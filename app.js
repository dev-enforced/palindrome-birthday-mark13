const privacyNotice=document.querySelector("#remove");
const privacyDiv=document.querySelector(".main-privacy");

const userName=document.querySelector("#name");
const dateCollector=document.querySelector("#dob");

const submitIco=document.querySelector("#btn-submit");
const form=document.querySelector("#main-form");
const resetIco=document.querySelector("#btn-reset")

const loadingAnimate=document.querySelector(".loading-show")
const outputDiv=document.querySelector(".main-output");
const outputMsg=document.querySelector("#main-msg");
const outputImg=document.querySelector("#main-img")
const daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]



const reverseFormat=(sentence)=>{
    let sentenceArr=sentence.split("");
    let sentenceArrReversed=sentenceArr.reverse();
    let reversed=sentenceArrReversed.join("");
    return reversed;
}

const checkPalindrome=(sentence)=>{
    let reverseSentence=reverseFormat(sentence);
    return sentence===reverseSentence;
}



const convertDateToString=(date)=>{
    let dateStr={day:'',month:'',year:''};
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
const getAllDateFormats=(date)=>{
    let dateStr=convertDateToString(date);

    let ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    let mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    let yyyyddmm=dateStr.year+dateStr.day+dateStr.month;
    let ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    let mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    let yyddmm=dateStr.year.slice(-2)+dateStr.day+dateStr.month;

    return [ddmmyyyy,mmddyyyy,yyyyddmm,ddmmyy,mmddyy,yyddmm];
}

const checkPalindromeForAllDateFormats=(date)=>{
    let status=false;
    let newDateArray=getAllDateFormats(date);
    for(let i of newDateArray){
        if(checkPalindrome(i)){
            status=true;
            break;
        }
    }
    return status
}

const getPalindromeDateFormat=(date)=>{
    let dateFormats=["ddmmyyyy","mmddyyyy","yyyyddmm","ddmmyy","mmddyy","yyddmm"];
    let counter=0;
    let newDateArray=getAllDateFormats(date);
    for(let i=0;i<newDateArray.length;i++){
        if(checkPalindrome(newDateArray[i])){
            counter=i;
            break;
        }
    }
    return dateFormats[counter];
}
const checkLeapYear=(year)=>{
    if(year%400===0 || year%4===0 && year%100!==0){
        return true;
    }else{
        return false;
    }

}
const getNextDate=(date)=>{
    let day=date.day+1;
    let month=date.month;
    let year=date.year;

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

const getNextPalindromeDate=(date)=>{
    let ctr=0;
    let nextDate=getNextDate(date);
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

const getPrevDate=(date)=>{
    let day=date.day-1;
    let month=date.month;
    let year=date.year;

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

const getPrevPalindromeDate=(date)=>{
    let ctr=0;
    let prevDate=getPrevDate(date);
    while(1){
            ctr++;
            let signal=checkPalindromeForAllDateFormats(prevDate);
            if(signal){
               break; 
            }
               prevDate=getPrevDate(prevDate)
               
        }
    return [ctr,prevDate]
}

const formResponseHandler=(event)=>{
    event.preventDefault();
    let nameValue=userName.value;
    let dobValue=dateCollector.value;

    loadingAnimate.style.display="block";
    outputDiv.style.display='none'

    setTimeout(()=>{
        loadingAnimate.style.display='none'
        outputDiv.style.display='block'
        responseGiver(nameValue,dobValue)
        
    },1500)

}





const responseGiver=(nameValue,dobValue)=>{
    let dobSplitter=dobValue.split("-");
    let date={
        day:Number(dobSplitter[2]),
        month:Number(dobSplitter[1]),
        year:Number(dobSplitter[0])
    }
    let checker=checkPalindromeForAllDateFormats(date);
    if(checker){
        let df=getPalindromeDateFormat(date); 
        outputMsg.innerText=`Yay ${nameValue} your birthday is a palindrome in the format ${df}.`;
        outputDiv.style.backgroundColor='#77ACF1'
        outputMsg.style.color='#FFC107';
        outputImg.src='images/happy-gif.gif'
    }else{
        let [c1,d1]=getNextPalindromeDate(date);
        let [c2,d2]=getPrevPalindromeDate(date);
        let df1=getPalindromeDateFormat(d1);
        let df2=getPalindromeDateFormat(d2);
        let d1Mod=convertDateToString(d1);
        let d2Mod=convertDateToString(d2);
        outputDiv.style.backgroundColor='black'
        outputMsg.innerText=`OOPS ${nameValue}! Your birthday is not a palindrome. The next palindrome date is on ${d1Mod.day}-${d1Mod.month}-${d1Mod.year} (format of palindrome: ${df1}) which is ${c1} ${c1>1?"days":"day"} away.The previous palindrome date was on ${d2Mod.day}-${d2Mod.month}-${d2Mod.year} (format of palindrome: ${df2}) which was ${c2} ${c2>1?"days":"day"} away.`
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