if(localStorage.getItem('status')=='false'){
    alert("Login First!")
    window.location.href = "index.html";
}

var modal = document.getElementById("myModal");

if(localStorage.getItem('firstTime')=='true'){
    modal.style.display = "block";
}

function submitModal(){
var ready=true;
    var savingsAmountSet=document.getElementById('savingsAmountSet').value.trim()
    var monthlyAmountSet=document.getElementById('monthlyAmountSet').value.trim()
    if(savingsAmountSet=='' || monthlyAmountSet==''){
        document.getElementById('modalErr').innerText="Please fill all the fields."
    }else{
        if(document.getElementById('boolPin').checked){
            ready=false;
            var setPin=document.getElementById('setPin').value.trim()
            if(setPin==''){
                document.getElementById('modalErr').innerText="Please set Pin."

            }else if(setPin.length>4 || setPin.length<4){
                document.getElementById('modalErr').innerText="Pin should be of 4 digit only."

            }else{
            localStorage.setItem('pin',setPin)
            ready=true;
            }
   
        }

        if(ready==true){
        localStorage.setItem('savingAccount',savingsAmountSet);
        localStorage.setItem('monthlyAccount',monthlyAmountSet);
        localStorage.setItem('firstTime','false')
        modal.style.display = "none";
        document.getElementById('content').style.display='block'
        }
    
    
    }

}
function check(){
    if(document.getElementById('boolPin').checked){
document.getElementById('pinDiv').style.display='block'; 
   }else{
    document.getElementById('pinDiv').style.display='none'; 
    
    }
}
function dateCal(){
month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var zone="am";
todayDate=new Date;
document.getElementById('date').innerText=` ${todayDate.getDate()}-${month[todayDate.getMonth()]}-${todayDate.getFullYear()}`;
var hour=todayDate.getHours();
if(hour>12){
    var zone="pm";
    hour-=12;
}
var dateNow=`${hour} : ${todayDate.getMinutes()} : ${todayDate.getSeconds()}`
var datetime=` ${todayDate.getDate()}/${month[todayDate.getMonth()]}/${todayDate.getFullYear()}-${hour} : ${todayDate.getMinutes()} : ${todayDate.getSeconds()}`
document.getElementById('time').innerText=dateNow;
document.getElementById('zone').innerText=zone;
return datetime;
}


function shownButton(){
    document.getElementById('hiddenBox').style.display='block';

}


function delAcc(){
    var attemptUsername=prompt("Enter your username to delete ACCOUNT!");
    var attemptPassword=prompt("Enter your password to delete ACCOUNT!");

    if(attemptUsername.trim()===localStorage.getItem('userName') && attemptPassword===localStorage.getItem('userPassword')){
    var check=prompt("Are you sure you want to delete ACCOUNT?Type \"YES\"")
if(check==="YES"){
    localStorage.clear();
    alert("Account Deleted!")
    window.location.href="index.html"
}else{
    alert("Failed to Delete Account!(Reason#090)")
}
}else{
    alert("Failed to Delete Account!(Reason#093)")
}
}
function logout(){
    localStorage.setItem('status','false');
    window.location.href = "index.html";
    alert('Logged Out')

}


function openMonthlyAcc(){
    window.location.href = "monthlyAccount.html";
}

function openSavingAcc(){
    window.location.href = "savingAccount.html";
}


if(document.getElementById('myModal').style.display=='block'){
    document.getElementById('content').style.display='none'
}


    
setInterval(function(){
    dateCal();

},1000)