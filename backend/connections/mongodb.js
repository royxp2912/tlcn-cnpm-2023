import mongoose from 'mongoose';

const connect = async () => {
    try {
        // mongodb online
        // await mongoose.connect(process.env.MONGO);

        // mongodb local
        await mongoose.connect('mongodb://localhost:27017/shoeshop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to mongo done!');
    } catch (err) {
        console.log(err);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('connected');
});

export default connect;
