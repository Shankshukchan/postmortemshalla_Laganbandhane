const mongoose = require('mongoose');
 
const userTableSchema=new mongoose.Schema({
    FullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,default:"Test@12345"},
    profileImage: { type: String, default: '' },
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
});
const userTable=mongoose.model('userTable',userTableSchema); 

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userTable', required: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    details: { type: String },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports={
    userTable,
    Transaction
};