import { ContainerScroll } from "../../../UI/scrollAnimation";

export function HeroScrollDemo() {
	return (
		<div className="flex flex-col overflow-hidden">
			<ContainerScroll
				titleComponent={
					<>
						<h1 className="text-4xl font-semibold text-black dark:text-white">
							Make it your own<br />
							<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
								Create your design
							</span>
						</h1>
					</>
				}
			>
				<img
					src={`/banner.webp`}
					alt="hero"
					className="mx-auto h-full w-full rounded-2xl object-contain object-center"
					draggable={false}
				/>
			</ContainerScroll>
		</div>
	);
}
