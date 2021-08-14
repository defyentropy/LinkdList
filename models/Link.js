import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Each link must have a title"],
        maxlength: [100, "Title cannot be more than 100 characters"] 
    },
    description: {
        type: String,
        maxlength: [200, "Description must not be more than 200 characters"],
        required: [true, "Each link must have a description"]
    },
    hyperlink: {
        type: String,
        required: [true, "Breh. You do realise that the main point is to have a link?"]
    },
    type: {
        type: String,
        maxlength: [10, "Type cannot be more than 10 characters"]
    },
    creator: {
        type: String,
        required: [true, "Each link must have a creator"],
        maxlength: [20, "Creator name cannot be more than 20 characters"]
    },
    tags: {
        type: [String]
    }
})

const LinkModel = mongoose.model("Link", LinkSchema)

export default LinkModel