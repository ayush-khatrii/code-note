"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MoonIcon, SunIcon } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Navbar = () => {
  const navLinks = [
    { name: "Notes", path: "/note" },
    { name: "CodeNote", path: "/codenote" },
    { name: "Generate", path: "/generate" },
  ];
  const { setTheme, theme } = useTheme()
  const pathName = usePathname();

  const Logo = () => (
    <Link href={"/"}>
      <span className="flex items-center font-bold  text-zinc-800 dark:text-white">
        <img src={`/codeBook-logo.png`} width="60" alt="" />
        <span>CodeBook</span>
      </span>
    </Link>
  );

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <nav className="bg-white py-3 dark:bg-zinc-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`${link.path === pathName ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {theme === "dark" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            </button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-3 w-3" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] sm:w-[300px]">
                <div className="mt-6 mb-8">
                  <Logo />
                </div>
                <nav className="flex items-start flex-col justify-between space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.path}
                      className={`${link.path === pathName ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      {link.name}
                    </a>
                  ))}
                  <div className=''>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                    <SignedOut>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                        <SignInButton />
                      </Button>
                    </SignedOut>
                    <div className="px-3">
                      <button
                        onClick={handleThemeToggle}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {theme === "dark" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                      </button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;