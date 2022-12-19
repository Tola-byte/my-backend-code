import mongoose, { Schema } from "mongoose";

const sectorSchema = new Schema({
  name: {
    type: String,
   // required: true,
    path: "name"
  },
});

sectorSchema.methods.toJSON = function () {
  const sector = this;
  const sectorObject = sector.toObject();
  delete sectorObject.__v;
  return sectorObject;
};

const sectorModel = mongoose.model("Sector", sectorSchema);

export default sectorModel;
