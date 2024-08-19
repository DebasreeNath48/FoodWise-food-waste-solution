// models/blackListedTokensModel.js
import mongoose from 'mongoose';

const blackListedTokensSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
});

const BlackListedTokens = mongoose.model('BlackListedTokens', blackListedTokensSchema);

export default BlackListedTokens;
