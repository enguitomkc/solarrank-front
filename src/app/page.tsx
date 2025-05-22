import Image from "next/image";
import Link from "next/link";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={120}
                height={30}
                priority
              />
              <nav className="ml-8 hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Leaderboard
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Community
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">SolarRank</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Modern Next.js frontend with TypeScript and Tailwind CSS
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="default" size="lg" className="mr-4">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Server Components"
            description="Build faster and more optimized applications with React Server Components."
          >
            <p className="text-gray-600">
              Server Components let you render components on the server and
              reduce the amount of JavaScript sent to the client.
            </p>
            <Button variant="link" className="mt-4">
              Learn more →
            </Button>
          </Card>

          <Card
            title="TypeScript Support"
            description="Build type-safe applications with TypeScript."
          >
            <p className="text-gray-600">
              Next.js provides a great developer experience with TypeScript,
              including better error reporting and auto-completion.
            </p>
            <Button variant="link" className="mt-4">
              Learn more →
            </Button>
          </Card>

          <Card
            title="Tailwind CSS"
            description="Rapidly build modern websites without ever leaving your HTML."
          >
            <p className="text-gray-600">
              Tailwind CSS is a utility-first CSS framework packed with classes
              like flex, pt-4, and text-center that can be composed to build any
              design.
            </p>
            <Button variant="link" className="mt-4">
              Learn more →
            </Button>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2023 SolarRank. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next.js</span>
                <Image
                  src="/next.svg"
                  alt="Next.js"
                  width={24}
                  height={24}
                  className="h-6 w-auto"
                />
              </a>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Vercel</span>
                <Image
                  src="/vercel.svg"
                  alt="Vercel"
                  width={24}
                  height={24}
                  className="h-6 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
