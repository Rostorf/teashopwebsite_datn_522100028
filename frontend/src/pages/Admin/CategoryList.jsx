import { useState } from "react"
import { 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice'
import {toast} from "react-toastify"

import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {

    const {data: categories} = useFetchCategoriesQuery();
    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory = async(e) => {
        e.preventDefault()

        if(!name) {
            toast.error('Yêu cầu nhập tên danh mục')
            return;
        }
        try {
            const result = await createCategory({name}).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`Danh mục ${result.name} được tạo thành công`)
            }
        } catch (error) {
            console.log(error)
            toast.error('Tạo danh mục thất bại. Vui lòng thử lại')
        }
    }

    const handleUpdateCategory = async(e) => {
        e.preventDefault(e)

        if(!updatingName) {
            toast.error('Yêu cầu tên danh mục.')
            return;
        }
        try {
            const result = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {name: updatingName}}).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                toast.success(`Cập nhật ${result.name} thành công`)
                setSelectedCategory(null)
                setUpdatingName('')
                setModalVisible('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCategory = async() => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                toast.success(`Xóa danh mục ${result.name} thành công.`)
                setSelectedCategory(null)
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
            toast.error('Xóa danh mục thất bại. Vui lòng thử lại.')
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        {/* Admin Menu */}
        <div className="md:w-3/4 p-3">
            <div className="h-12">Quản lý danh mục</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
            <br />
            <hr />

            <div className="flex flex-wrap">
                {categories?.map((category) => (
                    <div key={category._id}>
                        <button onClick={() => {{
                            setModalVisible(true)
                            setSelectedCategory(category)
                            setUpdatingName(category.name)
                        }}} className="bg-white border border-green-500 text-green-500 py-2 px-4 rounded-lg m-3 hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                            {category.name}
                        </button>
                    </div>
                ))}
            </div>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <CategoryForm value={updatingName} setValue={value => setUpdatingName(value)} handleSubmit={handleUpdateCategory} buttonText="Cập nhật" handleDelete={handleDeleteCategory} />
            </Modal>
        </div>
    </div>
  )
}

export default CategoryList