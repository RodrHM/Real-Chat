import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/config'
import { IdAttribute, NotificationMessageAttributes, NotificationMessageCreationAttributes } from '../customTypes/typesModels'

class NotificationMessage extends Model<NotificationMessageAttributes, NotificationMessageCreationAttributes>{
    declare id: IdAttribute
    declare id_user: IdAttribute
    declare content: string
    declare additionalData: object
    declare createDate: string
}

NotificationMessage.init({
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
        allowNull: false,
        references:{
            model:'User',
            key:'id'
        }
    },
    additionalData:{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
        set(value){
            if(!value) this.setDataValue('additionalData', {})
            else this.setDataValue('additionalData', value)
        }
    },
    createDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize,
    tableName:'NotificationMessage',
    timestamps: false
})

export default NotificationMessage
