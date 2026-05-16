import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from "./AdminMenu"
import { useDeleteOrderMutation } from '../../redux/api/orderApiSlice'
import { toast } from 'react-toastify'

const OrderList = () => {
    const {data: orders, isLoading, error, refetch} = useGetOrdersQuery()

    const [deleteOrder] = useDeleteOrderMutation();

    const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn đơn hàng này?')) {
      try {
        await deleteOrder(id).unwrap();
        toast.success('Đã xóa đơn hàng thành công');
        refetch();
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

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
                        <th className="text-left pl-1">Số Lượng mua</th>
                        <th className="text-left pl-1">Tổng</th>
                        <th className="text-left pl-1">Thanh toán</th>
                        <th className="text-left pl-1">Tình trạng</th>
                        <th className="text-left pl-1">Hành động</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <img src={order.orderItems[0].image} alt={order._id} className="w-[5rem]" />
                            <td className="py-2">{order._id}</td>
                            <td className="py-2">{order.user ? order.user.username : "N/A"}</td>
                            <td className="py-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                            <td className="text-center">{order.orderItems.reduce((total, item) => total + item.qty, 0)}</td>
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
                                    <p className="p-1 text-center bg-green-400 w-[7rem] rounded-full text-white">Đã giao</p>
                                ) : order.isCancelRequested ? (
                                    <p className="p-1 text-center bg-yellow-500 w-[8rem] rounded-full text-white">Yêu cầu hủy</p>
                                ) : (
                                    <p className="p-1 text-center bg-red-400 w-[7rem] rounded-full text-white">Chưa giao</p>
                                )}
                            </td>

                            <td className="py-2">
                                <Link to={`/order/${order._id}`}>
                                    <button className="bg-blue-400 text-white py-2 px-3 rounded">Xem chi tiết</button>
                                </Link>
                            </td>

                            <td>
                                <button onClick={() => handleDelete(order._id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 ml-2">Xóa</button>
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