import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import UserNav from "@/components/UserNav";

const Navbar = async () => {
    const user = await getCurrentUser();

    return (
    <header>
        <nav>
            <Link href="/" className={"logo"}>
                <Image src={"/icons/logo.png"} alt={"logo"} width={24} height={24} />

                <p>DevEvent</p>
            </Link>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/events/create">Create Event</Link>
                <UserNav user={user} />
            </ul>
        </nav>
    </header>
    );
};

export default Navbar;
