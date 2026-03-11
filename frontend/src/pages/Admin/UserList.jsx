import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import {
    useGetUsersQuery, 
    useDeleteUserMutation,
    useUpdateUserMutation
} from '../../redux/api/userApiSlice'
import Message from '../../components/Message'
import CheckIcon from '@mui/icons-material/Check';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async(id) => {
        if (window.confirm('Xóa người dùng khỏi dữ liệu?')) {
            try {
                await deleteUser(id) 
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async(id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail
            })

            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }

  return (
    <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data.message || error.message}</Message>) : (
            <div className="flex flex-col md:flex-row">
                {/* Admin Menu */}
                <table className="w-full md:w-4/5 mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Tên đăng nhập</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Admin</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-4 py-2">{user._id}</td>
                                <td className="px-4 py-2">{editableUserId === user._id ? (
                                    <div className="flex items-center">
                                        <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="w-full p-2 border rounded-lg" />
                                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-400 text-white py-2 px-4 rounded-lg">
                                            <CheckIcon/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        {user.username} {" "}
                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                            <EditSquareIcon className="ml-[1rem] cursor-pointer" />
                                        </button>
                                    </div>
                                )}
                                </td>
                                <td className="px-4 py-2">
                                    {editableUserId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className="w-full p-2 border rounded-lg" />
                                            <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-400 text-white py-2 px-4 rounded-lg">
                                                <CheckIcon/>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <p>{user.email}</p>
                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                            <EditSquareIcon className="ml-[1rem] cursor-pointer" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {user.isAdmin ? (
                                        <CheckIcon style={{color: 'green'}}/>
                                    ) : (
                                        <ClearOutlinedIcon style={{color: 'red'}}/>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {!user.isAdmin && (
                                        <div className="flex">
                                            <button onClick={() => deleteHandler(user._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            <DeleteIcon/>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}

export default UserList