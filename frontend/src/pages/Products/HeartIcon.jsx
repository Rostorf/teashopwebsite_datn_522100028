import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, setFavorites} from '../../redux/features/favorites/favoriteSlice'

import { addFavoriteToLocalStorage, removeFavoriteFromLocalStorage, getFavoritesFromLocalStorage } from '../../utils/localStorage'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id === product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);

    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product))
            //remove the product from the localStorage as well
            removeFavoriteFromLocalStorage(product._id)
        } else {
            dispatch(addToFavorites(product))
            addFavoriteToLocalStorage(product)
        }
    }

  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
        {isFavorite ? (<FavoriteOutlinedIcon className='text-pink-500' />) : (
            <FavoriteBorderOutlinedIcon className='' />
        )}
    </div>
  )
}

export default HeartIcon