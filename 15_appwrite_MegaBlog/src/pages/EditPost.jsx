import React, {useEffect, useState} from "react";
import appwriteService from "../appwrite/config"
import {Container, PostForm} from "../components/index"
import { useNavigate, useParams } from "react-router-dom";


function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if(post) {
                        setPosts(post)
                    }
                })
        } else {
            navigate("/")
        }
    }, [slug, navigate]) 

//  Why it's there: To satisfy React's useEffect dependency rule and prevent linter warnings.
//  What happens if you remove it: Likely nothing breaks now, but you'll get an ESLint warning.
//  Is it functionally necessary? No — navigate doesn’t change between renders.
//  Best practice? Yes, include it to keep the code clean and avoid warnings.

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
  ) : null
}

export default EditPost