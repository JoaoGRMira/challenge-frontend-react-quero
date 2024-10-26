import { FC, ReactNode } from "react";
import QRow from "./QRow";

type QLayoutProps = {
    sidebar: ReactNode;
    header: ReactNode;
    children: ReactNode;
    footer: ReactNode;
};

const QLayout: FC<QLayoutProps> = ({ sidebar, header, children, footer }) => {
    return (
        // full height container and flex column layout
        <div className="min-h-screen flex flex-col">
            {/* bottom border to separate header from content */}
            <div className="border-b">
                {/* fixed header at the top */}
                <header className="fixed top-0 left-0 max-w-screen-2xl mx-auto w-full bg-white z-10">
                    {header}
                </header>
            </div>

            {/* main content area with padding to account for header and footer height */}
            <div className="max-w-screen-2xl mx-auto w-full pt-20 flex-1 pb-20">
                {/* sidebar width = 220px. main content fill the remainder */}
                <QRow
                    sidebar={
                        <aside className="w-220px pr-8 border-r py-6 h-full">
                            {sidebar}
                        </aside>
                    }
                >
                    <main className="py-6">{children}</main>
                </QRow>
            </div>

            {/* fixed footer at the bottom */}
            <footer className="fixed bottom-0 left-0 right-0 border-t bg-white z-10">
                {footer}
            </footer>
        </div>
    );
};

export default QLayout;