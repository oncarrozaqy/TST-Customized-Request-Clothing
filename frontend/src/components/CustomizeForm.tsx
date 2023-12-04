import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-toastify';

interface CustomizeFormProps {
    onClose: () => void;
    idProduct: number;
}


const CustomizeForm: React.FC<CustomizeFormProps> = (props) => {

    const [formData, setFormData] = useState({
        specialInstructions: "",
        image: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newFormData = { ...formData };
        newFormData[e.target.id as keyof typeof newFormData] = e.target.value;
        setFormData(newFormData);
        console.log(newFormData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onClose();
        try {
            const data = formData.specialInstructions + " Design Image: " + formData.image

            // Retrieve the authentication token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Include the token in the request headers
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            console.log(headers)
            console.log(data)
            // Lakukan pembaruan menu menggunakan Axios
            const response = await axios.post(`http://127.0.0.1:8000/customizationRequests?productID=${props.idProduct}&specialInstructions=${data}`, null, { headers });

            console.log(response);
            toast.success('Request created successfully');
        } catch (error) {
            console.error('Error create request', error);
            toast.error('Error create request');
        }
    };
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-200 opacity-100 rounded-2xl">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-lg" >
                        <h3 className="text-lg font-semibold text-gray-900 font-nunito">
                            Create a Request
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={props.onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="specialInstructions" className="font-nunito block mb-2 text-sm font-bold text-gray-900">Your Request:</label>
                                <textarea
                                    id="specialInstructions"
                                    name="specialInstructions"
                                    rows={8}
                                    value={formData.specialInstructions}
                                    onChange={(e) => handleInputChange(e)}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Write your special instructions here. Example: I want to change the color to red and the font to Arial and add some paint splatter on the design."
                                    required
                                ></textarea>

                            </div>
                            <div className="col-span-2">
                                <label htmlFor="image" className="font-nunito block mb-2 text-sm font-bold text-gray-900">Image Design URL</label>
                                <input type="text" name="image" id="image" value={formData.image}
                                    onChange={(e) => handleInputChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert your design image URL" required />
                            </div>
                        </div >
                        <div className="flex flex-col items-center justify-center">
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-500 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Submit Request
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default CustomizeForm;
