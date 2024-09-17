import React from 'react';
import { IoStarHalfSharp } from "react-icons/io5";

type ProductProps = {
    rating: number;
    numReviews?: number;
};

const ProductRating: React.FC<ProductProps> = ({ rating, numReviews}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {/* Full Stars */}
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <span key={index} className="text-yellow-500 text-lg">★</span>
                ))}
            {/* Half Star */}
            {/* {hasHalfStar && <span className="text-yellow-500 text-lg">☆</span>} */}
            {hasHalfStar && <span className="text-yellow-500 text-sm"><IoStarHalfSharp  /></span>} 
            {/* Empty Stars */}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <span key={index} className="text-gray-300 text-lg">★</span>
                ))}
            {/* Reviews Count */}
            {numReviews !== undefined && <span className="text-sm text-gray-600 ml-2">({numReviews} reviews)</span>}
        </div>
    );
};

export default ProductRating;
