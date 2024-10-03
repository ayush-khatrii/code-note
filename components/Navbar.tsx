"use client"
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex my-10 justify-center gap-4 items-center text-center">
      <Link href="/note">
        <Button variant={`${pathname === '/note' || pathname === `/note/add-note` ? 'default' : 'outline'}`}>
          Note
        </Button>
      </Link>
      <Link href="/codenote">
        <Button variant={`${pathname === '/codenote' || pathname === `/codenote/add-code-note` ? 'default' : 'outline'}`}>
          CodeNote
        </Button>
      </Link>
    </nav>
  )
}
