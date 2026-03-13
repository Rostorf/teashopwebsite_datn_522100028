import { useState } from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <>
        <button className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-black p-2 fixed rounded-lg z-50`} onClick={toggleMenu}>
            {isMenuOpen ? (
                    <CloseIcon sx={{ color: '#FFFFFF' }} />
            ) : (
                <>
                <div className="w-6 h-0.5 bg-white my-1"></div>
                <div className="w-6 h-0.5 bg-white my-1"></div>
                <div className="w-6 h-0.5 bg-white my-1"></div>
                </>
            )}
        </button>
        {isMenuOpen && (
            <section className="bg-slate-100 p-4 fixed right-7 top-5 z-40">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/dashboard' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/categorylist' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Danh sách danh mục
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/productlist' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Tạo sản phẩm mới
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/allproductslist' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Danh sách sản phẩm
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/userlist' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Quản lý người dùng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-green-400 rounded-sm" to='/admin/orderlist' style={({isActive}) => ({
                            color: isActive ? "black" : "grey",
                        })}>
                            Quản lý đơn hàng
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
    </>
  )
}

export default AdminMenu