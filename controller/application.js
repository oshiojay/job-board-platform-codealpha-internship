const {applicationModel, userModel, jobModel, resumeModel} = require('../model')


exports.application = async (req, res) => {
    try {
        const {id: userId} = req.user
        const existingUser = await userModel.findOne({_id: userId})
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

