import mongoose, {Schema, Document} from "mongoose"

export interface IUser extends Document {
    name: string
    surname: string
    email: string
    password?: string
    team: mongoose.Types.ObjectId[]
    role: 'Admin' | 'User'
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    team: {type: Schema.Types.ObjectId, ref: "Team"},
    role: {type: String, enum: ["Admin", "User"], default: "User"}
})

const UserModel = mongoose.model<IUser>("User", UserSchema)
export default UserModel