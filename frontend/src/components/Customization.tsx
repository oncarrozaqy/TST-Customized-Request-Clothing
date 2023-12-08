import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import CustomizeForm from './CustomizeForm';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

interface ProductCard {
    id: number;
    description: string;
    price: number;
    stock: number;
    default_font: string;
    default_color: string;
    size: string;
    productType: string;
    imageurl: string;
}

export default function Customization() {
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [font, setFont] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [productType, setProductType] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem('accessToken');
            navigate('/', { replace: true });
            toast.success('Logged out successfully.');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during logout.');
        }
    };

    const fetchProducts = async () => {
        try {
            // Retrieve the authentication token from localStorage
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken)

            // Include the token in the request headers
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            // Make the Axios request with the authentication token
            const response = await axios.get('https://customizedclothintegrated.salmonbeach-997612a6.australiaeast.azurecontainerapps.io//products', { headers });

            // Transform each inner array into an object
            const productsArray = response.data.map((innerArray: [number, string, number, number, string, string, string, string, string]) => {
                const [id, description, price, stock, default_font, default_color, size, productType, imageurl] = innerArray;
                return {
                    id,
                    description,
                    price,
                    stock,
                    default_font,
                    default_color,
                    size,
                    productType,
                    imageurl,
                };
            });

            console.log(productsArray);

            setProducts(productsArray);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken)


            // Include the token in the request headers
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            // Make the Axios request with the authentication token
            const response = await axios.get(`https://customizedclothintegrated.salmonbeach-997612a6.australiaeast.azurecontainerapps.io//customizationRequests/${font}/${color}/${size}/${productType}`, { headers });

            console.log(response.data);

            // Transform each inner array into an object
            const productsArray = response.data.map((innerArray: [number, string, number, number, string, string, string, string, string]) => {
                const [id, description, price, stock, default_font, default_color, size, productType, imageurl] = innerArray;
                return {
                    id,
                    description,
                    price,
                    stock,
                    default_font,
                    default_color,
                    size,
                    productType,
                    imageurl,
                };
            });
            setProducts(productsArray);
            console.log(productsArray);

        } catch (error) {
            console.error('No Products Match Your Preference', error);
            toast.error('No Products Match Your Preference');
        }
    };

    const handleRestart = () => {
        setFont('');
        setColor('');
        setSize('');
        setProductType('');
        fetchProducts();
    };

    const [selectedProductId, setSelectedProductId] = useState(0);
    const [isCustomizeFormVisible, setIsCustomizeFormVisible] = useState(false);

    const handleCustomizeForm = (id: number) => {
        setSelectedProductId(id);
        setIsCustomizeFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsCustomizeFormVisible(false);
    };

    const [material, setMaterial] = useState('');
    const [weight, setWeight] = useState('');
    const [FashUpData, setFashUpData] = useState('');
    const [isFashUpRunning, setIsFashUpRunning] = useState(false);

    const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMaterial(e.target.value);
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
    };

    const handleFashUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken)


            // Include the token in the request headers
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            // Make the Axios request with the authentication token
            const response = await axios.get(`https://customizedclothintegrated.salmonbeach-997612a6.australiaeast.azurecontainerapps.io//quantity?material_input=${material}&weight_input=${weight}`, { headers });

            console.log(response.data);

            setFashUpData(response.data);
            setIsFashUpRunning(true);

        } catch (error) {
            console.error(`You're not an admin`, error);
            toast.error(`You're not an admin`);
        }
    };
    return (
        <div className='flex flex-col'>
            <div>
                <h1 className='text-xl font-lato font-bold leading-tight tracking-tight md:text-4xl text-center my-4'>
                    Welcome to Customize Clothing
                </h1>
                <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white rounded-md px-4 py-2 mx-4 ml-auto hover:bg-red-600 absolute top-16 right-0'
                >
                    Logout
                </button>
                <p className='mx-4 my-4 text-md font-light text-gray-500'>You can set your preference here:</p>

                <form className='mx-4 my-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor='font' className='text-md font-light text-gray-500'>
                            Font:
                        </label>
                        <input
                            type='text'
                            id='font'
                            value={font}
                            placeholder='Example: Arial'
                            onChange={(e) => setFont(e.target.value)}
                            required
                            className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor='color' className='text-md font-light text-gray-500'>
                            Color:
                        </label>
                        <input
                            type='text'
                            id='color'
                            value={color}
                            placeholder='Example: Red'
                            required
                            onChange={(e) => setColor(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor='size' className='text-md font-light text-gray-500'>
                            Size:
                        </label>
                        <select
                            id='size'
                            value={size}
                            required
                            onChange={(e) => setSize(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='' disabled hidden>Select Size</option>
                            <option value='S'>S</option>
                            <option value='M'>M</option>
                            <option value='L'>L</option>
                            <option value='XL'>XL</option>
                            <option value='XXL'>XXL</option>
                        </select>
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor='productType' className='text-md font-light text-gray-500'>
                            Product Type:
                        </label>
                        <input
                            type='text'
                            id='productType'
                            value={productType}
                            placeholder='Example: T-Shirt'
                            required
                            onChange={(e) => setProductType(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <button
                        type='submit'
                        className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600'
                    >
                        Apply
                    </button>
                    <button
                        type='button'
                        className='bg-gray-300 text-gray-700 rounded-md px-4 py-2 mt-2 ml-2 hover:bg-gray-400'
                        onClick={handleRestart}
                    >
                        Reset
                    </button>
                </form>
                <p className='mx-4 my-4 text-md font-light text-gray-500'>Here are some products we recommends</p>

                <div className='grid grid-cols-4 gap-6 h-4/5 my-6 mx-4 justify-items-center w-full min-h-fit'>
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard
                                id={product.id}
                                image={product.imageurl}
                                price={product.price}
                                name={product.description}
                                color={product.default_color}
                                font={product.default_font}
                                size={product.size}
                                onThisClick={() => handleCustomizeForm(product.id)}
                            />
                        </div>
                    ))}
                </div>
                {isCustomizeFormVisible && (
                    <CustomizeForm
                        onClose={handleCloseForm}
                        idProduct={selectedProductId}
                    />
                )}
            </div>
            <div>
                <h1 className='text-xl font-lato font-bold leading-tight tracking-tight md:text-4xl text-center my-4'>
                    FashUp!
                </h1>
                <p className='mx-4 my-4 text-md font-light text-gray-500'>If you're an admin, you can try:</p>
                <div className='mx-4 my-4 flex flex-col mt-4'>
                    <label htmlFor='material' className='text-md font-light text-gray-500'>
                        What Material Do You Have?
                    </label>
                    <select
                        id='material'
                        value={material}
                        onChange={handleMaterialChange}
                        required
                        className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='' disabled hidden>Select Material</option>
                        <option value='Cotton'>Cotton</option>
                        <option value='Polyester'>Polyester</option>
                        <option value='Silk'>Silk</option>
                        <option value='Wool'>Wool</option>
                        <option value='Denim'>Denim</option>
                        <option value='Leather'>Leather</option>
                        <option value='Linen'>Linen</option>
                        <option value='Flanel'>Flanel</option>
                    </select>
                </div>
                <form onSubmit={handleFashUp} >
                    <div className='mx-4 my-4 flex flex-col mt-4'>
                        <label htmlFor='weight' className='text-md font-light text-gray-500'>
                            Weight of Material:
                        </label>
                        <input
                            type='text'
                            id='weight'
                            value={weight}
                            placeholder='Enter weight'
                            onChange={handleWeightChange}
                            required
                            className='border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <h2 className='text-md font-lato font-medium leading-tight tracking-tight md:text-md text-center my-4'>
                        Check This To See What You Can Make!
                    </h2>

                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600'
                        >
                            Apply
                        </button>
                    </div>
                    {isFashUpRunning && (
                        <div>
                            <p className='mx-4 my-4 text-md font-light text-gray-500'>{FashUpData[0]}</p>
                            <ul>
                                {Object.entries(FashUpData[1]).map(([item, quantity]) => (
                                    <li key={item} className='mx-4 my-4 text-md font-light text-gray-500'>
                                        {item}: {quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
