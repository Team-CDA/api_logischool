const swaggerJsDoc = require('swagger-jsdoc')


const getSwagger = () => {

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: 'Logischool API',
                version: '1.0.0',
                description: 'Welcome to the documentation of our Logischool API. You will find all the available routes there and you can also do tests.'
            }
        },
        apis: ['app.js',
            ,'./routes/*']
    }
    
    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    return swaggerDocs
}



const success = (message, data) => {
    return {api_message: message,
    data: data}
}

module.exports = {success,getSwagger}