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
    const [searchTerm, setSearchTerm] = useState(""); // state for search term
    const [ordenedOffers, setOrdenedOffers] = useState<Offer[]>([]); // state for ordened offers
    const [orderBy, setOrderBy] = useState<"course-name" | "price" | "rating">(
        "course-name"
    ); // state for order by rating, price or name
    const [filters, setFilters] = useState<{
        levels: string[];
        kinds: string[];
    }>({
        levels: [],
        kinds: [],
    }); // state for filtered offers

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
                setOffers(data); // initialize offers
                setOrdenedOffers(data); // initialize ordened offers
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

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setOrdenedOffers(offers); // if search term is empty, show all available offers
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            // check if the course name contains the search term
            const filtered = offers.filter((offer) =>
                offer.courseName.toLowerCase().includes(lowerCaseSearchTerm)
            );

            setOrdenedOffers(filtered); // set filtered offers based on search term
        }
    };

    useEffect(() => {
        // logic to filter and sort offers
        let sortedOffers = [...offers];

        // sort based on orderby
        if (orderBy === "course-name") {
            sortedOffers.sort((a, b) =>
                a.courseName.localeCompare(b.courseName)
            ); // sort by course name
        } else if (orderBy === "price") {
            sortedOffers.sort((a, b) => a.offeredPrice - b.offeredPrice); // sort by offered price
        } else if (orderBy === "rating") {
            sortedOffers.sort((a, b) => b.rating - a.rating); // sort by rating
        }

        // set ordened offers based on sorting
        setOrdenedOffers(sortedOffers);
    }, [offers, orderBy]); // re-run sorting when offers or orderby changes

    const applyFilters = () => {
        let filtered = offers;

        // filter by level
        if (filters.levels.length > 0) {
            filtered = filtered.filter((offer) =>
                filters.levels.includes(offer.level)
            );
        }

        // filter by kind
        if (filters.kinds.length > 0) {
            filtered = filtered.filter((offer) =>
                filters.kinds.includes(offer.kind)
            );
        }

        setOrdenedOffers(filtered);
    };

    useEffect(() => {
        applyFilters(); // aply filters always when offers or filters changes
    }, [offers, filters]);

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // capture input value
                    />
                    <QButton type="button" onClick={handleSearch}>
                        Buscar
                    </QButton>
                </QHeader>
            }
            sidebar={<QFormFilterOffer onFilterChange={setFilters} />} // call function to manage filters
            footer={<QFooter />}
        >
            <QSectionForm
                title="Veja as opções que encontramos"
                orderBy={
                    <QFormOrderByOffer
                        setOrderBy={setOrderBy}
                        orderBy={orderBy}
                    />
                } // pass orderby to control checked state
                filter={<QFormFilterOffer onFilterChange={setFilters} />}
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
                    <QListCard cards={ordenedOffers}>
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