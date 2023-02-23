
 const login = async (email,password) => {
    console.log(email,password);
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:8000/api/User/login',
            data: {
                email,
                password
            }
        });
        console.log(res);
       
    }
    catch(e) {
       
        console.log(e.response.data);
     }
  };
module.exports = login