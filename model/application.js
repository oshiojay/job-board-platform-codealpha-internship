const mongoose = require('mongoose')

const Schema = mongoose.Schema
const applicationSchema = new Schema({
     userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        coverLetter: {
            type: String
        },

        status: {
            type: String,
            enum: [
                "pending",
                "reviewing",
                "shortlisted",
                "interview",
                "accepted",
                "rejected"
            ],
            default: "pending"
        },

        appliedAt: {
            type: Date,
            default: Date.now
        }


}, {timestamps: true})

const applicationModel = mongoose.model('Application', applicationSchema);

module.exports = applicationModel;
    