import { motion } from "framer-motion";
import { fromTopToBottom } from "../lib/animations";
import { FaRegComments } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Home() {
	const { currentUser } = useCurrentUser();
	console.log(currentUser);

	return (
		<section className="flex-center h-screen">
			<motion.div
				initial={{ y: -600 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
				className="flex-center flex-col gap-y-4"
			>
				<div className="flex items-center gap-4 text-sky-300">
					<FaRegComments className="size-12" />
					<h1 className="text-5xl">Talkio</h1>
				</div>
				<p className="text-lg text-slate-300 text-center px-2 max-w-lg">Enjoy meaningful conversations with the people you care about.</p>
				<Link to="/chat" className="flex-center gap-x-2 group mt-6 py-2 px-12 btn">
					START
					<MdArrowForward className="size-5 transform transition-transform duration-200 group-hover:translate-x-1" />
				</Link>
			</motion.div>
		</section>
	);
}
