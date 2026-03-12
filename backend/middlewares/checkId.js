import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        res.status(404)
        throw new Error(`Object ID ${req.params.id} không hợp lệ`)
    }
    next();
} 

export default checkId;