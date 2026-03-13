import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery} from '../redux/api/productApiSlice'
import { setCategories, setProducts, setChecked } from '../redux/features/shop/shopSlice'
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice'
import Loader from "../components/Loader"
import ProductCard from "./Products/ProductCard"

const Shop = () => {

    const dispatch = useDispatch()
    const {categories, products, checked} = useSelector((state) => state.shop)

    const categoriesQuery = useFetchCategoriesQuery()
    const [priceFilter, setPriceFilter] = useState('')

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
    })

    useEffect(() => {
        if(!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
            if (!filteredProductsQuery.isLoading) {
                //Filter products based on checked categories and price filter
                const filteredProducts = filteredProductsQuery.data.filter((product) => {
                    //Check if product price includes the entered price filter value
                    return (
                        product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
                    )
                })
                dispatch(setProducts(filteredProducts));
            }
    }, [checked, filteredProductsQuery.data, dispatch, priceFilter])

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    const handlePriceChange = e => {
        //Update the price filter state when the user types in the input field
        setPriceFilter(e.target.value)
    }

  return (
    <>
        <div className="contrainer mx-auto">
            <div className="flex md:flex-row">
                <div className="p-3 mt-2 mb-2 bg-[#e4edd3]">
                    <h2 className="h4 text-center py-2 rounded-full mb-2 bg-green-500 text-white">Lọc theo danh mục</h2>

                    <div className="p-5 w-[15rem]">
                        {categories?.map((c) => (
                            <div key={c._id} className="mb-2">
                                <div className="flex items-center mr-4">
                                    <input type="checkbox" id='red-checkbox' onChange={e => handleCheck(e.target.checked, c._id)} className="w-4 h- bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                    <label htmlFor="pink-checkbox" className="ml-2 text-sm font-medium dark:text-gray:300">{c.name}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                        <h2 className="h4 text-center py-2 rounded-full mb-2 bg-green-500 text-white">
                            Lọc theo giá
                        </h2>
                        <div className="p-5 w-[15rem]">
                            <input type="text" placeholder="Nhập giá" value={priceFilter} onChange={handlePriceChange} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-green-300" />
                        </div>
                        <div className="p-5 pt-0">
                            <button className="w-full border my-4 text-center p-1 rounded-full bg-green-500 text-white" onClick={() => window.location.reload()}>
                                Reset
                            </button>
                        </div>

                </div>

                        <div className="p-3">
                            <h2 className="h4 text-center mb-2 font-bold text-2xl">{products?.length} Sản phẩm</h2>
                            <div className="flex flex-wrap">
                                {products.length === 0 ? (
                                    <Loader/>
                                ) : (
                                    products.map((p) => (
                                        <div className="p-3" key={p._id}>
                                            <ProductCard p={p}/>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

            </div>
        </div>
    </>
  )
}

export default Shop