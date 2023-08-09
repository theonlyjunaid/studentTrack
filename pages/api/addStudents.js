import Class from "@/model/Class";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        if(req.body.studets_enter_time){
        let oldStudents = await Class.findOne({ class_slug: req.body.class_slug },{studets_enter_time:1});
        let oldStudentsArray = oldStudents.studets_enter_time;
        oldStudentsArray.push({
            no_of_students:Number(req.body.studets_enter_time.no_of_students),
            student_type:req.body.studets_enter_time.student_type,
            studets_enter_time: new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
        });
        let oldClass = await Class.findOneAndUpdate({ class_slug: req.body.class_slug},{
            studets_enter_time:oldStudentsArray
        });
        console.log(oldClass);
        let oldClass1 = await Class.findOne({ class_slug: req.body.class_slug});
            try {
                res.status(200).json({ message: 'Students updated successfully', data: oldClass1, success: true });
            } catch (error) {
                res.status(400).json({ message: error.message,success: false });
            }

    }else{
        res.status(400).json({ message: 'Students not found',success: false });
    }
    }
    else {
        res.status(200).json({ message: "Abeyy Padhai likhai karo IAS~YAS Bano" });
    }
}

export default connectDB(handler);
