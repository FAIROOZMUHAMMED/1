let loginerrorEmail= document.getElementById("loginerrorEmail");
let loginemail= document.getElementById("loginemail");
let loginpassword=document.getElementById("loginpassword");
let loginpasserror=document.getElementById("loginpasserror");


function validatelogin(){
  let regexplog = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)[.]([a-z]{2,3})(\.[a-z]{2,3})?$/g;
  if(loginemail.value==""){
    loginerrorEmail.innerHTML = "Please enter your Email Id";
    loginerrorEmail.style.color ="red";
    loginerrorEmail.style.fontWeight ="thin";
    loginerrorEmail.removeAttribute("hidden",'true');
    loginemail.style.border ="1px solid red";
    loginemail.style.marginBottom="0";
    return false;
  }
  else if(regexplog.test(loginemail.value)){
    loginerrorEmail.setAttribute("hidden",'true');
    loginemail.style.marginBottom="1.2em";
    loginemail.style.border ="1px solid";
    return true;
  }
  else{
    loginerrorEmail.innerHTML = "Invalid Email Id.Please try again.";
    loginerrorEmail.style.color ="red";
    loginerrorEmail.style.fontWeight ="thin";
    loginerrorEmail.removeAttribute("hidden",'true');
    loginemail.style.border ="1px solid red";
    loginemail.style.marginBottom="0";
    return false;
  }
}

function loginvalidatepassword(){
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
  if(loginpassword.value.length == 0){
    loginpasserror.innerHTML ="Password is required";
    loginpasserror.style.color="red";
    loginpassword.style.marginBottom="0";
    loginpassword.style.border="1px solid red";
    loginpasserror.removeAttribute("hidden","true");
      return false;  
  }
  else if(strongRegex.test(loginpassword.value)){
    loginpassword.style.border="1px solid";
    loginpasserror.setAttribute("hidden","true");
    return true;
       
 }
 else if(loginpassword.value.length < 8){
  loginpasserror.innerHTML="Password is too Short";
  loginpasserror.style.color="red";
  loginpassword.style.border="1px solid red";
  loginpasserror.removeAttribute("hidden","true");
  return false;
 }
 else{
  loginpasserror.innerHTML="invalid Password. Please enter valid password";
  loginpasserror.style.color="red";
  loginpassword.style.border="1px solid red";
  loginpasserror.removeAttribute("hidden","true");
     return false;
 } 
}

