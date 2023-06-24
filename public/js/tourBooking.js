const tourBooking = async (slug) => {
   
    try{
        
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/Tours/tourBookings/:slug',
           
            withCredentials: true
            
        });
        console.log(res);
        //  if(res.data.status='success') location.reload(true);
        
        
        
       
    }
    catch(e) {
       
        console.log(e.response.data);
     }
  };
module.exports = tourBooking;