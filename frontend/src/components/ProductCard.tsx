type ProductCardProps = {
    id: number;
    image: string;
    name: string;
    price: number;
    font: string;
    color: string;
    size: string;
    onThisClick: () => void;
};

export default function ProductCard(props: ProductCardProps) {
    return (
        <div>
            <div className="w-72 h-80 bg-white rounded-3xl drop-shadow-lg font-nunito">
                <div className="flex flex-col items-center justify-center">
                    <img className="rounded-3xl w-40 h-24 object-contain" src={props.image} alt="" />
                </div>
                <div className="mt-3 px-4">
                    <h5 className="col-span-2 mb-2 text-sm font-extrabold tracking-tight text-gray-900">
                        {props.name}
                    </h5>
                    <div className="flex items-center">
                        <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512">
                            <path fill="orange" d="m209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5c6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3c0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5c24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7c21.5-61.6-14.6-124.8-72.5-141.7z" />
                        </svg>
                        <span className="px-1.5 py-1.5 mr-1.5 text-xs font-light">Price : Rp {props.price}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 18L8 6L3 18m8-4H5m16 4v-3m0 0v-3m0 3a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="px-1.5 py-1.5 mr-1.5 text-xs font-light">Default Font : {props.font}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1c-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z" /></svg>
                        <span className="px-1.5 py-1.5 mr-1.5 text-xs font-light">Default Color : {props.color}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M6 1h12v22H6V1Zm2 2v3h2.5v2H8v3h4v2H8v3h2.5v2H8v3h8V3H8Z" /></svg>
                        <span className="px-1.5 py-1.5 mr-1.5 text-xs font-light">Size : {props.size}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="mt-2 w-1/2 my-2 px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300" onClick={props.onThisClick}>
                            Customize This
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
