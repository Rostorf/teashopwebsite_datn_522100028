import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

const SmallProduct = ({product}) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
        <div className="relative">
            <img src={product.image} alt={product.name} className="h-auto rounded" />
            <FavoriteIcon product={product} />

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div>{product.name}</div>
                        <span className="bg-green-300 text-white text-sm font-medium mr-2 px-3 py-0.5 rounded-full dark:bg-green-700 dark:text-white">{product.price} VND</span>
                    </h2>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SmallProduct