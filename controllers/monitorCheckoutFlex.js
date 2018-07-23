import winston from '../config/winston';
import sanitize from 'mongo-sanitize';

module.exports = function(app) {

    const MonitorCheckoutFlex = app.models.monitorCheckoutFlex;
    const Client = app.models.Client;

    app.get('/monitorCheckoutFlex', async (req, res) => {
        try {
            let monitors = await MonitorCheckoutFlex.find().exec();
            return res.json(monitors);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    app.get('/monitorCheckoutFlex/:id', async (req, res) => {

        let _id = req.params.id;

        try {
            let monitors = await MonitorCheckoutFlex.find({ '_id': _id }).exec();
            return res.json(monitors);
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }
    });

    app.delete('/monitorCheckoutFlex/:id', async (req, res) => {

        let _id = sanitize(req.params.id);

        try {
            await MonitorCheckoutFlex.findOneAndRemove({ '_id': _id }).exec();
            return res.status(204).end();
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }
    });

    app.post('/monitorCheckoutFlex', async (req, res) => {
        
        const data = {
            'consumerKey': req.body.consumerKey,
            'initialDate': req.body.inititalDate,
            'finalDate': req.body.finalDate,
            '_id': req.body._id
        }

        try {

            let client = await Client.findOne({ consumerKey: data.consumerKey }).sort('initialDate', -1);

            data.client = client;

            if(data._id) {
                let monitorCheckoutFlex = await MonitorCheckoutFlex.findByIdAndUpdate(data._id, data);
                if(!monitorCheckoutFlex) {
                    res.status(500).json({ message: 'Registro não encontrado' });        
                }
                return res.status(201).json(monitorCheckoutFlex);
            } else {
                let monitorCheckoutFlex = await MonitorCheckoutFlex.create(data);
                return res.status(201).json(monitorCheckoutFlex);
            }
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }

    });

}