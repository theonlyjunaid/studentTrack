import React,{useState} from 'react'
import mongoose from "mongoose";
import Class from "../../../../model/Class";
const index = ({Classes}) => {
const [student, setStudent] = useState({
    no_of_students: "",
    student_type: "",
})
const [Students, setStudents] = useState(Classes.studets_enter_time)
const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(student);
        const res = await fetch("/api/addStudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                class_slug: Classes.class_slug,
                studets_enter_time: student,
            }),
        });
        const data = await res.json();
        console.log(data);
        setStudents(data.data.studets_enter_time)
    }
    console.log(Classes)
  return (
    <div>
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-center w-full my-5">
        {Classes.class_name} {Classes.class_date.slice(0,10)}
        </h1>
        <div className="w-full flex flex-col">
        {
            Students.map((item,index)=>{
                return(
                    <div key={index} className='text-xl  text-center m-1 bg-green-200 hover:bg-green-400 border-2 py-3 rounded-lg'>{item.no_of_students} {item.student_type} {item.studets_enter_time.slice(9)}</div>
                )
            }
            ).reverse()
        }
</div>
<div>
<form             className="flex flex-col px-5 border m-2 p-2 rounded-lg gap-1"
onSubmit={handleSubmit}
>
<h2 className="text-lg font-medium text-center">Add Student</h2>
<div className='flex gap-3'>
<label className="text-gray-800 font-sans">No. of Students</label>
<select name="no_of_students" id="no_of_students" className="border px-5 rounded-lg border-black" 
onChange={handleChange}
>
<option value="null">No. of Students</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>

</select>


</div>
<div className="flex gap-3">
<label className="text-gray-800 font-sans">Student Type</label>
<select
name="student_type"
id="student_type"
className="border px-5 rounded-lg border-black"
onChange={handleChange}
>
<option value="null">student type</option>
<option value="Non Hostler"> Non Hostler </option>
<option value="Hostler"> Hostler </option>
</select>
</div>
<button
              type="submit"
              className="bg-gray-900 hover:bg-gray-600 text-white rounded-md py-2"
            >
              {" "}
              Submit
            </button>
</form>
</div>
    </div>
  )
}

export default index

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    let class_name = context.params.class;
    const Classes = await Class.findOne({ class_slug: class_name });
    return {
      props: {
        Classes: JSON.parse(JSON.stringify(Classes)),
        class_name: class_name,
      },
    };
  }
  