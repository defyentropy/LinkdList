import mongoose from "mongoose";

// Schema for a link
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Each group must have a name"],
    maxlength: [20, "Group name cannot be more than 20 charcters"],
  },
  description: {
    type: String,
    required: [true, "Each group must have a description"],
    maxlength: [100, "Group description cannot be more than 100 characters"],
  },
  owner: {
    type: String,
    required: [true, "Each group must have an owner"],
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
