import { useSelector } from "react-redux"

const FavoritesCount = () => {
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites.length

  return (
    <div className="">
        {favoriteCount > 0 && (
            <span className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[12px]">
                {favoriteCount}
            </span>
        )}
    </div>
  )
}

export default FavoritesCount