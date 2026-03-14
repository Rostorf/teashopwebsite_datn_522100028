import { useState, useEffect, use } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/userApiSlice"

const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const dispatch = useDispatch()

    const submitHandler = async(e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp')
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                dispatch(setCredientials({...res}))
                toast.success("Cập nhật thông tin thành công")
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Cập nhật thông tin cá nhân</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block mb-2">Tên đăng nhập</label>
                        <input type="text" placeholder="Nhập tên đăng nhập" className="form-input p-4 my-2 rounded-sm w-full bg-gray-200" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input type="email" placeholder="Nhập email" className="form-input p-4 my-2 rounded-sm w-full bg-gray-200" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Mật khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu" className="form-input p-4 my-2 rounded-sm w-full bg-gray-200" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Nhập lại mật khẩu</label>
                        <input type="password" placeholder="Nhập lại mật khẩu" className="form-input p-4 my-2 rounded-sm w-full bg-gray-200" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 my-10 rounded hover:bg-green-600">Cập nhật</button>

                        <Link to='/user-orders' className="bg-green-500 text-white py-2 px-4 my-10 rounded hover:bg-green-600">
                            Đơn hàng của tôi
                        </Link>
                    </div>
                </form>
            </div>
            {loadingUpdateProfile && <Loader />}
        </div>
    </div>
  )
}

export default Profile