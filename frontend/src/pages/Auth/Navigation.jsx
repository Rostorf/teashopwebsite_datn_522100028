import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userApiSlice.js';
import { logout } from '../../redux/features/auth/authSlice.js';
import FavoritesCount from '../Products/FavoritesCount.jsx';

const Navigation = () => {
    
    const {userInfo} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="w-full absolute top-0 left-0 z-20">
        <div className="flex items-center justify-between py-6 px-[13rem] w-full font-medium bg-slate-50 fixed">

            <NavLink to="/">
                <img src={assets.logo} className="w-40 mt-1" alt="" />
            </NavLink>

            <ul className="hidden mt-3 sm:flex gap-7 text-sm text-gray-700">

                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p className='font-mono font-bold text-base'>TRANG CHỦ</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-grey-700" />
                </NavLink>

                <NavLink to="/shop" className="flex flex-col items-center gap-1">
                    <p className='font-mono font-bold text-base'>SẢN PHẨM</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-grey-700" />
                </NavLink>

                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p className='font-mono font-bold text-base'>GIỚI THIỆU</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-grey-700" />
                </NavLink>

                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p className='font-mono font-bold text-base'>LIÊN LẠC</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-grey-700" />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                {/* <button className='w-5 cursor-pointer text-base' aria-label="Search">
                    <SearchOutlinedIcon/>
                </button> */}
                
                <div className='group relative'>
                    <PersonOutlineOutlinedIcon className='w-5 cursor-pointer text-base' />
                    {userInfo && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 text-center z-50'>
                            <div className='flex flex-col gap-2 w-56 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <Link to='/profile' className='cursor-pointer hover:text-black font-mono'>Trang cá nhân</Link>
                                <Link to='/user-orders' className='cursor-pointer hover:text-black font-mono'>Đơn hàng</Link>
                                {userInfo.isAdmin && (
                                    <>
                                        <Link to='/admin/dashboard' className='cursor-pointer hover:text-black font-mono'>Trang quản trị</Link>
                                    </>
                                )}
                                <button onClick={logoutHandler} className='cursor-pointer hover:text-black font-mono'>Đăng xuất</button>
                            </div>
                        </div>
                    )}
                    
                    {!userInfo && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <Link to='/login' className='cursor-pointer hover:text-black font-mono'>Đăng nhập</Link>
                                <Link to='/register' className='cursor-pointer hover:text-black font-mono'>Đăng ký</Link>
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/favorite' className='relative'>
                    <FavoriteBorderOutlinedIcon className='w-5 cursor-pointer text-base'/>
                    <FavoritesCount />
                </Link>

                <Link to='/cart' className='relative'>
                    <ShoppingCartOutlinedIcon className='w-5 cursor-pointer text-base'/>
                        {cartItems.length > 0 && (
                            <span>
                                <span className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[12px]'>
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            </span>
                        )}
                </Link>

                <button onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden'>
                    <MenuIcon />
                </button>

            </div>
            
            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full': 'w-0'} `}>
                <div className='flex flex-col text-grey-600'>
                    <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={() => setVisible(false)}>
                        <button className='h-4'><ArrowBackOutlinedIcon/></button>
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>TRANG CHỦ</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/shop'>SẢN PHẨM</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>GIỚI THIỆU</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>LIÊN LẠC</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navigation