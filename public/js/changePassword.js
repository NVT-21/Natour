const showAlert=require('./alert');
const changePassword = async (currenrPassword,password,passwordConfirm) => {
   
    try{
        console.log(currenrPassword,password,passwordConfirm);
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/User/updatePassword',
            data: {
                currentPassword: currenrPassword,
                newPassword: password,
                newPasswordConfirm: passwordConfirm,
            },
            withCredentials: true
            
        });
        console.log(res);
        if(res.data.status==='success')
        {   console.log("haha")
            showAlert('success','Đổi mật khẩu thành công');
            window.setTimeout(()=>{
                location.assign('/');
            },1500);
        }
        //  if(res.data.status='success') location.reload(true);
      
        
        
       
    }
    
        //  if(res.data.status='success') location.reload(true);
        
        
        
       
        catch(err) {
            
            showAlert("error",err.response.data.message);
         }
         
  };
module.exports = changePassword