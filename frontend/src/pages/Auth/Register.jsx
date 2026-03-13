import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/userApiSlice"
import { assets } from "../../assets/assets"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp')
        } else {
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCredientials({ ...res }))
                navigate(redirect)
                toast.success("Đăng ký thành công")
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }

  return (
    <section className="pl-[5rem] flex flex-wrap my-[4rem]">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">Đăng ký</h1>
            <form onSubmit={submitHandler} className="container w-[38rem]">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-sm font-medium">Tên đăng nhập</label>
                    <input type="text" id="name" className="mt-1 p-2 border rounded w-full" placeholder="Nhập tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" id="email" className="mt-1 p-2 border rounded w-full" placeholder="Nhập email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium">Mật khẩu</label>
                    <input type="password" id="password" className="mt-1 p-2 border rounded w-full" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Nhập lại mật khẩu</label>
                    <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>

                <button disabled={isLoading} type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Đang chạy..." : "Đăng ký"}</button>

                {isLoading && <Loader />}
                <div className="mt-4">
                    <p className="text-black">
                        Đã có tài khoản? {" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-green-500 hover:underline" >Đăng nhập</Link>
                    </p>
                </div>
            </form>
        </div>
        <img src={assets.introduction} alt="" className="h-[42%] w-[53%] xl:block md:hidden sm:hidden rounded-lg mt-[1rem]" />
    </section>
  )
}

export default Register