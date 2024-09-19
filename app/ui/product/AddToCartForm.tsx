import { JSONObject } from '@/lib/definations';
import { useState } from 'react';


export default function AddToCartForm({ data }: {data: JSONObject}) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity > 0 && newQuantity <= data.stock ? newQuantity : 1);
    };

    const handleAddToCart = () => {
        // Example action for adding to cart
        const cartItem = {
            productId: data.id,
            name: data.name,
            price: data.price,
            quantity: quantity,
        };

        console.log('Added to cart:', cartItem);
        // Dispatch an action to add this item to the global cart state
    };

    const totalPrice = quantity * data.price;
    return (
        <form className="p-4 bg-gray-50 border rounded-lg shadow-md max-w-lg">
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <div className="">{data.description}</div>
            <div className="text-gray-700 my-1">Price: ${data.price}</div>
            <div className="text-sm text-gray-600 mb-4">Available stock: {data.stock}</div>

            <div className="mb-4">
                <label className="block mb-2">Quantity:</label>
                <input
                    type="number"
                    className="border border-gray-300 rounded p-2 w-16"
                    min="1"
                    max={data.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>

            <label className="block mb-4 font-semibold text-red-500 text-lg">Total: ${totalPrice}</label>


            <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                disabled={quantity > data.stock || data.stock === 0}
            >
                {data.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </form>
    );
}
