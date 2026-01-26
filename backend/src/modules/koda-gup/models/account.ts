import mongoose, { Document, Schema } from "mongoose";

export type Role = "USER" | "ADMIN" | "SUPERADMIN";

export interface Account extends Document {
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<Account>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN", "SUPERADMIN"], default: "USER" },
}, { timestamps: true });

export default mongoose.model<Account>("account", UserSchema);
