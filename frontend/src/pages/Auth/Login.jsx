import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/userApiSlice"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { assets } from "../../assets/assets"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const { userInfo}  = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap()
            console.log(res);
            dispatch(setCredientials({ ...res }))
            toast.success("Đăng nhập thành công!");
        } catch (error) {
            toast.error(error?.data?.message || error.message || "Sai email hoặc mật khẩu, vui lòng thử lại!")
        }
    }

  return (
    <div>
        <section className="pl-[5rem] flex flex-wrap my-[4rem]">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 font-mono">Đăng nhập</h1>

                <form onSubmit={submitHandler} className="container w-[38rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium font-mono">Email</label>
                        <input type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium font-mono">Mật khẩu</label>
                        <input type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button disabled={isLoading} type="submit" className="bg-green-500 hover:bg-green-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Đang chạy..." : "Đăng nhập"}</button>
                
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4">
                    <p className="text-black">
                        Chưa có tài khoản? {" "}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-green-500 hover:underline" >Đăng ký</Link>
                    </p>
                </div>
            </div>
            <img src={assets.introduction} alt="" className="h-[42%] w-[53%] xl:block md:hidden sm:hidden rounded-lg mt-[1rem]" />
        </section>
    </div>
  )
}

export default Login