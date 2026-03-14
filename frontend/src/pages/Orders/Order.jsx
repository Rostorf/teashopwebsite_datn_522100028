import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetVNPayQuery, usePayOrderMutation } from "../../redux/api/orderApiSlice"

const Order = () => {
    const {id: orderId} = useParams()

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    const [payOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()

    const {userInfo} = useSelector((state) => state.auth)

  return (
    <div>Order</div>
  )
}

export default Order