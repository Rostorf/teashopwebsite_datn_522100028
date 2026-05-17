import { useState } from "react"
import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../../components/Loader"

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product, hasPurchasedProduct}) => {
    const {data, isLoading} = useGetTopProductsQuery()
    const [activeTab, setActiveTab] = useState(1)

    if (isLoading) {
        return <Loader />
    }

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

  return (
    <div className="flex flex-col md:flex-row">
        <section className="mr-[5rem]">
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`} onClick={() => handleTabClick(1)}>Đánh giá sản phẩm</div>
            <hr />
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`} onClick={() => handleTabClick(2)}>Tất cả đánh giá</div>
            <hr />
            <div className={`flex-1 p-4 cursor-pointer text-lg w-[15rem] ${activeTab === 3 ? "font-bold" : ""}`} onClick={() => handleTabClick(3)}>Sản phẩm liên quan</div>
        </section>

        <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              hasPurchasedProduct ? (
                <form onSubmit={submitHandler}>
                  <div className="my-2">
                    <label htmlFor="rating" className="block text-xl mb-2">Đánh giá sao</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 w-[12rem] rounded-lg text-black outline-none border" >
                      <option value="">Chọn</option>
                      <option value="1">1 - Tệ</option>
                      <option value="2">2 - Bình thường</option>
                      <option value="3">3 - Tốt</option>
                      <option value="4">4 - Rất tốt</option>
                      <option value="5">5 - Tuyệt vời</option>
                    </select>
                  </div>

                  <div className="my-2">
                    <label htmlFor="comment" className="block text-xl mb-2">Bình luận</label>
                    <textarea id="comment" row="3" required value={comment} onChange={(e) => setComment(e.target.value)} className="p-2 xl:w-[40rem] lg:w-[35rem] md:w-[30rem] rounded-lg text-black outline-none border" ></textarea>
                  </div>

                  <button disabled={loadingProductReview} type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors" > Gửi đánh giá </button>
                </form>
              ) : (
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg max-w-md">
                  <p className="font-semibold">Bạn chưa mua sản phẩm này!</p>
                  <p className="text-sm mt-1">Đánh giá và bình luận chỉ khả dụng sau khi bạn đã mua sản phẩm.</p>
                </div>
              )
            ) : (
              <p>
                Vui lòng <Link to="/login" className="text-green-500 underline">đăng nhập</Link> để đánh giá.
              </p>
            )}
          </div>
        )}

      </section>

        <section>
            {activeTab === 2 && (
                <>
                <div>
                    {product.reviews.length === 0 && <p>Chưa có đánh giá</p>}
                </div>

                <div>
                    {product.reviews.map((review) => (
                        <div key={review._id} className="bg-[#ededed] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-[3rem]">
                            <div className="flex justify-between">
                                <strong className="">
                                    {review.name}
                                </strong>
                                <p>{review.createdAt.substring(0, 10)}</p>
                            </div>
                            <p className="my-4">{review.comment}</p>
                            <Ratings value={review.rating}></Ratings>
                        </div>
                    ))}
                </div>
                </>
            )}
        </section>

        <section>
            {activeTab === 3 && (
                <section className="ml-[4rem] flex flex-wrap">
                    {!data ? (
                        <Loader/>
                    ) : (
                        data.map((product) => (
                            <div key={product._id}>
                                <SmallProduct product={product}/>
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>
    </div>
  )
}

export default ProductTabs