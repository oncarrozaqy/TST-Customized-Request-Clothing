import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/customizationrequest";

    const handleLogin = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axios.post('http://127.0.0.1:8000/authentications/login', formData);
            console.log(response);
            localStorage.setItem('accessToken', response.data.access_token);
            console.log(localStorage.getItem('accessToken'));
            toast.success("Logged in successfully.");
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login.");
        }

    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 rounded-3xl">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-4xl xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex items-center justify-center">
                        <div className="p-4 space-y-4 md:space-y-6 sm:p-6 w-full">
                            <h1 className="text-xl font-lato font-bold leading-tight tracking-tight text-red-700 md:text-4xl text-center">
                                LOGIN
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-md font-medium text-blue-600"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="example123"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-md font-medium text-blue-600"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="flex flex-col items-center justify-center w-1/2 text-white bg-red-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Login
                                    </button>
                                </div>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account yet?{" "}
                                    <a
                                        href="/register"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Register
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default LoginForm;
