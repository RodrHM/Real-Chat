import { DataTypes, HasManyCreateAssociationMixin, HasOneCreateAssociationMixin, Model } from "sequelize"
import sequelize from "../db/config"
import ChatRoomSetting from "./ChatRoomSetting"
import Suscription from "./Suscription"
import { ChatroomAttributes, ChatroomCreationAttributes, IdAttribute } from "../customTypes/typesModels"
import Message from "./Message"

// type IdAttribute = number
// interface ChatroomAttributes {
//     id: IdAttribute
//     name: string
//     description: string
//     wishlist: Array<number>
//     historyMessage: Array<number>
// }
// interface ChatroomCreationAttributes extends Optional<ChatroomAttributes, 'id'|'description'|'wishlist'|
// 'historyMessage'/*|'wishlist'|'historyMessage'*/>{}

class ChatRoom extends Model<ChatroomAttributes, ChatroomCreationAttributes>{
    declare id: IdAttribute
    declare wishlist: Array<IdAttribute>
    declare historyMessage: Array<IdAttribute>
    declare usersLimit: number
    
    declare createChatRoomSetting: HasOneCreateAssociationMixin<ChatRoomSetting>

    declare createSuscription: HasOneCreateAssociationMixin<Suscription>

    declare createMessage: HasManyCreateAssociationMixin<Message>

    addNewMessage(new_id_message:IdAttribute){
        let historyMessage = this.historyMessage
        if(historyMessage.length===20) historyMessage.shift()
        historyMessage.push(new_id_message)
        // historyMessage = [...historyMessage, new_id_message]
        this.setDataValue('historyMessage', historyMessage)
        return historyMessage
    }

    // getLastNMessages(n:number){
    //     const historyMessage = this.historyMessage
    //     if(n>historyMessage.length) return historyMessage
    //     else return historyMessage.slice(historyMessage.length-n)
    // }
}

ChatRoom.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    wishlist:{
        type:DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: []
    },
    historyMessage:{
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
    },
    usersLimit:{
        type: DataTypes.INTEGER,
        defaultValue: 50
    }
},{
    sequelize,
    tableName: 'ChatRoom',
    timestamps: false
})

export default ChatRoom