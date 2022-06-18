import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<footer className="bg-slate-200/60 w-full mt-auto py-20">
			<nav>
				<ul className="flex flex-row justify-center gap-16">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="calculator">Calculator</Link>
					</li>
					<li>
						<Link to="articles">Articles</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
