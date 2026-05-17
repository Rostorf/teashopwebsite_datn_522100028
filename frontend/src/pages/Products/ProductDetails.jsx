import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import moment from "moment"
import 'moment/dist/locale/vi';
moment.locale('vi')
import InventoryIcon from '@mui/icons-material/Inventory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import HeartIcon from "./HeartIcon"
import Rating from "./Ratings"
import ProductTabs from "./ProductTabs"
import PublicIcon from '@mui/icons-material/Public';
import SellIcon from '@mui/icons-material/Sell';
import { addToCart } from "../../redux/features/cart/cartSlice"
import { useEffect } from "react"

moment.locale('vi')

const ProductDetails = () => {
    const {id: productId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    const {userInfo} = useSelector(state => state.auth)
    
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()

    const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]); // Set the first image as default
    }
  }, [product]);

    const submitHandler = async(e) => {
        e.preventDefault()
        
        try {
            await createReview({
                productId, rating, comment
            }).unwrap()
            refetch()
            toast.success('Đánh giá sản phẩm thành công')
        } catch (error) {
            toast.error(error?.data || error.message)
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

  return (
    <>
        <div className="mt-[2rem]">
            <Link to='/' className="font-semibold hover:underline ml-[10rem]">Quay lại trang chủ</Link>
        </div>

        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
            <>
            <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                <div className="w-full md:w-1/2 p-4">
            {/* Main large image */}
            <img src={mainImage} alt={product.name} className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] shadow-lg"/>
            
            {/* Thumbnails row */}
            <div className="flex gap-4 mt-4 overflow-x-auto">
              {product.images?.map((img, index) => (
                <img key={index} src={img} alt={`${product.name} - view ${index + 1}`} onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 transition-all ${
                    mainImage === img ? "border-green-500 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="my-4 xl:[35rem] lg:w-[35rem] md:w-[30rem]">{product.description}</p>
                    <p className="text-5xl my-4 font-extrabold">{product.price} VND / Hộp</p>
                    <div className="flex items-center justify-between w-[20rem]">
                        <div className="one">
                            <h1 className="flex items-center mb-6">
                                <InventoryIcon className="mr-2" /> {product.countInStock > 0 ? `Còn hàng: ${product.countInStock}` : 'Hết hàng'}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <SellIcon className="mr-2" /> Đã bán: {product.sold || 0}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <PublicIcon className="mr-2" /> Xuất xứ: {product.quantity}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <AccessTimeIcon className="mr-2" /> Thêm vào lúc: {moment(product.createdAt).fromNow()}
                            </h1>
                        </div>
                        <div className="two ml-[5rem]">
                            <h1 className="flex items-center mb-6 w-[10rem]">
                                <RateReviewOutlinedIcon className="mr-2" /> Lượt đánh giá: {product.numReviews}
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <StarBorderOutlinedIcon className="mr-2"/> Lượt sao: {product.rating} 
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <AccessTimeIcon className="mr-2" /> Hạn sử dụng: {" "} {product.expiryDate}
                            </h1>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <Rating value={product.rating} text={`${product.numReviews} đánh giá`}/>

                        {product.countInStock > 0 && (
                            <div>
                                <select value={qty} onChange={e => setQty(e.target.value)} className="p-2 w-[6rem] rounded-lg text-black outline-2 outline-gray-400">
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="btn-container">
                        <button 
                            onClick={addToCartHandler} 
                            disabled={product.countInStock === 0} 
                            className={`py-2 px-4 rounded-lg mt-4 md:mt-0 transition-colors ${product.countInStock === 0 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}>
                            {product.countInStock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                        </button>
                        </div>
                    </div>
                <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                    <ProductTabs loadingProductReview={loadingProductReview} userInfo={userInfo} submitHandler={submitHandler} rating={rating} setRating={setRating} comment={comment} setComment={setComment} product={product} />
                </div>
            </div>
            </>
        )}
    </>
  )
}

export default ProductDetails