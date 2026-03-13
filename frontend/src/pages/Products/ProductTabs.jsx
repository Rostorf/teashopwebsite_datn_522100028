import { useState } from "react"
import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../../components/Loader"

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
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
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor="rating" className="block text-xl mb-2">Đáng giá sản phẩm</label>
                                <select id="rating" required value={rating} onChange={e => setRating(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem]">
                                    <option value="">Chọn mức đánh giá</option>
                                    <option value="1">1 sao</option>
                                    <option value="2">2 sao</option>
                                    <option value="3">3 sao</option>
                                    <option value="4">4 sao</option>
                                    <option value="5">5 sao</option>
                                </select>
                            </div>

                            <div className="my-2">
                                <label htmlFor="comment" className="blocl text-xl mb-3">
                                    Bình luận
                                </label>
                                <br />
                                <br />
                                <textarea id="comment" rows="3" required value={comment} onChange={e => setComment(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] mb-4"></textarea>
                            </div>
                            <button type="submit" disabled={loadingProductReview} className="bg-green-500 text-white py-2 px-4 rounded-lg mb-20">Đánh giá</button>
                        </form>
                    ) : (
                        <p>Vui lòng <Link to='/login'>đăng nhập</Link> để viết đánh giá</p>
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