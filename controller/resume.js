const resumeModel = require('../model/resume')
const userModel = require('../model/user')


exports.submitResume = async (req, res) => {
    try {
        const {id: userId} = req.user
        const exisitingUser = await userModel.findOne({_id: userId})
        if(!exisitingUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const {
            fileName,
            fileUrl,
            fileType,
            skills,
            experience,
            education
        } = req.body

        const newResume = await resumeModel({
            userId,
              fileName,
            fileUrl,
            fileType,
            skills,
            experience,
            education
        })
        await newResume.save()
        res.status(200).json({
            message: "Resume submitted successfully",
            data: newResume
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


exports.update = async (req, res) => {
    try {
        const {resumeId} = req.params;
        const {fileName,fileUrl,fileType,skills,experience,education} = req.body;
        const exisitingResume = await resumeModel.findOne({_id: resumeId})
        if(!exisitingResume){
            return res.status(404).json({
                message: "Resume not found"
            })
        }

        const updatedResume = await resumeModel.updateOne({
            fileName,
            fileUrl,
            fileType,
            skills,
            experience,
            education
        })
        res.status(200).json({
            message: "Resume updated successfully",
            data: updatedResume
        })
    } catch (error){
        console.log(error.meesage);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


exports.deleteResume = async (req, res) => {
    try {
        const {resumeId} = req.params
        const exisitingResume = await resumeModel.findOne({_id: resumeId})
        if(!exisitingResume){
            return res.status(404).json({
                message: "Resume not found"
            })
        }
        await existingMenu.deleteOne()
        res.status(200).json({
            message: "Resume deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}