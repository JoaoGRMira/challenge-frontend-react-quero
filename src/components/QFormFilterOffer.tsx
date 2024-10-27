import { FC, useState } from "react";
import QHeading from "./QHeading";
import QFieldset from "./QFieldset";
import QInputCheckbox from "./QInputCheckbox";
import QInputRange from "./QInputRange";

interface QFormFilterOfferProps {
    onFilterChange: (filters: { levels: string[]; kinds: string[]; maxPrice: number }) => void; // callback for filter changes
}

const QFormFilterOffer: FC<QFormFilterOfferProps> = ({ onFilterChange }) => {
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedKinds, setSelectedKinds] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(900);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL", // setting the currency format to R$
        }).format(value);
    };

    const handleLevelChange = (level: string) => {
        const updatedLevels = selectedLevels.includes(level)
            ? selectedLevels.filter((l) => l !== level) // remove level if already selected
            : [...selectedLevels, level]; // add level if not selected

        setSelectedLevels(updatedLevels);
        onFilterChange({ levels: updatedLevels, kinds: selectedKinds, maxPrice }); // notify parent component
    };

    const handleKindChange = (kind: string) => {
        const updatedKinds = selectedKinds.includes(kind)
            ? selectedKinds.filter((k) => k !== kind) // remove kind if already selected
            : [...selectedKinds, kind]; // add kind if not selected

        setSelectedKinds(updatedKinds);
        onFilterChange({ levels: selectedLevels, kinds: updatedKinds, maxPrice }); // notify parent component
    };

    // function to handle changes in maximum price
    const handlePriceChange = (value: number) => {
        setMaxPrice(value);
        onFilterChange({ levels: selectedLevels, kinds: selectedKinds, maxPrice: value }); // notify parent component
    };

    return (
        <form action="#">
            <QHeading tag="h1">Filtros</QHeading>
            <hr className="my-5" />

            <QFieldset legend="Graduação">
                <QInputCheckbox label="Bacharelado" onChange={() => handleLevelChange("bacharelado")} />
                <QInputCheckbox label="Licenciatura" onChange={() => handleLevelChange("licenciatura")} />
                <QInputCheckbox label="Tecnólogo" onChange={() => handleLevelChange("tecnologo")} />
            </QFieldset>

            <hr className="my-5" />

            <QFieldset legend="Modalidade do curso">
                <QInputCheckbox label="Presencial" onChange={() => handleKindChange("presencial")} />
                <QInputCheckbox label="A distância - EaD" onChange={() => handleKindChange("ead")} />
            </QFieldset>

            <hr className="my-5" />

            <QFieldset legend="Preço da mensalidade">
                <QInputRange 
                    label={`Max ${formatCurrency(maxPrice)}`}
                    min={200}
                    max={900}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                />
            </QFieldset>

            <hr className="mt-5" />
        </form>
    );
};

export default QFormFilterOffer; 