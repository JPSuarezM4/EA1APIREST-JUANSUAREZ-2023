
const app = require('./app')
const { mongoConn } = require('./databases/configuration')
const dotenv = require('dotenv').config()

app.set('port', process.env.PORT || 3000 )//middleware


//console.log(mongoConn)

const conn = mongoConn()
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto: ${app.get('port')}`);
  });

  