import post from '../model/post.js'
import user from '../model/user.js'
export const createPost = async(req, res)=>{
    try {
        const newPost = await new post(req.body);
        newPost.save();
        return res.status(200).json('post saved successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getAllPosts = async(req, res)=>{
    let category = req.query.category;
    let posts;
    try {
        if(category){
            posts = await post.find({categories: category});
        }else{
            posts = await post.find();
        }
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(100).json({msg: error.message});
    }

}

export const getPost = async(req, res)=>{
    try {
        const currPost = await post.findById(req.params.id);
        if (!currPost) {
            return res.status(404).json({ title: 'Error', message: 'Post not found' });
        }
        return res.status(200).json(currPost);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

export const updatePost = async (req, res)=>{
    try {
        const update = await post.findById(req.params.id);
        if(!update){
            return res.status(404).json({msg: 'post not found'})
        }

        await post.findByIdAndUpdate(req.params.id, {$set: req.body})
        return res.status(200).json({msg: 'post updated successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const deletPost = async (req, res)=> {
    try {
        const delPost = await post.findById(req.params.id);
        if(!delPost){
            return res.status(404).json({msg: 'post not found'})
        }

        await post.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: 'post deleted successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}