import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to mongo done!");
    } catch (err) {
        console.log(err);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("connected");
});

export default connect