import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegistForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        address: '',
        email: '',
        username: '',
        password: '',
        role: 'customer',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/authentications/register?firstname=${formData.firstname}&lastname=${formData.lastname}&phonenumber=${formData.phonenumber}&address=${formData.address}&email=${formData.email}&password=${formData.password}&username=${formData.username}&role=${formData.role}`);
            console.log(response);
            toast.success(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Registration failed');
        }
    };



    return (
        <div className="relative bg-white rounded-xl px-16">
            <div className="flex flex-col items-center justify-between mt-4 p-4 md:p-5">
                <h1 className="text-5xl font-bold text-blue-500">
                    Register
                </h1>
            </div>
            <form
                className="p-4 md:p-5"
                onSubmit={handleSubmit}
            >
                <div className="gap-4 mb-4">
                    <div className="my-2">
                        <label
                            htmlFor="firstname"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="lastname"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="Doe"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="phonenumber"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Phonenumber
                        </label>
                        <input
                            type="text"
                            id="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="081234567890"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="address"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="Jl. Ganesha No. 10 Bandung"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="Email must be unique"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="Username must be at least 4 characters and unique"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-xl font-bold text-blue-500 "
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="font-nunito bg-white border border-blue-500 text-gray-900 text-m rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 h-14"
                            placeholder="Password must be at least 6 characters"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-500 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-2xl text-xl px-5 py-2.5 justify-center w-full h-16 mb-8"
                    >
                        Sign Up
                    </button>
                </div>
                <p className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}
