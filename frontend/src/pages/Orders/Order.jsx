import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useCreateVnpayUrlMutation,
  useVerifyVnpayReturnMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const { search } = useLocation();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [createVnpayUrl, { isLoading: loadingPay }] = useCreateVnpayUrlMutation();
  const [verifyVnpayReturn, { isLoading: isVerifying }] = useVerifyVnpayReturnMutation();
  
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    const handleVnpayReturn = async () => {
      const urlParams = new URLSearchParams(search);
      const isReturn = urlParams.get("vnp_Return");
      
      if (isReturn && order && !order.isPaid) {
        try {
           await verifyVnpayReturn({ queryString: search.toString().substring(1) }).unwrap();
           toast.success("Thanh toán thành công!");
           refetch();
        } catch (err) {
           toast.error(err?.data?.message || err.error || "Thanh toán thất bại");
        }
      }
    };

    handleVnpayReturn();
  }, [search, order, refetch, verifyVnpayReturn]);

  const handleVnpayPayment = async () => {
    try {
      const res = await createVnpayUrl(orderId).unwrap();
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (error) {
      toast.error(error?.data?.message || "Lỗi tạo VNPAY URL");
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Đánh dấu đơn hàng đã được giao thành công");
    } catch (error) {
      toast.error(error?.data?.message || "Không thành công");
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Đơn hàng trống</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Ảnh</th>
                    <th className="p-2">Sản phẩm</th>
                    <th className="p-2 text-center">Số lượng</th>
                    <th className="p-2">Đơn giá</th>
                    <th className="p-2">Tổng</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover"/>
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price} VND</td>
                      <td className="p-2 text-center">{(item.qty * item.price)} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Tổng quát</h2>
          <p className="mb-4 mt-4">
            <strong className="">Mã đơn:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="">Tên người mua:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="">Địa chỉ:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}
          </p>

          <p className="mb-4">
            <strong className="">Thời gian đặt hàng:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>

          <p className="mb-4">
            <strong className="">Phương thức:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Đã thanh toán vào lúc {new Date(order.paidAt).toLocaleString()}</Message>
          ) : (
            <Message variant="danger">Chưa thanh toán</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Tóm tắt đơn hàng</h2>
        <div className="flex justify-between mb-2">
          <span>Sản phẩm</span>
          <span>{order.itemsPrice} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Phí giao hàng</span>
          <span>{order.shippingPrice} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tổng</span>
          <span>{order.totalPrice} VND</span>
        </div>

        {/* VNPAY Payment Button Section */}
        {!order.isPaid && (
          <div className="mt-4">
            {loadingPay || isVerifying ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 rounded transition-colors"
                onClick={handleVnpayPayment}
              >
                Thang toán bằng VNPAY
              </button>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div className="mt-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 rounded transition-colors"
              onClick={deliverHandler}
            >
              Đánh dấu đơn hàng đã được giao
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;