import Link from "next/link";

export default function Header() {
	return (
		<>
			<div className="absolute right-4 top-2 flex justify-end gap-5 text-md text-white z-50">
				<Link href={'/'} className="hover:text-brown-50 active:text-brown-200">
					Dashboard
				</Link>
				<Link href={'/ouss'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Ouss
				</Link>
				<Link href={'/yomi'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Yomi
				</Link>
				<Link href={'/antoine'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Antoine
				</Link>
				<Link href={'/gabin'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Gabin
				</Link>
				<Link href={'/picasso'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Picasso
				</Link>
				<Link href={'/elon'} className="hover:text-brown-50 active:text-brown-200">
					Smart-Elon
				</Link>
			</div>
		</>
	)
}