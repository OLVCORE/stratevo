import mongoose from 'mongoose'

export interface IReport extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  companyName: string
  cnpj: string
  website?: string
  data: {
    cadastral: any
    financial: any
    digital: any
    commercial: any
    supplyChain: any
    news: any
    swot: any
  }
  status: 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

const reportSchema = new mongoose.Schema<IReport>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  data: {
    cadastral: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    financial: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    digital: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    commercial: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    supplyChain: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    news: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    swot: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
}, {
  timestamps: true,
})

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema) 