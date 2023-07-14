import Image from "next/image"
import Link from "next/link"

export default function Post({ postData }: any) {

    return (
        <div className="min-w-[480px] w-full flex border-neutral-700 border-[.25px] pr-8 py-3 ">
            <div className="w-[20%] flex p-3 justify-center">
                <div className="relative photo-container h-16 w-16 bg-neutral-900 rounded-full">
                    <Link href={`/user/${postData.author.profile.username}`}>
                        {postData.author.profile.imageUrl ?
                            <Image
                                className="rounded-full border-2 border-neutral-900"
                                src={`/${postData.author.profile.imageUrl}`}
                                alt="phone"
                                fill={true}
                            />
                            :
                            <Image
                                className="rounded-full border-2 border-neutral-900"
                                src={`/default.webp`}
                                alt="phone"
                                fill={true}
                            />

                        }
                    </Link>
                </div>
            </div>
            <div className="w-[80%] content flex flex-col flex">
                <div className="w-full flex justify-between">
                    <span>{postData.author.profile.fullName}<span className="ml-2 text-sm text-neutral-400">@{postData.author.profile.username}</span></span>
                    <span className="text-sm text-neutral-400">{postData.date.substring(0, 10)}</span>
                </div>
                <div className="w-full py-3 break-words">
                    <span className="">{postData.text_content}</span>
                </div>
                <div>
                    {!postData.imageUrl ? "" :
                        <Image
                            className="rounded-xl border-2 border-neutral-900"
                            src={`/${postData.imageUrl}`}
                            alt="phone"
                            height={360}
                            width={360}
                        />}
                </div>

            </div>
        </div>
    )
}
