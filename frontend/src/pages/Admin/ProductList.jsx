import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"

const ProductList = () => {
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [stock, setStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const productData = new FormData()
            productData.append('image', image)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('countInStock', stock)

            const {data} = await createProduct(productData)

            if(data.error) {
                toast.error('Thêm sản phẩm thất bại. Vui lòng thử lại.')
            } else {
                toast.success(`${data.name} được tạo thành công.`);
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error('Thêm sản phẩm thất bại. Vui lòng thử lại.')
        }
    }

    const uploadFileHandler = async(e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
                <div className="h-12">Thêm sản phẩm</div>
                {imageUrl && (
                    <div className="text-center">
                        <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
                    </div>
                )}

                <div className="mb-3">
                    <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                        {image ? image.name : "Thêm ảnh"}

                        <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className={!image ? 'hidden' : "text-black"} />
                    </label>
                </div>

                <div className="p-3">
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name">Tên sản phẩm</label> <br />
                            <input type="text" className="p-4 mb-3 w-[65rem] border rounded-lg bg-[] text-black" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </div>                    
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name block">Số lượng mua</label> <br />
                            <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[] text-black" value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </div>
                        <div className="two ml-10">
                            <label htmlFor="name block">Giá</label> <br />
                            <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[] text-black" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>

                    <label htmlFor="" className="my-5">Mô tả</label> <br />
                    <textarea type="text" className="p-2 mb-3 border rounded-lg w-[95%]" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="name block">Số lượng tồn kho</label> <br />
                            <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg" value={stock} onChange={e => setStock(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="">Danh mục</label> <br />
                            <select placehoder="Chọn danh mục" className="p-4 mb-3 w-[30rem] border rounded-lg" onChange={e => setCategory(e.target.value)}>
                                {categories?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg font-bold bg-green-500">Thêm sản phẩm</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductList