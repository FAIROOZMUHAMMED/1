let erroruser= document.getElementById("erroruser");
let user= document.getElementById("user");
let errorEmail= document.getElementById("errorEmail");
let email= document.getElementById("email");
let password=document.getElementById("password");
let passerror=document.getElementById("passerror");
let confirmPassword=document.getElementById("confirmPassword");
let errpwd=document.getElementById("errpwd");

function validatename(){
  let regexp = /^(([A-Z][a-z]+)|([A-Z][A-Z][A-Z]+))$/g;
  if(user.value==""){
    erroruser.innerHTML = "Please enter your User Name";
    erroruser.style.color ="red";
    erroruser.style.fontWeight ="thin";
    erroruser.removeAttribute("hidden",'true');
    user.style.border ="1px solid red";
    user.style.marginBottom="0";
    return false;
  }
  else if(regexp.test(user.value.trim())){
    erroruser.setAttribute("hidden",'true');
    user.style.marginBottom="1.2em";
    user.style.border ="1px solid";
    return true;
  }
  else{
    erroruser.innerHTML = "Please Enter Proper Format.";
    erroruser.style.color ="red";
    erroruser.style.fontWeight ="thin";
    erroruser.removeAttribute("hidden",'true');
    user.style.border ="1px solid red";
    user.style.marginBottom="0";
    return false;
  }
}

function validate1(){
    let regexp = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)[.]([a-z]{2,3})(\.[a-z]{2,3})?$/g;
    if(email.value==""){
      errorEmail.innerHTML = "Please enter your Email Id";
      errorEmail.style.color ="red";
      errorEmail.style.fontWeight ="thin";
      errorEmail.removeAttribute("hidden",'true');
      email.style.border ="1px solid red";
      email.style.marginBottom="0";
      return false;
    }
    else if(regexp.test(email.value.trim())){
      errorEmail.setAttribute("hidden",'true');
      email.style.marginBottom="1.2em";
      email.style.border ="1px solid";
      return true;
    }
    else{
      errorEmail.innerHTML = "Invalid Email Id.Please try again.";
      errorEmail.style.color ="red";
      errorEmail.style.fontWeight ="thin";
      errorEmail.removeAttribute("hidden",'true');
      email.style.border ="1px solid red";
      email.style.marginBottom="0";
      return false;
    }
  }
  
  
   function validatepassword(){
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])(?=.*\\W))|((?=.*[a-z])(?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*[a-z])(?=.*\\W))).*$", "g");
    var enoughRegex = new RegExp("(?=.{5,}).*", "g");
    if(password.value.length === 0){
        passerror.innerHTML ="Password is required";
        passerror.style.color="red"; 
        password.style.border="1px solid red";
        return false;  
    }
   else if(false === enoughRegex.test(password.value)){
     passerror.innerHTML="More character";
     passerror.style.color="blue";
     password.style.border="1px solid blue";
     return false;
   }
   else if(strongRegex.test(password.value)){
      passerror.innerHTML="Strong";
      passerror.style.color="green";
      password.style.border="1px solid green";
      return true;
         
   }
   else if(mediumRegex.test(password.value)){
       passerror.innerHTML="Medium";
       passerror.style.color="orange";
       password.style.border="1px solid orange";
       return false;
   }
   else{
       passerror.innerHTML="Poor";
       passerror.style.color="red";
       password.style.border="1px solid red";
       return false;
   } 
  }
  
  function confirmpassword(){
    if(confirmPassword.value===""){
        errpwd.innerHTML="Confirm your password";
        errpwd.removeAttribute("hidden",'true');
        errpwd.style.color="red";
        confirmPassword.style.border="1px solid red";
        return false;
    }
    else if(password.value===confirmPassword.value){
        errpwd.innerHTML="Password is";
        errpwd.setAttribute("hidden",'true');
        confirmPassword.style.border="1px solid";
        return true;
    } 
    else{
        errpwd.innerHTML="Those passwords didn't match. Try again";
        errpwd.style.color="red";
        confirmPassword.style.border="1px solid red";
        errpwd.removeAttribute("hidden",'true');
        return false;
    }
  }