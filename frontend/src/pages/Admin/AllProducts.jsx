import { Link } from "react-router-dom"
import moment from 'moment'
import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import AdminMenu from "./AdminMenu"
import Loader from "../../components/Loader"

const AllProducts = () => {

    const {data: products, isLoading, isError} = useAllProductsQuery();

    if (isLoading) {
        return <Loader/>
    } 
    if (isError) {
        return <div>Lỗi tải dữ liệu</div>
    }
  return (
    <>
    <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="text-xl font-bold h-12">
              Tất cả sản phẩm ({products.length})
            </div>

            <div className="flex flex-wrap justify-around items-center">
              {products.map((product) => (
                <Link key={product._id} to={`/admin/product/update/${product._id}`} className="block mb-4 overflow-hidden">
                  <div className="flex">
                    <img src={product.image} alt={product.name} className="w-[10rem] object-cover" />
                    <div className="mx-6 p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>
                        <p className="text-gray-800 text-sm">
                            {moment(product.createdAt).format("DD/MM/YYYY")}
                        </p>
                     </div>
                     <p className="text-gray-800 xl:w-[25rem] md:w-[10rem] sm:w-[5rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                     </p>

                     <div className="flex justify-between">
                        <Link to={`/admin/product/update/${product._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-green-400 rounded-lg hover:bg-green-500 focus:ring-4
                        focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">Cập nhật sản phẩm</Link>
                        <p>{product?.price} VND</p>
                     </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts