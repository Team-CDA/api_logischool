const swaggerJsDoc = require('swagger-jsdoc')


const getSwagger = () => {

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: 'Logischool API',
                version: '1.0.0',
                description: 'Welcome to the documentation for our Logischool API, where you can find a complete list of available routes and perform tests to ensure optimal functionality.'
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

