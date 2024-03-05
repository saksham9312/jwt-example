const express = require('express')
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json());
const secretKey = "test123"

app.post('/signin', async (req, res, next) => {

  //**************with caching******************
  try {
    const user = req.body

    const newToken = jwt.sign(user,secretKey);

    return res.status(200).json({
        success: true,
        message: "User Signed In",
        token: newToken
    })
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
});

  app.post('/protected-route', async (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const isValid = jwt.verify(token,secretKey);

            if(isValid){
                return res.status(200).json({
                    success: true,
                    message: "User Authorized.",
                    user: isValid
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: "User Not Authorized!",
                    user: isValid
                })  
            }
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token not recognised"
        }) 
    }  

  //**************without caching******************
  // try {
  //   const respone = await axios.get('https://api.spacexdata.com/v3/rockets')
  //   res.send(respone.data)
  // } catch (error) {
  //   res.send(error.message)
  // }
})

app.listen(4000, () => console.log('🚀 on port 4000'))
