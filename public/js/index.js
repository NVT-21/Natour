const loginForm=document.querySelector('#form-login');
const logOutForm=document.querySelector('.logOut');
const changPasswordForm=document.querySelector('.form-user-settings')
const bookingTour=document.querySelector('#Booking');
const signUpForm=document.querySelector("#signUp");
const formUpdateUser=document.querySelector("#updateUser");
const tourBooking=require('./tourBooking')
const signUp=require('./signUp');
const login=require('./login');
const logOut=require('./logout');
const updateUser=require('./updateUser');
var changePassword=require('./changePassword');
console.log(logOutForm)
console.log(formUpdateUser)
console.log(signUpForm)





if (loginForm){
    loginForm.addEventListener('submit', e=>{
        e.preventDefault();
        
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
    
        login(email,password);
    })
}
if (logOutForm){
    logOutForm.addEventListener('click',logOut)  
}
if(changPasswordForm){
    changPasswordForm.addEventListener('submit',e=>{
        e.preventDefault();
        const currentPassword=document.getElementById('password-current').value;
        const password=document.getElementById('password').value;
        const passwordConfirm=document.getElementById('password-confirm').value;
        changePassword(currentPassword,password,passwordConfirm)
    })
}
if(bookingTour){
    bookingTour.addEventListener('submit',e=>{
        e.preventDefault();
        
        tourBooking(slug);
    })
}
if (signUpForm){
    signUpForm.addEventListener('submit',e=>{
        e.preventDefault();
        const userName=document.getElementById('username').value;

        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const passwordConfirm=document.getElementById('password-confirm').value;
        signUp(userName,email,password,passwordConfirm)
    })

}
if(formUpdateUser){
    formUpdateUser.addEventListener('submit',e=>{
        e.preventDefault();
        const form=new FormData();
        form.append('username',document.getElementById('username').value)
        form.append('photo',document.getElementById('photo').files[0])
        // const data = Object.fromEntries(form.entries());
        // console.log(data);
        updateUser(form)
    })
}

