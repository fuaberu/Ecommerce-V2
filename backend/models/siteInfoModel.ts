import { Document, model, Schema } from "mongoose";

export interface IsiteInfo extends Document {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  categories: string[];
  totalProducts: number;
}

const siteInfoSchema = new Schema({
  _id: Number,
  totalUsers: {
    type: Number,
    default: 0,
  },
  totaOrders: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  totalProducts: {
    type: Number,
    default: 0,
  },
  categories: {
    type: Array,
  },
});

export default model<IsiteInfo>("SiteInfo", siteInfoSchema);
