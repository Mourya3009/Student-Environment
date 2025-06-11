import mongoose from 'mongoose';

mongoose.connect(`mongodb://127.0.0.1:27017/Student-Environment`)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log("error: ",err);
})

// module.exports = mongoose.connection;
export default mongoose.connection;