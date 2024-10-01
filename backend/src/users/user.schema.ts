import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ default: [] })
  courses: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
