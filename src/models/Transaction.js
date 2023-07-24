const { model, Schema } = require('mongoose');

const TransactionSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'order',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'cancelled', 'pending'],
      default: 'pending',
    },
    amount: Number,
    currency: String,
    reference: String,
  },
  {
    timestamps: true,
  },
);

module.exports = model('Transaction', TransactionSchema);
