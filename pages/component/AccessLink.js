import Link from 'next/link'
import Image from 'next/image'

export default function AccessLink({ link, heading, role, image,color }) {
  const check = (role) => (role === "Reviewer"|| role==="Super" ? true : false);
  if (check(role)) {
    return (
      <>
        <Link href={link}>
          <div className={`flex flex-col justify-center ${color} box-shadow w-36 h-36 rounded cursor-pointer`}>
            <Image src={image} width={70} height={70} />
            <h2 className="text-center text-xs font-white  font-black text-gray-700 mt-4">{heading}</h2>
          </div>
        </Link>
      </>
    );
  } else {
    return <></>;
  }
}
