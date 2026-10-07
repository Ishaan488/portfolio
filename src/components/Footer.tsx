export default function Footer() {
    return (
        <footer className="border-t border-line pb-28 pt-8">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 text-xs text-muted sm:px-8 lg:px-12">
                <p>&copy; {new Date().getFullYear()} Ishaan Bajpai</p>
                <a href="#top" className="link-line pb-0.5 transition-colors hover:text-fg">
                    Back to top &uarr;
                </a>
            </div>
        </footer>
    );
}
