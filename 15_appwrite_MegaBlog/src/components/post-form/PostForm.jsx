import React, { useCallback, useEffect }  from "react";
import {Button, Input, RTE, Select} from "../index"
import {useForm} from "react-hook-form"
import appwriteService from "../../appwrite/config"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";

export default function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            // There are two conditino for post form either to create or edit a form thus we are doing query
            title: post?.title || "",       // if post does not exit it will five undefined instead of throwing error
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => (state.auth.userData))
    const submit = async(data) => {
        if(post) {
            // Thus have to edit it 
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            // if file is uploaded then delete the previous file 
            if(file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            // Now you also have to update the post 
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,    // Now you have got all the data from the form but have to over write the featuredImage
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // If you dont have post then you have to create one
            // So you will recieve the image form data that you have to upload on appwrite
            const file = await appwriteService.uploadFile(data.image[0]);
            // the id from appwrite is recieved as $id thus in this case it's file.$id
            if(file) {
                // if i have uploaded the file i would create a post, for post you need featuredImage id 
                // Thus your file id is your featuredImage id
                const fileId = file.$id
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost( {
                    ...data,
                    userId: userData.$id
                })

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof(value)==="string") {
            return value
                    .trim() // will remove whitespaces from both end
                    .toLowerCase()
                    .replace(/^[a-zA-Z\d\s]/g, "-")
                    .replace(/\s/g, "-")
        }
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

