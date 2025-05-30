import React from "react";

// function Card({username, btnText = "defaultValue"}) {
//     // console.log(username)    
//     return (
//         <div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 bg-white rounded-xl mb-4">
//         <img
//           class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
//           src="https://tailwindcss.com/_next/static/media/erin-lindford.90b9d461.jpg"
//           alt=""
//         />
//         <div class="space-y-2 text-center sm:text-left">
//           <div class="space-y-0.5">
//             <p class="text-lg font-semibold text-black">{username}</p>
//             <p class="font-medium text-gray-500">Product Engineer</p>
//           </div>
//           <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
//             {btnText}
//           </button>
//         </div>
//       </div>
//     )
// }
function Card(props) {
    console.log(props) // this is an object
    return (
        <div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 bg-white rounded-xl mb-4">
        <img
          class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
          src="https://tailwindcss.com/_next/static/media/erin-lindford.90b9d461.jpg"
          alt=""
        />
        <div class="space-y-2 text-center sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg font-semibold text-black">{props.username}</p>
            <p class="font-medium text-gray-500">Product Engineer</p>
          </div>
          <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
            {props.btnText}
          </button>
        </div>
      </div>
    )
}

export default Card;