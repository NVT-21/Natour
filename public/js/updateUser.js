const showAlert = require('./alert');
const updateUser = async (data) => {
   
    try{
        console.log("update",data.photo);
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:8000/api/User/updateUser ',
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
            data,
                
        
            withCredentials: true
            
        });
        console.log(res);
        //  if(res.data.status='success') location.reload(true);
        if(res.data.status==='success')
        {
            showAlert('success','Sua thong tin thanh cong');
            // window.setTimeout(()=>{
            //     location.assign('/');
            // },1500);
        }
        
        
        
       
    }
    catch(err) {
       
       console.log(err);
    }
     
  };
module.exports = updateUser