// import React from 'react'
// import mongoose from 'mongoose'
// import Class from '../model/Class'
import Link from 'next/link'

const classes=[
  {
    class_name:"MC301 (L)",
  },
  {
    class_name:"MC301 (Lab)",
  },
  {
    class_name:"MC303 (L)",
  },
  {
    class_name:"MC303 (Lab)",
  },
  {
    class_name:"MC305 (L)",
  },
  {
    class_name:"MC305 (Lab)",
  },
  {
    class_name:"MC307 (L)",
  },
  {
    class_name:"MC307 (Lab)",
  },
  {
    class_name:"MC315",
  },
  {
    class_name:"MG301",
  },
  {
    class_name:"MBAMK211",
  },
]

const Index = () => {

  return (
    <div>
<h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-center w-full my-5">
Classes
</h1>
<div className='flex flex-col'>
      {
        classes.map((item,index)=>{
          return(
              <Link href={`/class/${item.class_name}`} key={index} className='text-xl  text-center m-2 bg-green-200 hover:bg-green-400 border-2 py-3 rounded-lg'>{item.class_name}</Link>
          )
          })
      }
      </div>
    </div>
  )
}

export default Index

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGODB_URI);

//   }

//   const Classes = await Class.find({});
//   return {
//       props: {
//         Classes: JSON.parse(JSON.stringify(Classes)),
//       },
//   };
// }