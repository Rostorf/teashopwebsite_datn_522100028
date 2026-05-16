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

    const [images, setImages] = useState(productData?.image || [])
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [stock, setStock] = useState(productData?.countInStock)
    const [expiryDate, setExpiryDate] = useState(productData?.expiryDate || "");

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
            setImages(productData.images || [])
            setStock(productData.countInStock)
            setExpiryDate(productData.expiryDate || "");
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);

    if (images.length + files.length > 4) {
      toast.error("Bạn chỉ có thể lưu tối đa 4 ảnh cho mỗi sản phẩm");
      return;
    }

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await uploadProductImage(formData).unwrap();
      // COMBINE old images with the newly uploaded ones
      setImages((prevImages) => [...prevImages, ...res.images]);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // 3. REMOVE IMAGE HANDLER
  const removeImageHandler = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

    const handleUpdate = async(e) => {
        e.preventDefault()
        
        try {
            const formData = new FormData()
            formData.append("images", JSON.stringify(images));
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('countInStock', stock)
            formData.append('expiryDate', expiryDate);

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
                <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {images.length >= 4 ? "Đã đạt giới hạn 4 ảnh" : "Tải ảnh sản phẩm (Tối đa 4)"}
                
                <input type="file" name="images" accept="image/*" multiple disabled={images.length >= 4} onChange={uploadFileHandler} className="hidden"/>
            </label>
            </div>

            {/* Image Preview Gallery with Delete Buttons */}
            {images.length > 0 && (
            <div className="flex gap-4 mt-4 mb-6 flex-wrap">
                {images.map((imgUrl, index) => (
                <div key={index} className="relative group">
                    <img 
                    src={imgUrl} 
                    alt={`Preview ${index}`} 
                    className="w-24 h-24 object-cover rounded-lg border border-gray-600" 
                    />
                    <button
                    type="button"
                    onClick={() => removeImageHandler(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600"
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
            )}
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
                            <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[] text-black" value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </div>
                        <div className="two ml-10">
                            <label htmlFor="name block">Giá</label> <br />
                            <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[] text-black" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>

                    <label htmlFor="" className="my-5">Mô tả</label> <br />
                    <textarea type="text" className="p-2 mb-3 border rounded-lg w-[95%]" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                    <div className="flex justify-between gap-2">
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

                        <div className="mb-3">
                            <label htmlFor="expiryDate">Hạn sử dụng</label>
                                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="" />
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