import { FaRegComments } from "react-icons/fa6";
import { motion } from "framer-motion";
import type { AuthLayoutProps } from "../../lib/types";

export default function AuthLayout({ subtitle, children }: AuthLayoutProps) {
	return (
		<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-screen flex-center">
			<div className="flex-center flex-wrap gap-10">
				<div className="flex-center flex-col sm:gap-y-4 flex-1 text-slate-300">
					<div className="flex-center gap-3 text-sky-300">
						<FaRegComments className="size-12" />
						<h1 className="text-4xl md:text-5xl">Talkio</h1>
					</div>
					<p className="text-xl">{subtitle}</p>
				</div>
				<div className="hidden md:block h-130 border-r"></div>
				<div>{children}</div>
			</div>
		</motion.section>
	);
}
