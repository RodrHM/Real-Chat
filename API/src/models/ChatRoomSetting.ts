import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/config'
import ChatRoom from './Chatroom'
import { ChatRoomSettingAttributes, ChatRoomSettingCreationAttributes, IdAttribute } from '../customTypes/typesModels'

class ChatRoomSetting extends Model<ChatRoomSettingAttributes, ChatRoomSettingCreationAttributes>{
    declare id: IdAttribute
    declare id_charoom: string
    declare name: string
    declare description: string
    declare category: string[]
    declare privacy: 'private'|'public'
}

ChatRoomSetting.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    id_chatroom:{
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model:ChatRoom,
            key: 'id'
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    description:{
        type: DataTypes.TEXT,
        defaultValue:''
    },
    category:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: []
    },
    privacy:{
        type: DataTypes.ENUM,
        values: ['private','public'],
        allowNull: true,
        defaultValue: 'private'
    }

}, {
    sequelize,
    tableName:'ChatRoomSetting',
    timestamps: true
})

export default ChatRoomSetting