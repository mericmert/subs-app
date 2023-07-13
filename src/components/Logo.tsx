import Link from "next/link"

type logoProps = {
    font_size : "text-xl" | "text-2xl" | "text-3xl"| "text-4xl" | "text-5xl" | "text-6xl"; 
}

export default function Logo({font_size} : logoProps) {
    
    return (
        <>
            <Link href={"/"} className="logo-container">
                <h1 className={`${font_size} font-medium text-neutral-200`}>
                    <span className="text-indigo-500">#</span>
                    subs
                </h1>
            </Link>
        </>
    )
}
