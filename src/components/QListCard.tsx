import { ReactNode, HTMLAttributes } from "react";

interface Card extends HTMLAttributes<HTMLElement> {
    id: string;
}

interface QListCardProps<T extends Card> {
    cards: T[];
    children: (card: T) => ReactNode;
}

const QListCard = <T extends Card>({
    cards,
    children,
    ...rest
}: QListCardProps<T>) => {
    return (
        <ul
            {...rest}
            className="
                grid gap-4 /* spacing of 16px between cards */
                grid-cols-1 /* 1 column by default */
                sm:grid-cols-2 /* 2 columns on 640px ~ 767px screens */
                md:grid-cols-3 /* 3 columns on 768px ~ 1023px screens */
                lg:grid-cols-4 /* 4 columns on 1024px ~ 1535px screens */
                xl:grid-cols-5 /* 5 columns on 1536px + screens */
            "
        >
            {cards.map((card) => (
                <li key={card.id}>{children(card)}</li>
            ))}
        </ul>
    );
};

export default QListCard;