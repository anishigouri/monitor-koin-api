import winston from '../config/winston';
import sanitize from 'mongo-sanitize';

module.exports = function(app) {

    const Client = app.models.client;

    app.get('/client', async (req, res) => {
        try {
            let clients = await Client.find().exec();
            return res.json(clients);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    app.get('/client/:consumerKey', async (req, res) => {

        let _consumerKey = req.params.consumerKey;

        try {
            let clients = await Client.find({ 'consumerKey': _consumerKey }).exec();
            return res.json(clients);
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }
    });

    app.delete('/client/:id', async (req, res) => {

        let _id = sanitize(req.params.id);

        try {
            await Client.findOneAndRemove({ '_id': _id }).exec();
            return res.status(204).end();
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }
    });

    app.post('/client', async (req, res) => {
        
        const data = {
            'consumerKey': req.body.consumerKey,
            'image': req.body.image,
            '_id': req.body._id
        }

        try {
            if(data._id) {
                let client = await Client.findByIdAndUpdate(data._id, data);
                if(!client) {
                    res.status(500).json({ message: 'Cliente não encontrado' });        
                }
                return res.status(201).json(client);
            } else {
                let client = await Client.create(data);
                return res.status(201).json(client);
            }
        } catch(e) {
            winston.error(e.message);
            res.status(500).json(e);
        }

    });

}