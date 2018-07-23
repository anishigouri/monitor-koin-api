import express from 'express';
import bodyParser from 'body-parser';
import consign from 'consign';
import winston from './winston.js';
import morgan from 'morgan';
//Autenticação
//Usado para segurança da aplicação, ocultar header e etc...
//import helmet from 'helmet';


module.exports = function() {

    let app = express();

    app.set('port', 3000);

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

    //Usado para escrever log
    app.use(morgan('combined', { stream: winston.stream }));

    consign()
        .include('models')
        .then('controllers')
        .into(app);

    process.on('uncaughtException', function(err) {
        console.log(err);
    });

    return app;

}

/*
module.exports = function() {
    var app = express();

    //configuração de ambiente
    app.set('port', 3000);

    //middleware
    //app.use(express.static('./public'));

    //permite acessar o os dados da requisição através de req.body
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

    //app.use(morgan("dev"));

    //Informamos qual verbo pretendemos usar(GET, POST...)
    //app.use(require('method-override')());

    /*
    app.use(helmet());

    app.use(helmet.xframe());

    app.use(helmet.xssFilter());

    app.use(helmet.nosniff());
    

    //Esconde a tecnologia usada na aplicação
    //app.disable('x-powered-by');

    //Gera um informação falsa sobre a aplicação
    //app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));

    //Informa para a variável app conhecer a pasta controllers
    consign()
        .include('models')
        .then('controllers')
        .into(app);

    process.on('uncaughtException', function(err) {
        console.log(err);
    });

    return app;

}*/