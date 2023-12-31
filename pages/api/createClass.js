import Class from "@/model/Class";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let oldClass = await Class.findOne({ class_slug: req.body.class_name + req.body.class_date + req.body.class_time });
        if (!oldClass) {
            try {
                const clas = new Class({
                    class_slug: req.body.class_name + req.body.class_date + req.body.class_time,
                    class_time: req.body.class_time,
                    class_date: req.body.class_date,
                    class_name: req.body.class_name,
                    studets_enter_time: [],
                    teacher_enter_time: "",
                    class_duration: req.body.class_duration,
                    class_status: req.body.class_status,
                });
                const claa = await clas.save();
                console.log(claa);
                const classes = await Class.find({ class_name: req.body.class_name });
                res.status(200).json({ message: 'Class created successfully', data: classes, success: true });
            } catch (error) {
                res.status(400).json({ message: error.message,success: false });
            }
        } else {
            res.status(400).json({ message: 'Class already exists',success: false });
        }
    }
    else {
        res.status(200).json({ message: "Abeyy Padhai likhai karo IAS~YAS Bano" });
    }
}

export default connectDB(handler);
