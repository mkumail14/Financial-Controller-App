if(localStorage.getItem('status')=='false'){
    console.log("status fail")
    window.location.href = "index.html";
}

loadData();


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
    return datetime;
}


function loadData(){
    dateCal();
    document.getElementById('balanceShow').innerHTML=`${localStorage.getItem('monthlyAccount')}`
    populateTransactionHistory();
}


function populateTransactionHistory() {
    var type1s = JSON.parse(localStorage.getItem('type1')) || [];
    var reasons = JSON.parse(localStorage.getItem('monthlyAmountReason')) || [];
    var amounts = JSON.parse(localStorage.getItem('monthlyAmountHistory')) || [];
    var dates = JSON.parse(localStorage.getItem('monthlyHistory')) || [];
    var transactionBox = document.getElementById('transactionBox').getElementsByTagName('tbody')[0];
    transactionBox.innerHTML = '';
    for (var i = 0; i < type1s.length; i++) {
        var row = document.createElement('tr');
        row.classList.add(type1s[i]);
        var type1Cell = document.createElement('td');
        type1Cell.textContent = type1s[i];
        row.appendChild(type1Cell);
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
        var currentBalance = parseFloat(localStorage.getItem('monthlyAccount')) || 0;

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

        localStorage.setItem('monthlyAccount', currentBalance);
    }else{
        document.getElementById('err').innerText="Please enter correct data";

    }

    document.getElementById('reason').value='';
    document.getElementById('amount').value='';

    loadData();
}

function updateTransactionDetails(type1, reason, amount) {
    var monthlyAmountReason = JSON.parse(localStorage.getItem('monthlyAmountReason')) || [];
    monthlyAmountReason.push(reason);
    localStorage.setItem('monthlyAmountReason', JSON.stringify(monthlyAmountReason));

    var monthlyHistory = JSON.parse(localStorage.getItem('monthlyHistory')) || [];
    monthlyHistory.push(dateCal());
    localStorage.setItem('monthlyHistory', JSON.stringify(monthlyHistory));

    var monthlyAmountHistory = JSON.parse(localStorage.getItem('monthlyAmountHistory')) || [];
    monthlyAmountHistory.push(amount);
    localStorage.setItem('monthlyAmountHistory', JSON.stringify(monthlyAmountHistory));

    var type1History = JSON.parse(localStorage.getItem('type1')) || [];
    type1History.push(type1);
    localStorage.setItem('type1', JSON.stringify(type1History));

}


function takemeBack(){
    window.location.href = "main.html";

}

function logout(){
    localStorage.setItem('status','false');
    window.location.href = "index.html";
    alert('Logged Out')

}