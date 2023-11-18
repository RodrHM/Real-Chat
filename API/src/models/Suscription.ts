import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/config'
import { IdAttribute, SuscriptionAttributes, SuscriptionCreationAttributes } from '../customTypes/typesModels'



class Suscription extends Model<SuscriptionAttributes, SuscriptionCreationAttributes>{
    declare id: IdAttribute
    declare id_user: IdAttribute
    declare id_chatroom: IdAttribute
    declare role: 'Admin' | 'Mod' | 'User'
}
Suscription.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull: false,
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
    role:{
        type: DataTypes.ENUM,
        values: ['Admin', 'Mod', 'User'],
        allowNull: false,
        defaultValue: 'User'
    }
}, {
    sequelize,
    tableName:'Suscription',
    timestamps: false
})

export default Suscription
    