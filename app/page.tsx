import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
            </div>
            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center h-full min-h-[calc(100vh-4rem)]">
                <div className="text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Welcome to My Portfolio
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Discover my journey as a developer through projects, experience, and education
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white">
                            <Link href="/projects">
                                View Projects
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900">
                            <Link href="/resume">
                                Download Resume
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
