import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/config'
import { IdAttribute, UserAttributes, UserCreationAttributes } from '../customTypes/typesModels'

class User extends Model<UserAttributes, UserCreationAttributes>{
    declare id: IdAttribute
    declare username: string
    declare email: string
    declare image: string
    declare description: string
    declare password: string
}

User.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    image:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue: 'https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    password:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue: 'PaswordFalse'
    },
}, {
    sequelize,
    tableName:'User',
    timestamps: false
})

export default User

