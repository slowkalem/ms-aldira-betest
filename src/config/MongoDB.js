const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL


mongoose.Promise = global.Promise;
mongoose.connect(mongo_url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connected Successfully!');
}).catch((e) => {
    console.log('Could not connect to the database', e);
    process.exit();
});

