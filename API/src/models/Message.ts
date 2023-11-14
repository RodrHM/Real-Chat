import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/config'
import { IdAttribute, MessageAttributes, MessageCreateAttributes } from '../customTypes/typesModels'

class Message extends Model<MessageAttributes, MessageCreateAttributes>{
    declare id: IdAttribute
    declare id_user: IdAttribute
    declare id_chatroom: IdAttribute
    declare content: string
    declare createDate: Date
}

Message.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model: 'User',
            key:'id'
        }
    },
    id_chatroom:{
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model: 'ChatRoom',
            key:'id'
        }
    },
    createDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize,
    tableName:'Message',
    timestamps: false
})

export default Message