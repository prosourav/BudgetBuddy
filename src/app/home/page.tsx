import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Logout from "@/app/(auth)/Logout";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center m-4">

      <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
      <Image
        src={session?.user?.image as string}
        alt={session?.user?.name as string}
        width={72}
        height={72}
      />
      <Logout />
    </div>
  );
};

export default HomePage;