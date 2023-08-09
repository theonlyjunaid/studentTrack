import Class from "@/model/Class";
import connectDB from "../../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let oldClass = await Class.findOneAndUpdate({ class_slug: req.body.class_name + req.body.class_date + req.body.class_time },{
            teacher_enter_time:req.body.teacher_enter_time
        });
        if (oldClass) {
            try {
                res.status(200).json({ message: 'Teacher Time updated successfully', data: oldClass, success: true });
            } catch (error) {
                res.status(400).json({ message: error.message,success: false });
            }
        }
    }
    else {
        res.status(200).json({ message: "Abeyy Padhai likhai karo IAS~YAS Bano" });
    }
}

export default connectDB(handler);
