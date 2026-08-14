const jobModel = require('../model/job')
const userModel = require('../model/user')

exports.createJob = async (req, res) => {
    try{
        const {id: userId} = req.user
        const exisitingUser = await userModel.findOne({_id: userId})
        if(!exisitingUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const {title,description,location,jobType,skills,requirements,salary} = req.body

        const newJob = await jobModel({
            title,
            description,
            location,
            jobType,
            skills,
            requirements,
            salary
        })

        await newJob.save()
        res.status(200).json({
            message: "Job created successfully",
            data: newJob
        })

    }catch(error) {
        console.log(error.message);
        res.status(500),json({
            message: "Something went wrong"
        })
    }
}


exports.getOne = async (req, res) => {
    try{
        const {jobId} = req.params
        const job = await jobModel.findOne({_id: jobId})
        if(!job){
            return res.status(404).json({
                message: "Job not found"
            })
        }

        res.status(200).json({
            message: "Job found successfully",
            data: job
        })
    }catch(error) { 
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getAll = async (req, res) => {
    try{
        const job = await jobModel.find()
        res.status(200).json({
            message: "Jobs successfully retrieved",
            data: job,
            count: job.length
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this job"
            });
        }

        await Job.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
};