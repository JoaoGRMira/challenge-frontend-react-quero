import { FC } from "react";
import QText from "./QText";
import QIconStar from "./QIconStar";

interface QBadgeProps {
    rating: number;
}

const QRating: FC<QBadgeProps> = ({ rating }) => {
    const stars = Math.floor(rating); // number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // check if a half star should be displayed
    const emptyStars = 5 - stars - (hasHalfStar ? 1 : 0); // number of empty stars

    return (
        <div className="flex items-center gap-2">
            <QText tag="span">{rating.toFixed(1)}</QText>
            {/* displays the rating with one decimal place */}
            <div className="flex items-center space-x-1 text-yellow-500">
                {/* create a number of stars components equal to the number of full stars */}
                {Array.from({ length: stars }, (_, index) => (
                    <QIconStar key={index} />
                ))}
                {/* conditionally renders a half star component if applicable */}
                {hasHalfStar && <QIconStar half />}
                {/* create a number of stars components for empty stars based on the calculation */}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <QIconStar
                        key={index + stars + (hasHalfStar ? 1 : 0)}
                        empty
                    />
                ))}
            </div>
        </div>
    );
};

export default QRating;