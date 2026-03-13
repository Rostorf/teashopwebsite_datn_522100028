import { Link } from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {toast} from 'react-toastify'
import HeartIcon from './HeartIcon'
 
const ProductCard = ({p}) => {

    const dispatch = useDispatch()

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
        toast.success(`${p?.name} đã được thêm vào giỏ hàng`)
    }

  return (
    <div className="max-w-sm relative rounded-lg shadow bg-white">
        <section className="relative">
            <Link to={`/product/${p._id}`}>
                {/* <span className="absolute bottom-3 right-3 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-800">
                    {p?.category}
                </span> */}
                <img className="cursor-pointer" src={p.image} alt={p.name} style={{height: '200px', objectFit: 'cover'}} />
            </Link>
            <HeartIcon product={p}/>
        </section>

        <div className="p-5">
            <div className="flex justify-between">
                <h5 className="mb-2 text-xl">{p?.name.substring(0, 25)}...</h5>
                <p className="font-semibold">{p?.price?.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND'
                })}</p>
            </div>

            <p className="mb-3 font-normal">{p?.description?.substring(0, 60)}...</p>

            <section className="flex justify-between items-center">
                <Link to={`/product/${p._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none
                focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Xem thêm</Link>

                <button className="p-2 rounded-full cursor-pointer" onClick={() => addToCartHandler(p, 1)}>
                    <AddShoppingCartIcon/>
                </button>
            </section>
        </div>
    </div>
  )
}

export default ProductCard