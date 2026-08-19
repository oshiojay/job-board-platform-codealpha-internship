const applicationModel = require('../model/application')
const userModel = require('../model/user')
const jobModel = require('../model/job')
const  resumeModel = require('../model/resume')
const notificationModel = require('../model/notification')

exports.application = async (req, res) => {
    try {
        const {id: userId} = req.user
        const exisitingUser = await userModel.findOne({_id: userId})
        if(!exisitingUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const {jobId, resumeId} = req.params
        const exisitingJob = await jobModel.findOne({_id: jobId})
        if(!exisitingJob){
            return res.status(404).json({
                message: "Job not found"
            })
        }
        const exisitingResume = await resumeModel.findOne({_id: resumeId})
        if(!exisitingResume){
            return res.status(404).json({
                message: "Resume not found"
            })
        }
        const {coverLetter} = req.body

        const newApplication = await applicationModel({
            userId,
            jobId,
            resumeId,
            coverLetter
        })

        await newApplication.save()

        res.status(200).json({
            message: "Application submitted",
            data: newApplication
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params
        const { status } = req.body
        const allowedStatuses = ['pending', 'reviewing', 'shortlisted', 'interview', 'accepted', 'rejected']

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid application status' })
        }

        const application = await applicationModel.findById(applicationId).populate('jobId', 'title userId')
        if (!application) {
            return res.status(404).json({ message: 'Application not found' })
        }

        if (application.jobId.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this application' })
        }

        if (application.status === status) {
            return res.status(200).json({ message: 'Application status is already up to date', data: application })
        }

        application.status = status
        await application.save()

        await notificationModel.create({
            recipientId: application.userId,
            type: 'application_status',
            title: 'Application status updated',
            message: `Your application for ${application.jobId.title} is now ${status}.`,
            jobId: application.jobId._id,
            applicationId: application._id
        })

        res.status(200).json({
            message: 'Application status updated and candidate notified',
            data: application
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

