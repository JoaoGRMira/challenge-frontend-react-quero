import { FC } from "react";
import QText from "./QText";
import QRating from "./QRating";
import QPrice from "./QPrice";
import QButton from "./QButton";
import QHeading from "./QHeading";

interface QCardOfferProps {
    courseName: string;
    rating: number;
    fullPrice: string;
    offeredPrice: string;
    discount: string;
    kind: string;
    level: string;
    iesLogo: string;
    iesName: string;
}

// formatting kind
const formatKind = (tipo: string) => {
    return tipo === "presencial" ? "Presencial" : tipo === "ead" ? "EaD" : tipo;
};

// formatting graduation level
const formatLevel = (nivel: string) => {
    switch (nivel) {
        case "bacharelado":
            return "Graduação (bacharelado)";
        case "tecnologo":
            return "Graduação (tecnólogo)";
        case "licenciatura":
            return "Graduação (licenciatura)";
        default:
            return nivel;
    }
};

// formatting price
const formatPrice = (preco: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency", // style as currency
        currency: "BRL", // currency in R$
    }).format(preco);
};

// calculate discount percentage
const calculateDiscount = (fullPrice: number, offeredPrice: number) => {
    if (fullPrice && offeredPrice) {
        const desconto = ((fullPrice - offeredPrice) / fullPrice) * 100; // calculate discount based on full price and offered price
        return `${Math.round(desconto)}%`; // return discount percentage
    }
    return "0%";
};

const QCardOffer: FC<QCardOfferProps> = ({
    courseName,
    rating,
    fullPrice,
    offeredPrice,
    kind,
    level,
    iesLogo,
    iesName,
}) => {
    return (
        <article className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between items-start gap-3 min-h-[355px]">
            <img src={iesLogo} alt={iesName} className="h-10 object-contain" />
            <QHeading tag="h2" size="sm">
                {courseName}
            </QHeading>
            <QRating rating={rating} />
            <QPrice
                fullPrice={formatPrice(parseFloat(fullPrice))} // fill with formatted full price
                offeredPrice={formatPrice(parseFloat(offeredPrice))} // fill with formatted offered price
                discount={calculateDiscount(
                    parseFloat(fullPrice),
                    parseFloat(offeredPrice)
                )} // fill with formatted discount percentage
            />
            <div>
                <QText tag="p">{formatKind(kind)}</QText>
                <QText tag="p" color="minor" size="sm">
                    {formatLevel(level)}{" "}
                    {/* fill with formatted graduation level */}
                </QText>
            </div>
            <QButton tag="a" size="sm" className="w-full">
                Quero esta bolsa
            </QButton>
        </article>
    );
};

export default QCardOffer;