import ProductRating from "./ProductRating";

export default function ProductRatingFilter() {

    return (
        <>
            <div className="flex space-x-2 items-center"><ProductRating rating={4} /> <div className="mt-2">4 stars or more</div></div>
            <div className="flex space-x-1 items-center"><ProductRating rating={3} /> <div className="mt-2">3 stars or more</div></div>
            <div className="flex space-x-1 items-center"><ProductRating rating={2} /> <div className="mt-2">2 stars or more</div></div>
            <div className="flex space-x-1 items-center"><ProductRating rating={1} /> <div className="mt-2">1 star or more</div></div>
        </>
    )
}