import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
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

  const [createVnpayUrl, { isLoading: isCreatingUrl }] = useCreateVnpayUrlMutation();
  const [verifyVnpayReturn, { isLoading: isVerifying }] = useVerifyVnpayReturnMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Check if we are returning from VNPAY
  useEffect(() => {
    const handleVnpayReturn = async () => {
      const urlParams = new URLSearchParams(search);
      const isReturn = urlParams.get("vnp_Return");
      
      if (isReturn && order && !order.isPaid) {
        try {
           // We pass the full query string to the backend to verify the hash
           await verifyVnpayReturn({ queryString: search.toString().substring(1) }).unwrap();
           toast.success("Payment successful!");
           refetch();
        } catch (err) {
           toast.error(err?.data?.message || err.error);
        }
      }
    };

    handleVnpayReturn();
  }, [search, order, refetch, verifyVnpayReturn]);

  const handleVnpayPayment = async () => {
    try {
      const res = await createVnpayUrl(orderId).unwrap();
      if (res.paymentUrl) {
        // Redirect the user entirely to VNPAY's gateway
        window.location.href = res.paymentUrl;
      }
    } catch (error) {
      toast.error("Failed to generate payment URL");
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
            <div className="border-gray-300 mt-5 pb-4 mb-5">
                {order.orderItems.length === 0 ? (
                    <Message>Đơn hàng trống</Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-[80%]">
                            <thead className="border-b-2">
                                <tr>
                                    <th className="p-2">Ảnh</th>
                                    <th className="p-2">Sản phẩm</th>
                                    <th className="p-2">Số lượng</th>
                                    <th className="p-2">Đơn giá</th>
                                    <th className="p-2">Tổng giá</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {order.orderItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                        </td>
                                        <td className="p-2"><Link to={`/product/${item.product}`}>{item.name}</Link></td>
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
          <h2 className="text-xl font-bold mb-2">Đơn hàng</h2>
            <p className="mb-4 mt-4">
                <strong className="">Mã đơn hàng: </strong> {order._id}
            </p>
            
            <p className="mb-4 mt-4">
                <strong className="">Tên người mua: </strong> {order.user.username}
            </p>

            <p className="mb-4 mt-4">
                <strong className="">Email: </strong> {order.user.email}
            </p>

            <p className="mb-4 mt-4">
                <strong className="">Địa chỉ: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>

            <p className="mb-4 mt-4">
                <strong className="">Phương thức thanh toán: </strong> {order.paymentMethod}
            </p>

            {order.isPaid ? (
                <Message variant="success">Đã thanh toán {order.paidAt}</Message>
            ) : (
                <Message variant="danger">Chưa thanh toán</Message>
            )}
        </div>
            
            <h2 className="text-xl font-bold mb-2 mt-[3rem]">Tổng quát đơn hàng</h2>
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


          {!order.isPaid && (
            <div>
              {isCreatingUrl && <Loader />}
              {isVerifying ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleVnpayPayment}
                >
                  Thanh toán
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Order;