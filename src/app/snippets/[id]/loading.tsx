import Image from "next/image";
import Loader from "../../../../public/loader.gif";
export default function ShowLoadingPage() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Image height={70} className="m-auto" src={Loader} alt="" />
    </div>
  );
}
