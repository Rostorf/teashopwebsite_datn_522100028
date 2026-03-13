import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from "moment"
import 'moment/locale/vi';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import NextArrow from "../../components/NextArrow"
import PrevArrow from "../../components/PrevArrow"

const ProductCarousel = () => {

    const {data: products, isLoading, error} = useGetTopProductsQuery()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
    }

  return (
    <div className="mb-4 xl:block lg:block md:block">
        {isLoading ? null : error ? (
            <Message variant='danger'>
                {error?.data?.message || error.message}
            </Message>
        ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block shadow-xl">
            {products.map(({image, _id, name, price, description, createdAt, numReviews, rating, quantity, countInStock}) => (
                <div key={_id}>
                    <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem] mb-5" />
                    <div className="flex justify-between w-[20rem] p-2 pl-[2rem]">
                        <div className="one">
                            <h2 className="font-bold">{name}</h2>
                            <p>{price} VND</p> <br /> <br />
                            <p className="w-[25rem] pb-2">{description.substring(0, 170)}...</p>
                        </div>
                        <div className="flex-justify-between w-[20rem] pl-[3rem]">
                            <div className="one">
                                <h1 className="flex items center mb-6 w-[10rem]">
                                    <InventoryIcon className="mr-1" /> {countInStock > 0 ? `Còn hàng: ${countInStock}` : 'Hết hàng'}
                                </h1>
                                <h1 className="flex items center mb-6 w-[15rem]">
                                    <AccessTimeIcon className="mr-1" /> Thêm vào lúc: {moment(createdAt).fromNow()}
                                </h1>
                                <h1 className="flex items center mb-6 w-[15rem]">
                                    <RateReviewOutlinedIcon className="mr-1" />Lượt Đánh giá: {numReviews}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <StarBorderOutlinedIcon className="mr-1"/>Lượt sao: {rating}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </Slider>}
    </div>
  )
}

export default ProductCarousel