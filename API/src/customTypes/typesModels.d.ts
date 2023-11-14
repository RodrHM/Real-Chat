import { ForeignKey, Optional } from "sequelize";

type IdAttribute = ForeignKey<string>


export interface UserAttributes {
    id: number,
    username: string,
    email: string,
    image: string,
    description: string,
    password: string,
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | "image" | "description" | "password">{}

export interface ChatroomAttributes {
    id: IdAttribute
    // mode: 'grupal'|'private'
    wishlist: Array<IdAttribute>
    historyMessage: Array<IdAttribute>
    usersLimit: number 
}
export interface ChatroomCreationAttributes extends Optional<ChatroomAttributes, 'id'|'wishlist'|'historyMessage'|'usersLimit'/*|'wishlist'|'historyMessage'*/>{}

export interface ChatRoomSettingAttributes {
    id: IdAttribute
    id_chatroom: string
    name: string
    description: string
    category: string[]
    privacy: 'private'|'public' 
}
export interface ChatRoomSettingCreationAttributes extends Optional<ChatRoomSettingAttributes, 'id'>{}


export interface SuscriptionAttributes {
    id: IdAttribute
    id_user: IdAttribute
    id_chatroom: IdAttribute
    role: 'Admin'|'Mod'|'User'
}
export interface SuscriptionCreationAttributes extends Optional<SuscriptionAttributes, 'id'>{}


export interface NotificationMessageAttributes {
    id: IdAttribute
    id_user: IdAttribute
    content: string
    createDate: string
}
export interface NotificationMessageCreationAttributes extends Optional<NotificationMessageAttributes, 'id'|'createDate'> {}


export interface MessageAttributes {
    id: IdAttribute
    id_user: IdAttribute
    id_chatroom: IdAttribute
    content: string
    createDate: Date
}
export interface MessageCreateAttributes extends Optional<MessageAttributes, 'id' | 'createDate'>{}