export default function ProductPriceFilter() {

    return (
        <>
           <div
                className="flex items-center justify-between p-3 w-full text-xl">
                    <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">Under 1$</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between p-3 w-full text-xl">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">Under 10$</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between p-3 w-full text-xl">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">Under 100$</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between p-3 w-full text-xl">
                <input
                    type="number"
                    className="border border-gray-400 py-1 w-24 text-yellow-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                />
                <span className="text-black">~</span>
                <input
                    type="number"
                    className="border border-gray-400 py-1 w-24 text-yellow-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                />
            </div>
        </>
    )
}