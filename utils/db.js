import mongoose from 'mongoose';
const connection = {}

async function connectDb(){
    if(connection.isConnected){
        console.log("connect success");
        return
    }
    if(mongoose.connections.length > 0){
        connection.isConnected = mongoose.connections[0].readyState
        if(connection.isConnected === 1){
            console.log('Use previous connect ti the database');
            return
        }
        await mongoose.disconnect()

    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('new db connection');
    connection.isConnected = db.connections[0].readyState
}

async function disconnectDb(){
    if(connection.isConnected){
        if(process.env.NODE_END === 'production'){
            await mongoose.disconnect();
                connection.isConnected = false;  
        }else{
            console.log('not disconnect from database');
        }
    }
}
const db = {connectDb, disconnectDb}

export default db