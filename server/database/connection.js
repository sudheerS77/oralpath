import mongoose from "mongoose";

export default async () => {
    return mongoose.connect("mongodb+srv://sudheer:Pssword123@cluster0.wh9d1.mongodb.net/DB?retryWrites=true&w=majority", {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
};