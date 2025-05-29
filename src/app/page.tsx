import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Trophy,
  Zap,
  CheckCircle,
  ArrowRight,
  Search,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar - HackerRank inspired */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="bg-gradient-to-br from-[#38b6ff]/10 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-8">
                <Image
                  src="/images/solarrank-logo-header-white.png"
                  alt="SolarRank"
                  width={140}
                  height={32}
                  priority
                  className="h-8 w-auto"
                />

                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-[#38b6ff] font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="text-gray-700 hover:text-[#38b6ff] font-medium"
                  >
                    Leaderboard
                  </Link>
                  <Link
                    href="/community"
                    className="text-gray-700 hover:text-[#38b6ff] font-medium"
                  >
                    Community
                  </Link>
                  <Link
                    href="/certification"
                    className="text-gray-700 hover:text-[#38b6ff] font-medium"
                  >
                    Certification
                  </Link>
                </nav>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-700 hover:text-[#38b6ff] font-medium"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      className="bg-[#38b6ff] hover:bg-[#2ea5ef]"
                    >
                      Join Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#38b6ff]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                #1 Solar Installer Community
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Level Up Your Solar
                <span className="text-[#38b6ff]"> Installation Skills</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join 50,000+ solar installers in the most trusted community
                platform. Get ranked, earn certifications, and connect with
                industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#38b6ff] hover:bg-[#2ea5ef] text-lg px-8 py-3"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 border-[#38b6ff] text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white"
                >
                  View Leaderboard
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#38b6ff]">50K+</div>
                  <div className="text-sm text-gray-600">Active Installers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    8.4GW
                  </div>
                  <div className="text-sm text-gray-600">
                    Community Solar Installed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">242K</div>
                  <div className="text-sm text-gray-600">
                    Solar Jobs Created
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Top Installers This Week
                  </h3>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "Sarah Chen",
                      title: "Master Installer",
                      energy: "2,847",
                      badge: "🥇",
                    },
                    {
                      rank: 2,
                      name: "Mike Rodriguez",
                      title: "Senior Tech",
                      energy: "2,634",
                      badge: "🥈",
                    },
                    {
                      rank: 3,
                      name: "Alex Thompson",
                      title: "Lead Electrician",
                      energy: "2,521",
                      badge: "🥉",
                    },
                  ].map((installer) => (
                    <div
                      key={installer.rank}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-2xl">{installer.badge}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {installer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {installer.title}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#38b6ff]">
                          {installer.energy}
                        </div>
                        <div className="text-xs text-gray-500">
                          Energy Points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-[#38b6ff] text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white"
                >
                  View Full Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Solar Professionals Choose SolarRank
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From beginners to experts, our platform helps solar installers
              grow their skills, build credibility, and connect with the
              industry&apos;s best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#38b6ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-[#38b6ff]" />
                </div>
                <CardTitle>Verified Rankings</CardTitle>
                <CardDescription>
                  Earn credibility through our transparent ranking system based
                  on certifications and community engagement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Expert Answers</CardTitle>
                <CardDescription>
                  Get reliable answers from certified professionals. No more
                  guessing - trust verified expertise.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Community Learning</CardTitle>
                <CardDescription>
                  Connect with 50,000+ installers. Share experiences, learn best
                  practices, and grow together.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Skill Challenges</CardTitle>
                <CardDescription>
                  Complete real-world installation challenges and earn energy
                  points to climb the leaderboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Certification Tracking</CardTitle>
                <CardDescription>
                  Upload and verify your certifications. Build trust with
                  verified badges and credentials.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Find solutions fast with our intelligent search across
                  discussions, guides, and expert profiles.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Industry Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solar Industry Growth
            </h2>
            <p className="text-xl text-gray-600">
              Be part of the fastest-growing energy sector in America
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#38b6ff] mb-2">34%</div>
              <div className="text-gray-600">
                Growth in residential solar installations (2021)
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                70%
              </div>
              <div className="text-gray-600">
                Cost reduction in solar panels since 2014
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                3.9GW
              </div>
              <div className="text-gray-600">
                Residential solar capacity added in 2021
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">39%</div>
              <div className="text-gray-600">
                Of homeowners considering solar installation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#38b6ff]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Advance Your Solar Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of solar professionals who are already building their
            reputation and growing their expertise on SolarRank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-[#38b6ff]"
            >
              Explore Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Image
                src="/images/solarrank-logo-header.svg"
                alt="SolarRank"
                width={140}
                height={32}
                className="h-8 w-auto mb-4"
              />
              <p className="text-gray-600 mb-4">
                The premier platform for solar installers to learn, compete, and
                grow their careers in the renewable energy industry.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#38b6ff]">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#38b6ff]">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#38b6ff]">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Platform
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Challenges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Certifications
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#38b6ff]">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 SolarRank. All rights reserved. Empowering solar
              professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
