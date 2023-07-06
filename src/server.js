const dotenv = require('dotenv').config();
const app = require('./index');
const mongoose = require('mongoose');


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, options)
    .then(() => {
        console.log(`Mongoose default connection to ${process.env.MONGO_URI}`)
    });

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})