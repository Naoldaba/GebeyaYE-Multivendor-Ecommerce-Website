
const express= require('express');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.json());

function performBankTransfer(amount, senderAccount, recieverAccount){

    const validateAccountNumbers=/^[0-9]{15}$/g;

    if (!validateAccountNumbers.test(senderAccount) || !validateAccountNumbers.test(recieverAccount)){
        return {success: false, message: "Invalid account number format"}
    }

    return {success: true, message: `Transferred ${amount}Br from ${senderAccount} to ${recieverAccount}.`}
}

app.post('/checkout', (req, res)=>{
    const {amount, senderAccount, recieverAccount}= req.body;

    const tranferResult=performBankTransfer(amount, senderAccount, recieverAccount);

    if (tranferResult.success){
        res.json(tranferResult);
    } else{
        res.status(400).json(tranferResult)
    }
})

const PORT= 4000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})