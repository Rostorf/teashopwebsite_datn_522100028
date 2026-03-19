import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress, savePaymentMethod} from '../../redux/features/cart/cartSlice'
import ProgressSteps from "../../components/ProgressSteps"

const Shipping = () => {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState('VNPAY')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '') 
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '') 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingAddress({address, city, postalCode, phoneNumber}))
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [navigate, shippingAddress])

  return (
    <div className="container mx-auto mt-10">
        <ProgressSteps step1 step2 />
        <div className="mt-[10rem] flex justify-around items-center flex-wrap">
            <form onSubmit={submitHandler} className="w-[40rem]">
                <h1 className="text-2xl font-semibold mb-4">Nhập địa chỉ giao hàng</h1>
                <div className="mb-4">
                    <label className="block mb-2">Địa chỉ</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Nhập địa chỉ..." value={address} onChange={e => setAddress(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tỉnh thành</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Nhập tỉnh thành..." value={city} onChange={e => setCity(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Mã bưu điện</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Nhập mã bưu điện..." value={postalCode} onChange={e => setPostalCode(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Số điện thoại</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Nhập số điện thoại..." value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block">Chọn phương thức thanh toán</label>
                    <div className="mt-2">
                       <label htmlFor="" className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="paymentMethod" value="COD" checked={paymentMethod === "COD"} onChange={e => setPaymentMethod(e.target.value)} />

                            <span className="ml-2">COD</span>
                            <input type="radio" className="form-radio ml-4" name="paymentMethod" value="VNPAY" checked={paymentMethod === "VNPAY"} onChange={e => setPaymentMethod(e.target.value)} />

                            <span className="ml-2">VNPAY</span>
                        </label> 
                    </div>
                </div>
                <button className="bg-green-500 text-white py-2 px-4 rounded-full text-lg w-full" type="submit">
                    Tiếp tục
                </button>
            </form>
        </div>
    </div>
  )
}

export default Shipping