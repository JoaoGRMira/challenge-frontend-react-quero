import { FC, useState } from "react";
import QHeading from "./QHeading";
import QFieldset from "./QFieldset";
import QInputCheckbox from "./QInputCheckbox";
import QInputRange from "./QInputRange";

interface QFormFilterOfferProps {
    onFilterChange: (filters: { levels: string[]; kinds: string[] }) => void;
}

const QFormFilterOffer: FC<QFormFilterOfferProps> = ({ onFilterChange }) => {
    // initialize state for selected levels and course kinds
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]); // state for managing levels
    const [selectedKinds, setSelectedKinds] = useState<string[]>([]); // state for managing kinds

    // handle changes to the selected levels
    const handleLevelChange = (level: string) => {
        // add level if not selected or remove if already selected
        const updatedLevels = selectedLevels.includes(level)
            ? selectedLevels.filter((l) => l !== level)
            : [...selectedLevels, level];
        
        // update levels state with new selection
        setSelectedLevels(updatedLevels);
        
        // pass updated filters to the parent component
        onFilterChange({ levels: updatedLevels, kinds: selectedKinds });
    };

    // handle changes to the selected kinds (presencial or ead)
    const handleKindChange = (kind: string) => {
        // add kind if not selected or remove if already selected
        const updatedKinds = selectedKinds.includes(kind)
            ? selectedKinds.filter((k) => k !== kind)
            : [...selectedKinds, kind];
        
        // update kinds state with new selection
        setSelectedKinds(updatedKinds);
        
        // pass updated filters to the parent component
        onFilterChange({ levels: selectedLevels, kinds: updatedKinds });
    };

    // render form with sections for each filter category
    return (
        <form action="#">
            {/* main heading for the filter form */}
            <QHeading tag="h1">Filtros</QHeading>

            <hr className="my-5" />

            {/* section for selecting course levels */}
            <QFieldset legend="Graduação">
                <QInputCheckbox label="Bacharelado" onChange={() => handleLevelChange("bacharelado")} />
                <QInputCheckbox label="Licenciatura" onChange={() => handleLevelChange("licenciatura")} />
                <QInputCheckbox label="Tecnólogo" onChange={() => handleLevelChange("tecnologo")} />
            </QFieldset>

            <hr className="my-5" />

            {/* section for selecting course modalities */}
            <QFieldset legend="Modalidade do curso">
                <QInputCheckbox label="Presencial" onChange={() => handleKindChange("presencial")} />
                <QInputCheckbox label="A distância - EaD" onChange={() => handleKindChange("ead")} />
            </QFieldset>

            <hr className="my-5" />

            {/* section for adjusting course price */}
            <QFieldset legend="Preço da mensalidade">
                <QInputRange label="R$ 1,000" />
            </QFieldset>

            <hr className="mt-5" />
        </form>
    );
};

export default QFormFilterOffer;