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
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const productData = new FormData()
            productData.append("images", JSON.stringify(images));
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
                navigate('/admin/allproductslist')
            }
        } catch (error) {
            console.log(error)
            toast.error('Thêm sản phẩm thất bại. Vui lòng thử lại.')
        }
    }

    const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error("Bạn chỉ có thể tải lên tối đa 4 ảnh cho mỗi sản phẩm");
      return;
    }

    files.forEach((file) => {
      formData.append("images", file);
    });

        try {
            const res = await uploadProductImage(formData).unwrap();
            setImages(res.images);
            toast.success(res.message);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mt-10 mb-40">
        <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
                <div className="text-xl font-bold h-12">Thêm sản phẩm</div>


                <div className="mb-3">
         <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
        {images.length > 0 ? `${images.length} ảnh đã được chọn` : "Tải ảnh sản phẩm (Tối đa 4)"}
        
        <input type="file" name="images" accept="image/*" multiple onChange={uploadFileHandler} className={!images.length ? "hidden" : "text-black"} />
      </label>
    </div>
    
    <div className="flex gap-2 mt-4">
      {images.map((imgUrl, index) => (
        <img key={index} src={imgUrl} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
      ))}
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
                            <label htmlFor="name block">Xuất xứ</label> <br />
                            <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[] text-black" value={quantity} onChange={e => setQuantity(e.target.value)} />
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