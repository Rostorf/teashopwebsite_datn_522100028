import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"
import ProgressSteps from "../../components/ProgressSteps"
import Loader from "../../components/Loader"
import { useCreateOrderMutation} from "../../redux/api/orderApiSlice"
import { clearCartItems } from "../../redux/features/cart/cartSlice"

const PlaceOrder = () => {

    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if(!cart.shippingAddress.address) {
            navigate('/shippping')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    const dispatch = useDispatch()

    const placeOrderHandler = async() => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }

  return (
    <>
     <ProgressSteps step1 step2 step3/>

        <div className="container mx-auto mt-8">
           {cart.cartItems.length === 0 ? (
            <Message>Giỏ hàng trống</Message>
           ) : (
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <td className="px-1 py-2 text-left align-top">Image</td>
                            <td className="px-1 py-2 text-left">Sản phẩm</td>
                            <td className="px-1 py-2 text-left">Số lượng mua</td>
                            <td className="px-1 py-2 text-left">Giá</td>
                            <td className="px-1 py-2 text-left">Tổng</td>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.cartItems.map((item, index) => (
                            <tr key={index}>
                                <td className="p-2">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="p-2">
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </td>
                                <td className="p-2">{item.qty}</td>
                                <td className="p-2">{item.price} VND</td>
                                <td className="p-2">{(item.qty * item.price)} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           )}
           
           <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-5">
                    Tóm tắt đơn hàng
                </h2>
                <div className="flex justify-between flex-wrap p-8 bg-white">
                    <ul className="text-lg">
                        <li>
                            <span className="font-semibold mb-4">Sản phẩm: </span>
                            {cart.itemsPrice} VND
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Phí giao hàng: </span>
                            {cart.shippingPrice} VND
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Tổng giá sản phẩm: </span>
                            {cart.totalPrice} VND
                        </li>
                    </ul>

                    {error && <Message variant='danger'>{error.data.message}</Message>}

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Giao hàng</h2>
                            <p>
                                <strong>Địa chỉ:</strong> {" "}
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city}, {" "}
                                {cart.shippingAddress.postalCode},{" "}
                            </p>
                            <p><strong>Số điện thoại:</strong> {cart.shippingAddress.phoneNumber}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Phương thức thanh toán</h2>
                        <strong>Phương thức:</strong> {cart.paymentMethod}
                    </div>
                </div>

                <button type='button' className="bg-green-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Đặt hàng</button>

                {isLoading && <Loader/>}
            </div>

        </div>
    </>
  )
}

export default PlaceOrder