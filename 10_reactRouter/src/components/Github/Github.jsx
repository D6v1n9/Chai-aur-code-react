import React from "react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

// As i render this componenet i want to call and API and get the followers and avatar
// So as directly in the render we want some functionality as the lifecycle begin thus use useEffect() hook

function Github() {
    // Method-1
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch("https://api.github.com/users/hiteshchoudhary")
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log(res);
    //         setData(res)
    //     });
    // }, []);

    // Method-2
    const data = useLoaderData()
    // Now you can directly get data.followers and data.avatar_url

    return (
        <div className="bg-gray-500 text-3xl text-blue-50">
        Github followers : {data.followers}
        <img src="{data.avatar_url}" alt="Git picture" width={300}/>
        </div>
    );

}

export default Github;

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json();
}


