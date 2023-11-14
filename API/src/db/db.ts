import sequelize from './config'
import User from '../models/User'
import ChatRoom from '../models/Chatroom'
import Message from '../models/Message'
import Suscription from '../models/Suscription'
import NotificationMessage from '../models/NotificationMessage'
import ChatRoomSetting from '../models/ChatRoomSetting'

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        User.hasMany(NotificationMessage, {
            foreignKey:'id_user',
            // sourceKey:'id'
        })
        NotificationMessage.belongsTo(User, {
            foreignKey:'id_user',
            // targetKey:'id'
        })

        User.hasMany(Suscription, {foreignKey:'id_user'})
        Suscription.belongsTo(User, {foreignKey:'id_user'})

        User.hasMany(Message, {foreignKey:'id_user'})
        Message.belongsTo(User, {foreignKey:'id_user'})

        ChatRoom.hasMany(Suscription, {foreignKey: 'id_chatroom'})
        Suscription.belongsTo(ChatRoom, {foreignKey: 'id_chatroom'})

        ChatRoom.hasOne(ChatRoomSetting, {foreignKey:'id_chatroom'})
        ChatRoomSetting.belongsTo(ChatRoom, {foreignKey:'id_chatroom'})

        ChatRoom.hasMany(Message, {foreignKey: 'id_chatroom'})
        Message.belongsTo(ChatRoom, {foreignKey: 'id_chatroom'})
        
        // Sincroniza modelos con la base de datos
        // await User.sync()
        // await ChatRoom.sync()
        // await Message.sync()
        // await Suscription.sync()
        // await NotificationMessage.sync()
        // await ChatRoomSetting.sync()
        // Tu lógica de aplicación aquí

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
  })();

// MODELOS 






//--------

export const conn = sequelize
// export default {
//     User, ChatRoom, Message, Suscription, NotificationMessage, ChatRoomSetting,
//     conn: sequelize
// }
