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
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [ordenedOffers, setOrdenedOffers] = useState<Offer[]>([]);

    const [orderBy, setOrderBy] = useState<"course-name" | "price" | "rating">(
        "course-name" // default sorting by course name
    );
    const [filters, setFilters] = useState<{
        levels: string[]; // array to hold selected course levels
        kinds: string[]; // array to hold selected course kinds
        maxPrice: number; // maximum price filter for courses
    }>({
        levels: [],
        kinds: [],
        maxPrice: 900,
    });

    useEffect(() => {
        // fetch offers from api
        const fetchOffers = async () => {
            try {
                const response = await fetch("http://localhost:3000/offers");
                if (!response.ok) {
                    throw new Error(
                        `Erro ao carregar ofertas: ${response.statusText}`
                    );
                }
                const data: Offer[] = await response.json();
                setOffers(data); // initialize offers
                setOrdenedOffers(data); // initialize ordened offers
            } catch (error) {
                setError(
                    "Não foi possível carregar as ofertas. Tente novamente mais tarde."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setOrdenedOffers(offers); // if search term is empty, show all available offers
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase(); // case-insensitive
            const filtered = offers.filter((offer) =>
                offer.courseName.toLowerCase().includes(lowerCaseSearchTerm)
            );
            setOrdenedOffers(filtered); // set filtered offers based on search term
        }
    };

    useEffect(() => {
        let sortedOffers = [...offers];

        if (orderBy === "course-name") {
            sortedOffers.sort((a, b) =>
                a.courseName.localeCompare(b.courseName)
            ); // sort by course name alphabetically
        } else if (orderBy === "price") {
            sortedOffers.sort((a, b) => a.offeredPrice - b.offeredPrice); // sort ascending by offered price
        } else if (orderBy === "rating") {
            sortedOffers.sort((a, b) => b.rating - a.rating); // sort descending by rating
        }

        setOrdenedOffers(sortedOffers);
    }, [offers, orderBy]); // re-run sorting when offers or orderby changes

    const applyFilters = () => {
        // function to filter by level, kind and price
        let filtered = offers;

        if (filters.levels.length > 0) {
            filtered = filtered.filter((offer) =>
                filters.levels.includes(offer.level)
            );
        }

        if (filters.kinds.length > 0) {
            filtered = filtered.filter((offer) =>
                filters.kinds.includes(offer.kind)
            );
        }

        filtered = filtered.filter(
            (offer) => offer.offeredPrice <= filters.maxPrice
        );

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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <QButton type="button" onClick={handleSearch}>
                        Buscar
                    </QButton>
                </QHeader>
            }
            sidebar={<QFormFilterOffer onFilterChange={setFilters} />}
            footer={<QFooter />}
        >
            <QSectionForm
                title="Veja as opções que encontramos"
                orderBy={
                    <QFormOrderByOffer
                        setOrderBy={setOrderBy}
                        orderBy={orderBy}
                    />
                }
                filter={<QFormFilterOffer onFilterChange={setFilters} />}
            />

            <div className="mt-6">
                {loading ? (
                    <p>Carregando ofertas...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <QListCard cards={ordenedOffers}>
                        {(card) => (
                            <QCardOffer
                                key={card.id}
                                courseName={card.courseName}
                                rating={card.rating}
                                fullPrice={String(card.fullPrice)}
                                offeredPrice={String(card.offeredPrice)}
                                discount={String(card.discount ?? "")}
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