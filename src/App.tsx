import { useState, useEffect } from "react";

import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QCardOffer from "./components/QCardOffer";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";

// define the offer interface for data consistency and type checking
interface Offer {
    id: string;
    courseName: string;
    rating: number;
    fullPrice: number;
    offeredPrice: number;
    discount?: string; // discount value is optional
    kind: string;
    level: string;
    iesLogo: string;
    iesName: string;
}

const App: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]); // state for managing offers returned by request
    const [loading, setLoading] = useState(true); // state for managing data loading
    const [error, setError] = useState<string | null>(null); // state for error handling

    useEffect(() => {
        // fetch offers from api on component mount
        const fetchOffers = async () => {
            try {
                const response = await fetch("http://localhost:3000/offers");

                // handle error responses
                if (!response.ok) {
                    throw new Error(
                        `Erro ao carregar ofertas: ${response.statusText}`
                    );
                }

                const data: Offer[] = await response.json();
                setOffers(data); // update offers state with fetched data
            } catch (error) {
                // if fetch fails, set error message state
                setError(
                    "Não foi possível carregar as ofertas. Tente novamente mais tarde."
                );
            } finally {
                setLoading(false); // after fetching, set loading to false
            }
        };

        fetchOffers(); // initiate fetch function on mount
    }, []);

    return (
        <QLayout
            header={
                <QHeader>
                    <QInput
                        type="search"
                        id="site-search"
                        name="q"
                        placeholder="Busque o curso ideal para você"
                        aria-label="Buscar cursos e bolsas"
                    />
                    <QButton type="submit">Buscar</QButton>
                </QHeader>
            }
            sidebar={<QFormFilterOffer />}
            footer={<QFooter />}
        >
            <QSectionForm
                title="Veja as opções que encontramos"
                orderBy={<QFormOrderByOffer />}
                filter={<QFormFilterOffer />}
            />

            <div className="mt-6">
                {loading ? (
                    // loading state message
                    <p>Carregando ofertas...</p>
                ) : error ? (
                    // message display in case of error
                    <p className="text-red-500">{error}</p>
                ) : (
                    // render list of offer cards when loaded
                    <QListCard cards={offers}>
                        {(card) => (
                            <QCardOffer
                                key={card.id}
                                courseName={card.courseName}
                                rating={card.rating}
                                fullPrice={String(card.fullPrice)}
                                offeredPrice={String(card.offeredPrice)}
                                discount={String(card.discount ?? "")} // optional discount value
                                kind={card.kind}
                                level={card.level}
                                iesLogo={card.iesLogo}
                                iesName={card.iesName}
                            />
                        )}
                    </QListCard>
                )}
            </div>
        </QLayout>
    );
};

export default App;