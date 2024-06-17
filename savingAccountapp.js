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


