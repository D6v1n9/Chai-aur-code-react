import React,{useEffect, useState} from "react";
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components/index";


function Allposts() {
    const [posts, setPost] = useState([])
    
    useEffect(()=>{
        appwriteService.getPosts([])    // You can pass further queries in getPost([])
            .then((posts)=>{
                if(posts) {
                    setPost(posts.documnets)
                }
            })
    }, [])

    return (
        <div className="">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts