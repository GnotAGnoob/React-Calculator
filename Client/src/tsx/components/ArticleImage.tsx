import { useRef, useState } from "react";

interface ImageProps {
	src: string;
	alt: string;
	className?: string;
}

export const ArticleImage = (props: ImageProps) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const wrapper = useRef<HTMLImageElement>(null);

	let src: string;
	let imageHeight = 0;

	if (wrapper.current) imageHeight = (wrapper.current.offsetWidth / 16) * 9;

	if (imageError) {
		src = "https://via.placeholder.com/1920x1080?text=Loading+error";
	} else if (imageLoaded) {
		src = props.src;
	} else {
		src = "https://via.placeholder.com/1920x1080?text=Loading...";
	}

	return (
		<div
			ref={wrapper}
			className={`bg-slate-300/50 max-h-96`}
			style={{ height: imageHeight }}
		>
			<img
				className={` object-cover ${props.className}`}
				src={src}
				alt={props.alt}
				onLoad={() => {
					setImageLoaded(true);
				}}
				onError={() => {
					setImageError(true);
				}}
			/>
		</div>
	);
};
