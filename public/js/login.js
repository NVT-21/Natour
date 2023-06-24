const showAlert=require('./alert');
 const login = async (email,password) => {
   
    try{
        console.log(email,password);
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/User/login ',
            data: {
                email,
                password
            },
            withCredentials: true
            
        });
        console.log(res);
        if(res.data.status==='success')
        {
            showAlert('success','login successful');
            window.setTimeout(()=>{
                location.assign('/');
            },1500);
        }
        //  if(res.data.status='success') location.reload(true);
        
        consolog(res)
        
       
    }
    catch(err) {
       
        showAlert("error",err.response.data.message);
     }
  };
module.exports = login