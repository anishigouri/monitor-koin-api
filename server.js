
import http from 'http';

const app = require('./config/express')(app);
require('./config/database.js')('mongodb://localhost/koin');

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express Server escutando na porta ${app.get('port')}`);
});
