const showAlert = require('./alert');
const signUp = async (userName,email,password,passwordConfirm) => {
   
    try{
        console.log(userName,email,password,passwordConfirm);
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:8000/api/User/signUp ',
            data: {
                username: userName,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
                
            },
            withCredentials: true
            
        });
        console.log(res);
        //  if(res.data.status='success') location.reload(true);
        if(res.data.status==='success')
        {
            showAlert('success','sign up successfully');
            window.setTimeout(()=>{
                location.assign('/');
            },1500);
        }
        
        
        
       
    }
    catch(err) {
       
        showAlert("error",err.response.data.message);
    }
     
  };
module.exports = signUp