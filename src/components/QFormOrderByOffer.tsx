import { FC } from "react";
import QHeading from "./QHeading";
import QInputRadio from "./QInputRadio";

interface QFormOrderByOfferProps {
    setOrderBy: React.Dispatch<
        React.SetStateAction<"course-name" | "price" | "rating">
    >; // add setorderby prop
    orderBy: "course-name" | "price" | "rating"; // add orderby prop to control checked state
}

const QFormOrderByOffer: FC<QFormOrderByOfferProps> = ({
    setOrderBy,
    orderBy,
}) => {
    return (
        <form action="#">
            <QHeading tag="h2" size="sm" className="mb-2">
                Ordenar
            </QHeading>

            <QInputRadio
                label="Cursos de A-Z"
                name="order-by"
                value="course-name"
                onChange={() => setOrderBy("course-name")} // update order by when selected
                checked={orderBy === "course-name"} // set checked based on current state
            />

            <QInputRadio
                label="Menor preço"
                name="order-by"
                value="price"
                onChange={() => setOrderBy("price")} // update order by when selected
                checked={orderBy === "price"} // set checked based on current state
            />

            <QInputRadio
                label="Melhor avaliados"
                name="order-by"
                value="rating"
                onChange={() => setOrderBy("rating")} // update order by when selected
                checked={orderBy === "rating"} // set checked based on current state
            />
        </form>
    );
};

export default QFormOrderByOffer;