const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        
        console.log(token);
        
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }else{
            const decoded = jwt.verify(token, 'code')
            req.user = decoded
            next()    
            return res.status(200).json({message: "авторизован"})
        }
       
    } catch (e) {
        res.status(401).json({message: "Не авторизованs"})
    }
}