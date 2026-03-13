import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from "../components/Loader"
import Banner from "../components/Banner"
import MoreInfo from "../components/MoreInfo"
import FeaturedProducts from "../components/FeaturedProducts"
import Message from "../components/Message"
import Product from "./Products/Product"

const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, isError} = useGetProductsQuery({ keyword });
  return (
    <>
      <div>
          <Banner/>
      </div>
      <div className="w-full min-h-[#150px]">
          <MoreInfo/>
          <hr className="w-48 h-1 mx-auto my-4 bg-neutral-quaternary rounded-sm md:my-10" />
      </div>
      <div>
        {!keyword ? <FeaturedProducts /> : null}
        {isLoading ? (<Loader/>) : isError ? (<Message variant='danger'>
          {isError?.data.message || isError.error}
        </Message>) : (
          <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Sản phẩm của chúng tôi
            </h1>
            <Link to='/shop' className="bg-green-500 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-white">Xem thêm sản phẩm</Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">

              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}

            </div>
          </div>
          
          </>
        )} 
      </div>
    </>
  )
}

export default Home