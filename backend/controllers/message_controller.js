import Conversation from "../models/conversation_model.js";


import Message from "../models/message_model.js"


export const sendMessage=async (req,res) => {
    try {
       senderId=req.id;
       receiverId=req.params.id;
       const {msg}=req.body;

       let conversation =await  Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
       })

       // established conversetion if not yet started 
       if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        });

       }
const newMsg=await Message.create({
    senderId,
    receiverId,
    message:msg
});

if(newMsg){
    conversation.messages.push(newMsg._id);
}
await Promise.all([conversation.save(),newMsg.save()]);



// omplement the socket io to real time data sharing

return res.status(201).json({
    success:true,
    newMsg
})
    } catch (error) {
        console.log(error);
    }
}


export const getMessage =async (req,res) => {
    try {
        const senderId=req.id;
        const receiverId=req.params.id;

        const conversation=await Conversation.find({
            participants:{$all:[senderId,receiverId]}
        });
        if(!conversation){
            res.status(200).json({
                success:true,
                messages:[]
            })
        }
        return res.status(200).json({
            success:true,
            messages:conversation?.message
        })
    } catch (error) {
        
    }
}

