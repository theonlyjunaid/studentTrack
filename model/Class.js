const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
 class_slug: { type: String, required: true, unique: true },
 class_time: { type: String, required: true },
 class_date: { type: Date, required: true },
 class_name: { type: String, required: true },
 studets_enter_time: { type: Array, required: true },
 teacher_enter_time: { type: String },
 class_duration: { type: String, required: true },
 class_status: { type: String, required: true },
}, { timestamps: true });
export default mongoose.models.Class || mongoose.model('Class', ClassSchema);