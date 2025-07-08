import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password?: string
  plan: 'freemium' | 'standard' | 'premium' | 'pro' | 'platinum'
  reportsCount: number
  reportsLimit: number
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  plan: {
    type: String,
    enum: ['freemium', 'standard', 'premium', 'pro', 'platinum'],
    default: 'freemium',
  },
  reportsCount: {
    type: Number,
    default: 0,
  },
  reportsLimit: {
    type: Number,
    default: 5,
  },
}, {
  timestamps: true,
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await hash(this.password, 12)
  }
  next()
})

userSchema.pre('save', function(next) {
  const planLimits = {
    freemium: 5,
    standard: 50,
    premium: 200,
    pro: 500,
    platinum: -1,
  }
  
  this.reportsLimit = planLimits[this.plan]
  next()
})

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema) 