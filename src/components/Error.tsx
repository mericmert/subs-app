
export default function ProfileError() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="text-container flex">
                <h1 className="text-2xl flex">
                    <span className="block border-r-[1px] border-gray-400 pr-[23px] mr-[20px]">404</span>
                    <span className="text-[14px]">No user is found.</span>
                </h1>
            </div>
        </div>
    )
}
