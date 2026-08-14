const mongoose = require("mongoose");

const Schema = mongoose.Schema
const jobSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            enum: [
                "full-time",
                "part-time",
                "contract",
                "internship",
                "remote",
                "hybrid"
            ],
            required: true
        },

        salary: {
            min: {
                type: Number
            },

            max: {
                type: Number
            },

            currency: {
                type: String,
                default: "NGN"
            }
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        requirements: [
            {
                type: String
            }
        ],

        status: {
            type: String,
            enum: ["open", "closed", "draft"],
            default: "open"
        }
    },
    {
        timestamps: true
    }
);

const jobModel = mongoose.model('Job', jobSchema) 

module.exports = jobModel;