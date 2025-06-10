
import { CreateBlogService,readBlogService,editBlogService,deleteBlogService } from '../services/BlogService.js';


export const createblog = async (req, res) => {
    try {
        let result = await CreateBlogService(req); 
        if (result.status === "success") {
            return res.status(201).json(result); 
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Post writing error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

export const readblog = async (req, res) => {
    try {
        let result = await readBlogService(req); 
        if (result.status === "success") {
            return res.status(200).json(result); 
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Post reading error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const editblog = async (req, res) => {
    try {
        let result = await editBlogService(req); 
        if (result.status === "success") {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Post editing error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const deleteblog = async (req, res) => {
    try {
        let result = await deleteBlogService(req); 
        if (result.status === "success") {
            return res.status(200).json(result); 
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Post deleting error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};