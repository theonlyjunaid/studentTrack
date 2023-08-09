import React, { useState } from "react";
import mongoose from "mongoose";
import Class from "../../../model/Class";
import Link from "next/link";
import { useRouter } from "next/router";
const index = ({ Classes, class_name }) => {
    const [classes, setClasses] = useState(Classes)
  const [newClass, setNewClass] = useState({
    class_name: class_name,
    class_time: "",
    class_date: "",
    class_duration: "",
    class_status: "",
  });
  const handleChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newClass);
const res = await fetch("/api/createClass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
    });
    const data = await res.json();
    console.log(data);
    setClasses(data.data)
  };
  console.log(class_name);
  return (
    <div>
      <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-center w-full my-5">
        {class_name} Classes
      </h1>
<div className="w-full flex flex-col">

        {
            classes.map((item,index)=>{
                return(
                    <Link href={`/class/${item.class_name}/${item.class_slug}`} key={index} className='text-xl  text-center m-1 bg-green-200 hover:bg-green-400 border-2 py-3 rounded-lg'>{item.class_name} {item.class_date.slice(0,10)}</Link>
                )
            }
            ).reverse()
        }
</div>
      <div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-5 border m-2 p-2 rounded-lg gap-1"
          >
            <h2 className="text-lg font-medium text-center">Add Class</h2>
            <div className="flex gap-3">
              <label className="text-gray-800 font-sans">Class Time :</label>
              <select
                name="class_time"
                id="class_time"
                className="border px-5 rounded-lg border-black"
                onChange={handleChange}
              >
                <option value="null">class time</option>
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
                <option value="11 AM">11 AM</option>
                <option value="12 PM">12 PM</option>
                <option value="1 PM">1 PM</option>
                <option value="2 PM">2 PM</option>
                <option value="3 PM">3 PM</option>
                <option value="4 PM">4 PM</option>
                <option value="5 PM">5 PM</option>
              </select>
            </div>
            <div className="flex gap-3">
              <label className="text-gray-800 font-sans">Class Date :</label>
              <input
                type="date"
                name="class_date"
                placeholder="class_date"
                className="border px-5 rounded-lg border-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <label className="text-gray-800 font-sans">
                Class Duration :
              </label>
              <select
                name="class_duration"
                id="class_duration"
                className="border px-5 rounded-lg border-black"
                onChange={handleChange}
              >
                <option value="null">class Duration</option>
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hour">2 Hour</option>
              </select>
            </div>
            <div className="flex gap-3">
              <label className="text-gray-800 font-sans">Class Status :</label>
              <select
                name="class_status"
                id="class_status"
                className="border px-5 rounded-lg border-black"
                onChange={handleChange}
              >
                <option value="null">class status</option>

                <option value="Active">Active</option>
                <option value="Teacher_on_leave">Teacher on leave</option>
                <option value="Bunked">Bunked</option>
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
    </div>
  );
};

export default index;
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let class_name = context.params.class_name;
  const Classes = await Class.find({ class_name: class_name });
  return {
    props: {
      Classes: JSON.parse(JSON.stringify(Classes)),
      class_name: class_name,
    },
  };
}
