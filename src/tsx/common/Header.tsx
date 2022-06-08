import { useEffect, useRef, useState } from "react";
import { ButtonNavLink } from "../components/buttons/ButtonNavLink";

export const Header = () => {
	const [isSticky, setIsSticky] = useState(false);

	const style = "bg-slate-200/60 w-full sticky top-0 z-50 transition-colors";
	const stickyStyle = `${style} bg-teal-700`;

	const changeHeader = () => {
		if (window.scrollY >= 1) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeHeader);
	}, []);

	return (
		<header className={isSticky ? stickyStyle : style}>
			<nav>
				<ul className="flex flex-row justify-center">
					<li>
						<ButtonNavLink to="/">Home</ButtonNavLink>
					</li>
					<li>
						<ButtonNavLink to="calculator">Calculator</ButtonNavLink>
					</li>
					<li>
						<ButtonNavLink to="articles">Articles</ButtonNavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};
