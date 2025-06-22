'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

interface Project {
    title: string;
    description: string;
    technologies: string[];
    features: string[];
    liveUrl?: string;
    githubUrl?: string;
}

const individualProjects: Project[] = [
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce application with modern design and comprehensive features",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
        features: [
            "User authentication and authorization",
            "Product catalog with search and filters",
            "Shopping cart and checkout process",
            "Payment integration with Stripe",
            "Admin dashboard for inventory management"
        ],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/username/ecommerce-platform"
    },
    {
        title: "Task Management App",
        description: "Collaborative project management tool with real-time updates",
        technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "shadcn/ui"],
        features: [
            "Real-time collaboration with Socket.io",
            "Drag and drop task organization",
            "Team management and permissions",
            "File attachments and comments",
            "Progress tracking and reporting"
        ],
        liveUrl: "https://example-taskapp.com",
        githubUrl: "https://github.com/username/task-management"
    },
    {
        title: "Weather Dashboard",
        description: "Interactive weather application with detailed forecasts and visualizations",
        technologies: ["Vue.js", "Chart.js", "Weather API", "Vuetify", "PWA"],
        features: [
            "Current weather and 7-day forecast",
            "Interactive weather maps",
            "Location-based weather detection",
            "Weather charts and data visualization",
            "Offline support with PWA capabilities"
        ],
        githubUrl: "https://github.com/username/weather-dashboard"
    }
];

export default function Projects() {
    const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                // Replace 'your-github-username' with actual GitHub username
                const response = await fetch('https://api.github.com/users/spchung/repos?sort=updated&per_page=6');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                
                const repos = await response.json();
                setGithubRepos(repos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load repositories');
                // Fallback data for demo purposes
                setGithubRepos([
                    {
                        id: 1,
                        name: "awesome-project",
                        description: "A full-stack web application built with modern technologies",
                        html_url: "https://github.com/username/awesome-project",
                        stargazers_count: 42,
                        forks_count: 8,
                        language: "TypeScript",
                        updated_at: "2024-01-15T10:30:00Z"
                    },
                    {
                        id: 2,
                        name: "react-components",
                        description: "Reusable React components library with TypeScript support",
                        html_url: "https://github.com/username/react-components",
                        stargazers_count: 28,
                        forks_count: 5,
                        language: "JavaScript",
                        updated_at: "2024-01-10T14:20:00Z"
                    },
                    {
                        id: 3,
                        name: "api-server",
                        description: "RESTful API server with authentication and database integration",
                        html_url: "https://github.com/username/api-server",
                        stargazers_count: 15,
                        forks_count: 3,
                        language: "Python",
                        updated_at: "2024-01-08T09:45:00Z"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubRepos();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Projects
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A showcase of my development work, from open-source contributions to personal projects
                    </p>
                </div>

                {/* GitHub Repositories Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Github className="w-8 h-8 text-gray-900 dark:text-white" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            GitHub Repositories
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Card key={i} className="h-48 animate-pulse">
                                    <CardHeader>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {githubRepos.map((repo) => (
                                <Card key={repo.id} className="h-48 flex flex-col hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex-shrink-0">
                                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Github className="w-4 h-4" />
                                            {repo.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                            {repo.description || "No description available"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-3 h-3" />
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                        <Button 
                                            asChild 
                                            variant="outline" 
                                            size="sm"
                                            className="w-full"
                                        >
                                            <a 
                                                href={repo.html_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                View Repository
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-8">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Unable to load GitHub repositories. Showing demo data.
                            </p>
                        </div>
                    )}
                </section>

                {/* Individual Projects Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Featured Projects
                    </h2>
                    
                    <div className="space-y-6">
                        {individualProjects.map((project, index) => (
                            <Card key={index} className="h-80 flex flex-col">
                                <CardHeader className="flex-shrink-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription className="text-base text-gray-600 dark:text-gray-300 mt-2">
                                                {project.description}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            {project.liveUrl && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a 
                                                        href={project.liveUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="w-3 h-3 mr-1" />
                                                        Live
                                                    </a>
                                                </Button>
                                            )}
                                            {project.githubUrl && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a 
                                                        href={project.githubUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Github className="w-3 h-3 mr-1" />
                                                        Code
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span 
                                                        key={techIndex}
                                                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                                Key Features
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.features.map((feature, featureIndex) => (
                                                    <li 
                                                        key={featureIndex}
                                                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                                    >
                                                        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-sm leading-relaxed">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}