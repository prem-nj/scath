const mongoose=require("mongoose");



const connectDB=async ()=>{
   try{

       const conn=mongoose.connect(process.env.MONGODB_URL)
           
       console.log(` MongoDB Connected: ${conn.connection.host}`)
   }
   catch(error){
    console.error(' MongoDB connection FAILED:', error.message);
    process.exit(1); // Critical: exit on connection failure
   }
}

const db=mongoose.connection;

db.on('error', (err) => {
  console.error(' Mongoose default connection error:', err);
});

db.on('disconnected', () => {
  console.warn(' Mongoose default connection disconnected');
});


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 MongoDB connection closed through app termination');
  process.exit(0);
});

mongoose.export=connectDB;