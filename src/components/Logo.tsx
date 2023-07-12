import Link from "next/link"

type logoProps = {
    font_size : "xl" | "2xl" | "3xl"| "4xl" | "5xl" | "6xl"; 
}

export default function Logo({font_size} : logoProps) {
    return (
        <>
            <Link href={"/"} className="logo-container">
                <h1 className={`text-${font_size} font-medium text-neutral-200`}>
                    <span className="text-indigo-500">#</span>
                    subs
                </h1>
            </Link>
        </>
    )
}
