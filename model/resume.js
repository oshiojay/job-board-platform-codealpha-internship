const mongoose = require("mongoose");

const Schema = mongoose.Schema
const resumeSchema = new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fileName: {
            type: String,
            required: true
        },

        fileUrl: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            enum: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ],
            required: true
        },
        skills: [
            {
                type: String
            }
        ],
        experience: {
            type: String
        },

        education: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const resumeModel = mongoose.model('Resume', resumeSchema);

module.exports = resumeModel;