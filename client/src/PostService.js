import axios from 'axios';

const url = 'api/posts/'

class PostService{
    //_____ get posts
    // static getPosts(){
    //     return new Promise( (resolve, reject) =>{
    //         try {
    //             const res =  axios.get(url);
    //             const data = res.data;
    //             resolve(
    //                 data.map(post =>({
    //                     ...post,
    //                     createdAt: new Date(post.createdAt)
    //                 }))
    //             )
    //         } catch (error) {
    //             reject(error)
    //             console.log(error);
    //         }
    //     })
    // }

    static getPosts(){
        return new Promise( (resolve, reject) =>{
            axios.get(url).then((res) =>{
                resolve(res.data.map((post) =>({
                    ...post,
                    createdAt: new Date(post.createdAt)
                })))
            }).catch(reject)
        })
    }
    //___ create posts
    static insertPost(text){
        return axios.post(url, {
            text
        })
    }

    //_____ delete posts
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }
}

export default PostService


