import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post(`http://localhost:8000/user/signin`, {
                email: inputs.email,
                password: inputs.password
            }, {
                withCredentials: true
            }
            );
            navigate('/');
            console.log(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">SignIn</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 mb-2"
                    >
                        SignIn
                    </button>
                    <div className='text-center'>
                        <span className='font-medium'>Already have an account?
                            <Link to='/signup'><span className='text-red-700 underline cursor-pointer m-1'>SignUp</span></Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
