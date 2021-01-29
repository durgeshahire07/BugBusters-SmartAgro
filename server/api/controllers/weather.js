const request = require("request")
const dotenv = require("dotenv").config()

var address = ''

// const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${process.env.API_KEY}`

module.exports = {
    weather: (req, res, next) => {
        var info = {};
        address = req.body.location;
        console.log(address)
        request(`http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${process.env.API_KEY}`, (error, response, body) => {
            const data = JSON.parse(body);
            console.log(data);
            info = data;
            console.log(`It's currently ${data.main.temp} outside.`);
            if(body) {
                res.status(200).json({
                    success: true,
                    data: {
                        temp: data.main.temp,
                        main: data.weather[0].main,
                        description: data.weather[0].description,
                    },
                })
            }
            if (error){
                res.status(200).json({
                    success: false,
                    data: data,
                })
            }
        })
        
    }
}