import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"

const UpdateProduct = () => {
    const params = useParams();

    const { data: productData } = useGetProductByIdQuery(params.id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [stock, setStock] = useState(productData?.countInStock)

    const navigate = useNavigate()

    const { data: categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if(productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category)
            setQuantity(productData.quantity)
            setImage(productData.image)
            setStock(productData.countInStock)
        }
    }, [productData]);

    const uploadFileHandler = async(e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success("Thêm ảnh thành công")
            setImage(res.image)
        } catch (error) {
            console.log(error)
            toast.error("Thêm ảnh không thành công")
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('countInStock', stock)

            const {data} = await updateProduct({productId: params.id, formData});

            if(data.error) {
                toast.error(data.error)
            } else {
                toast.success(`Cập nhật thành công`);
                navigate('/admin/allproductslist')
            }
        } catch (error) {
            console.log(error)
            toast.error('Cập nhật sản phẩm thất bại. Vui lòng thử lại.')
        }
    }

    const handleDelete = async() => {
        try {
            let answer = window.confirm("Xóa sản phẩm khỏi dữ liệu?")

            if (!answer) return;

            const {data} = await deleteProduct(params.id)
            toast.success(`${data.name} đã bị xóa.`)
            navigate('/admin/allproductslist')
        } catch (error) {
            console.log(error)
            toast.error('Xóa sản phẩm thất bại. Vui lòng thử lại.')
        }
    }


  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mt-10 mb-40">
        <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
                <div className="text-xl font-bold h-12">Cập nhật sản phẩm</div>
                {image && (
                    <div className="text-center">
                        <img src={image} alt="product" className="block mx-auto w-full h-[40%]" />
                    </div>
                )}

                <div className="mb-3">
                    <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                        {image ? image.name : "Thêm ảnh"}

                        <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="text-black" />
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
                            <select value={category} placehoder="Chọn danh mục" className="p-4 mb-3 w-[30rem] border rounded-lg" onChange={e => setCategory(e.target.value)}>
                                {categories?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleUpdate} className="py-4 px-10 mt-5 rounded-lg font-bold bg-green-500">Cập nhật sản phẩm</button>
                        <button onClick={handleDelete} className="py-4 px-10 mt-5 ml-3 rounded-lg font-bold bg-red-500">Xóa sản phẩm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProduct