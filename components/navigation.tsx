'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/lib/dark-mode-context";
import { Moon, Sun } from "lucide-react";

export function Navigation() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <nav className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                        Stephen Chung 
                    </Link>
                    
                    <div className="flex items-center space-x-8">
                        <div className="hidden md:flex space-x-8">
                            <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Projects
                            </Link>
                            <Link href="/work-experience" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Work Experience
                            </Link>
                            <Link href="/resume" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Resume
                            </Link>
                            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Blog
                            </Link>
                        </div>
                        
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleDarkMode}
                            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            {isDarkMode ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                            <span className="sr-only">Toggle dark mode</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}