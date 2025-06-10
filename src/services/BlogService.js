import BlogModel from '../models/BlogModel.js';



export const CreateBlogService = async (req) => { 
    try {
        const { title, post } = req.body;
        const userID = req.user.user_id; // From JWT token
        
        const data = await BlogModel.create({
            title,
            post,
            userID
        });
        
        return { 
            status: "success", 
            data: {
                _id: data._id,
                title: data.title,
                post: data.post,
                userID: data.userID,
                createdAt: data.createdAt
            }
        };
    } catch (e) {
        if (e.name === 'ValidationError') {
            return { status: "fail", message: `Validation error: ${e.message}` };
        }
        return { 
            status: "error", 
            message: "An unexpected error occurred while creating blog",
            systemMessage: e.message 
        };
    }
}


export const readBlogService = async (req) => {
    try {
        const userID = req.user.user_id; 

        // Fetch only blogs belonging to the authenticated user
/*         const data = await BlogModel.find({ userID }).populate('userID', '-password'); 
 */  
       const data = await BlogModel.find().populate('userID', '-password'); 

        if (!data || data.length === 0) {
            return { 
                status: "success", 
                data: [], 
                message: "No blogs found." 
            };
        }

        return { 
            status: "success", 
            data: data 
        };
    } catch (e) {
        console.error("Error in readBlogService:", e);
        return { 
            status: "error", 
            message: "Failed to fetch blogs",
            systemMessage: e.message 
        };
    }
};


export const editBlogService = async (req) => {
    try {
        const { blogID, title, post } = req.body; // Extract blogID and updated fields
        const userID = req.user.user_id; // From JWT token

        // 1. Check if the blog exists and belongs to the user
        const existingBlog = await BlogModel.findOne({ _id: blogID, userID });
        if (!existingBlog) {
            return { 
                status: "fail", 
                message: "Blog not found or you don't have permission to edit it." 
            };
        }

        // 2. Update the blog
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogID,
            { title, post }, // Only update these fields
            { new: true, runValidators: true } // Return updated doc + validate data
        ).populate('userID', '-password');

        return { 
            status: "success", 
            data: updatedBlog,
            message: "Blog updated successfully." 
        };
    } catch (e) {
        console.error("Error in editBlogService:", e);
        if (e.name === 'ValidationError') {
            return { 
                status: "fail", 
                message: `Validation error: ${e.message}` 
            };
        }
        return { 
            status: "error", 
            message: "Failed to edit blog",
            systemMessage: e.message 
        };
    }
};

export const deleteBlogService = async (req) => {
    try {
        const { blogID } = req.body; //blogID from req body
        const userID = req.user.user_id; // JWT token

        //if  blog exists and belongs to the user
        const existingBlog = await BlogModel.findOne({ _id: blogID, userID });
        if (!existingBlog) {
            return { 
                status: "fail", 
                message: "Blog not found or you don't have permission to delete it." 
            };
        }

        // 2. Delete the blog
        await BlogModel.deleteOne({ _id: blogID });

        return { 
            status: "success", 
            message: "Blog deleted successfully." 
        };
    } catch (e) {
        console.error("Error in deleteBlogService:", e);
        if (e.name === 'CastError') {
            return { 
                status: "fail", 
                message: "Invalid blog ID format" 
            };
        }
        return { 
            status: "error", 
            message: "Failed to delete blog",
            systemMessage: e.message 
        };
    }
};


