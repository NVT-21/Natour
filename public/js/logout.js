const logOut=async()=>{
    try{
        
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/User/logOut ',
           
           
            
            
        });
        console.log(res);
        if(res.data.status='success') location.assign('/');
}
catch(err){
    console.log(err);
}
}
module.exports =logOut;