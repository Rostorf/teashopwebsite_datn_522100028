import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from "./AdminMenu"

const OrderList = () => {
    const {data: orders, isLoading, error} = useGetOrdersQuery()

  return (
    <div className="container mx-auto mt-12">
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
            <table className="container mx-auto my-5 border-separate border-spacing-y-6">
                <AdminMenu/>
                <thead className="w-full">
                    <tr className="mb-[5rem]">
                        <th className="text-left pl-1">Sản phẩm</th>
                        <th className="text-left pl-1">ID</th>
                        <th className="text-left pl-1">Người mua</th>
                        <th className="text-left pl-1">Ngày tạo</th>
                        <th className="text-left pl-1">Tổng</th>
                        <th className="text-left pl-1">Thanh toán</th>
                        <th className="text-left pl-1">Tình trạng</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <img src={order.orderItems[0].image} alt={order._id} className="w-[5rem]" />
                            <td className="py-2">{order._id}</td>
                            <td className="py-2">{order.user ? order.user.username : "N/A"}</td>
                            <td className="py-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                            <td className="py-2">{order.totalPrice} VND</td>
                            <td className="py-2">
                                {order.isPaid ? (
                                    <p className="p-1 text-center bg-green-400 w-[9rem] rounded-full text-white">Đã thanh toán</p>
                                ) : (
                                    <p className="p-1 text-center bg-red-400 w-[9rem] rounded-full text-white">Chưa thanh toán</p>
                                )}
                            </td>
                            <td className="py-2">
                                {order.isDelivered ? (
                                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full text-white">Đã giao</p>
                                ) : (
                                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full text-white">Chưa giao</p>
                                )}
                            </td>

                            <td className="py-2">
                                <Link to={`/order/${order._id}`}>
                                    <button className="bg-blue-400 text-white py-2 px-3 rounded">Xem chi tiết</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default OrderList