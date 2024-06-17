if(localStorage.getItem('status')=='false'){
    console.log("status fail")
    window.location.href = "index.html";
}
if(!localStorage.getItem('pin')){
    document.getElementById('myModal').style.display="none";
    localStorage.setItem('status2', 'true');
    document.getElementById('content').style.display="block";
}else{
    document.getElementById('content').style.display="none";
    document.getElementById('myModal').style.display="block";

}


function submitPin(){
    var pin1=document.getElementById('in1').value;
    var pin2=document.getElementById('in2').value;
    var pin3=document.getElementById('in3').value;
    var pin4=document.getElementById('in4').value;
var attemptPin=pin1+pin2+pin3+pin4;
    if(attemptPin===localStorage.getItem('pin')){
       document.getElementById('myModal').style.display="none";
       document.getElementById('content').style.display="block";
       localStorage.setItem('status2', 'true');

    }else{
        alert("Wrong Pass");
        window.location.href = "main.html";
    }
}
function dateCal(){
    month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var zone="am";
    todayDate=new Date;
    var hour=todayDate.getHours();
    if(hour>12){
        var zone="pm";
        hour-=12;
    }
    var datetime=` ${todayDate.getDate()}/${month[todayDate.getMonth()]}/${todayDate.getFullYear()}-${hour} : ${todayDate.getMinutes()} : ${todayDate.getSeconds()}`
    document.getElementById('timeOnCard').innerHTML=`<p>&nbsp;&nbsp;&nbsp;${hour} : ${todayDate.getMinutes()}<p/>`;
    document.getElementById('dateOnCard').innerText=` ${todayDate.getDate()}-${month[todayDate.getMonth()]}-${todayDate.getFullYear()}`;
    return datetime;
}
loadData();

function loadData(){
    dateCal();
    document.getElementById('CARDHOLDERNAME').innerText=localStorage.getItem('Name');
    document.getElementById('balanceShow').innerHTML=`<b>Current Balance:</b>${localStorage.getItem('savingAccount')}`
    populateTransactionHistory();
}



function populateTransactionHistory() {
    var types = JSON.parse(localStorage.getItem('type')) || [];
    var reasons = JSON.parse(localStorage.getItem('savingAmountReason')) || [];
    var amounts = JSON.parse(localStorage.getItem('savingAmountHistory')) || [];
    var dates = JSON.parse(localStorage.getItem('savingHistory')) || [];

    var transactionBox = document.getElementById('transactionBox').getElementsByTagName('tbody')[0];
    transactionBox.innerHTML = '';

    for (var i = 0; i < types.length; i++) {
        var row = document.createElement('tr');
        row.classList.add(types[i]);

        var typeCell = document.createElement('td');
        typeCell.textContent = types[i];
        row.appendChild(typeCell);

        var reasonCell = document.createElement('td');
        reasonCell.textContent = reasons[i];
        row.appendChild(reasonCell);

        var amountCell = document.createElement('td');
        amountCell.textContent = amounts[i];
        row.appendChild(amountCell);

        var dateCell = document.createElement('td');
        dateCell.textContent = dates[i];
        row.appendChild(dateCell);

        transactionBox.appendChild(row);
    }
}






function transaction() {
    var reason = document.getElementById('reason').value.trim();
    var amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0 || !reason==='' || !amount=='') {
        var currentBalance = parseFloat(localStorage.getItem('savingAccount')) || 0;

        if (document.getElementById('checkbox').checked) {
            document.getElementById('err').innerText="";
            currentBalance += amount;
            updateTransactionDetails('credit', reason, amount);
           
        } else {
            if(currentBalance<amount){
                document.getElementById('err').innerText="Not enough balance";

            }else{
                document.getElementById('err').innerText="";
            currentBalance -= amount;
            updateTransactionDetails('debit', reason, amount);
            
            }
        }

        localStorage.setItem('savingAccount', currentBalance);
    }else{
        document.getElementById('err').innerText="Please enter correct data";

    }

    document.getElementById('reason').value='';
    document.getElementById('amount').value='';

    loadData();
}

function updateTransactionDetails(type, reason, amount) {
    var savingAmountReason = JSON.parse(localStorage.getItem('savingAmountReason')) || [];
    savingAmountReason.push(reason);
    localStorage.setItem('savingAmountReason', JSON.stringify(savingAmountReason));

    var savingHistory = JSON.parse(localStorage.getItem('savingHistory')) || [];
    savingHistory.push(dateCal());
    localStorage.setItem('savingHistory', JSON.stringify(savingHistory));

    var savingAmountHistory = JSON.parse(localStorage.getItem('savingAmountHistory')) || [];
    savingAmountHistory.push(amount);
    localStorage.setItem('savingAmountHistory', JSON.stringify(savingAmountHistory));

    var typeHistory = JSON.parse(localStorage.getItem('type')) || [];
    typeHistory.push(type);
    localStorage.setItem('type', JSON.stringify(typeHistory));

}

function takemeBack(){
    localStorage.setItem('status2','false');
    window.location.href = "main.html";

}


function logout(){
    localStorage.setItem('status','false');
    window.location.href = "index.html";
    alert('Logged Out')

}