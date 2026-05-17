import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js'
import Order from "../models/orderModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.fields || req.body;
    let images = data.images;

    // Xử lý JSON string
    if (typeof images === "string") {
      try {
        images = JSON.parse(images);
      } catch (err) {
        console.log("Lỗi Parse JSON:", err.message);
      }
    }

    if (!images || images.length === 0) {
      return res.status(400).json({ error: "Yêu cầu ít nhất 1 ảnh sản phẩm" });
    }
    const productDataToSave = { ...data, images };
    console.log(productDataToSave);

    const product = new Product(productDataToSave);
    await product.save();
    
    console.log("=== LƯU THÀNH CÔNG! ===");
    res.json(product);

  } catch (error) {
    console.log(error.message); 
    res.status(400).json({ error: error.message });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const data = req.fields || req.body;
    let images = data.images;

    // 1. Parse the JSON string back into a real Array
    if (typeof images === "string") {
      try {
        images = JSON.parse(images);
      } catch (err) {
        console.log("Lỗi Parse JSON:", err.message);
      }
    }

    // 2. Validation
    if (!images || images.length === 0) {
      return res.status(400).json({ error: "Yêu cầu ít nhất 1 ảnh sản phẩm" });
    }

    // 3. Find and Update
    const product = await Product.findByIdAndUpdate(
      req.params.id, // Make sure this matches your route parameter (e.g., req.params.id)
      { ...data, images },
      { new: true } // This tells Mongoose to return the updated document
    );

    if (!product) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (error) {
    console.error("MONGOOSE ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
});

const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.json(product);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Lỗi máy chủ"})
    }
})

const fetchProducts = asyncHandler(async(req, res) => {
    try {
        const pageSize = 6
        const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}, } : {};

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)

        res.json({products, page: 1, pages: Math.ceil(count / pageSize), hasMore: false,})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Lỗi máy chủ"})
    }
})

const fetchProductById = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product) {
            return res.json(product)
        } else {
            res.status(404)
            throw new Error("Không tìm thấy sản phẩm")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({error: "Không tìm thấy sản phẩm"})
    }
})

const fetchAllProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).populate('category').limit(20).sort({createdAt: -1})

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Lỗi máy chủ"})
    }
})

const addProductReview = asyncHandler(async(req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)

        if (product) {
            const hasPurchased = await Order.findOne({
            user: req.user._id,
            isPaid: true, // ensures they actually finalized payment
            isDelivered: true,
            orderItems: {
                $elemMatch: { product: req.params.id }
                }
            });

            if (!hasPurchased) {
                res.status(400);
                throw new Error("You can only review products you have already purchased.");
            }

            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

            if (alreadyReviewed) {
                res.status(400)
                throw new Error("Bạn đã đánh giá sản phẩm.")
            }

        const review = { 
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
            }
        
        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: "Đánh giá thành công"})
        } else {
            res.status(404)
            throw new Error("Không tìm thấy sản phẩm")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const deleteProductReview = asyncHandler(async(req, res) => {
    try {
        const { reviewId } = req.body; 
        const product = await Product.findById(req.params.id);

        if (product) {
            // Find the review's index
            const reviewIndex = product.reviews.findIndex(
                (r) => r._id.toString() === reviewId
            );

            if (reviewIndex !== -1) {
                const review = product.reviews[reviewIndex];
                if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                    res.status(403);
                    throw new Error("Không có quyền xóa đánh giá này");
                }

                // Remove the review from the array
                product.reviews.splice(reviewIndex, 1);
                
                // Recalculate numReviews and overall rating
                product.numReviews = product.reviews.length;
                if (product.numReviews > 0) {
                    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
                } else {
                    product.rating = 0;
                }

                await product.save();
                res.status(200).json({ message: "Xóa đánh giá thành công" });
            } else {
                res.status(404);
                throw new Error("Không tìm thấy đánh giá");
            }
        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

const fetchTopProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const fetchNewProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({_id: -1}).limit(5)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const fetchTopSellingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ sold: -1 }).limit(4);
  
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

const filterProducts = asyncHandler(async(req, res) => {
    try {
        const {checked, radio, keyword, minPrice, maxPrice} = req.body

        let args = {}
        if(checked.length > 0) args.category = checked

        if (minPrice || maxPrice) {
        args.price = {};
        
            if (minPrice) {
                args.price.$gte = Number(minPrice); // Greater than or equal to Minimum Price
            }
            
            if (maxPrice) {
                args.price.$lte = Number(maxPrice); // Less than or equal to Maximum Price
            }
        }

        if (keyword) 
        {
            args.name = { $regex: keyword, $options: "i" };
        }

        const products = await Product.find(args)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Lỗi máy chủ"})
    }
})

export { addProduct, updateProductDetails, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, deleteProductReview, fetchTopProducts, fetchNewProducts, fetchTopSellingProducts, filterProducts };