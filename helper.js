const swaggerJsDoc = require('swagger-jsdoc')


const getSwagger = () => {

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: 'Logischool API',
                version: '1.0.0',
                description: 'Bienvenue sur la documentation de notre API Logischool. Vous y retrouverez toutes les routes disponibles et vous pourrez également faire des tests.'
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