import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },
    images: [{
        type: String
    }], 
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;