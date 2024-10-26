import { FC, ReactNode } from "react";

type QRowProps = {
    sidebar: ReactNode;
    children: ReactNode;
};

const QRow: FC<QRowProps> = ({ sidebar, children }) => {
    return (
        // full-width container with padding and flex layout
        <div className="w-full px-4 lg:px-8 flex">
            {/* sidebar that is hidden on screens smaller than 1023px (lg) */}
            <div className="w-220px hidden lg:block">{sidebar}</div>
            
            {/* main content area with left padding on larger screens */}
            <div className="flex-1 pl-0 lg:pl-8">{children}</div>
        </div>
    );
};

export default QRow;