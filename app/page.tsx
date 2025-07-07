'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, BookOpenText, Star, GitFork } from "lucide-react";
import { resume } from "@/settings/resume";
import { TechLogo } from "@/components/tech-logo";

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

interface NavigationItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" }
];

export default function Home() {
    const [activeSection, setActiveSection] = useState("about");
    const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/spchung/repos?sort=updated&per_page=6');
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const repos = await response.json();
                setGithubRepos(repos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load repositories');
            } finally {
                setLoading(false);
            }
        };

        fetchGithubRepos();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px',
            }
        );

        navigationItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/StephenChungCV.pdf';
        link.download = 'StephenChungCV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Left Panel - Fixed */}
            <div className="hidden md:flex md:w-1/3 lg:w-1/4 xl:w-1/3 bg-gray-800 border-r border-gray-700 flex-col">
                {/* Header */}
                <div className="p-8 border-b border-gray-700">
                    <div className="mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {resume.personalInfo.name}
                            </h1>
                            <p className="text-lg text-blue-400 font-medium mb-3">
                                Full Stack Developer
                            </p>
                            <p className="text-sm text-gray-300 mb-4">
                                {resume.personalInfo.location}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {resume.summary}
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-blue-900 text-blue-300'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact Info */}
                <div className="p-6 border-t border-gray-700">
                    <div className="space-y-2 text-sm">
                        <div className="text-gray-300">
                            {resume.personalInfo.email}
                        </div>
                        <div className="text-gray-300">
                            {resume.personalInfo.phone}
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href={`https://${resume.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:text-blue-300">
                                LinkedIn
                            </a>
                            <a href={`https://${resume.personalInfo.github}`} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:text-blue-300">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <div className="md:hidden bg-gray-800 border-b border-gray-700 p-6 sticky top-0 z-10">
                    <div className="flex justify-center items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {resume.personalInfo.name}
                            </h1>
                            <p className="text-blue-400 font-medium">
                                Full Stack Developer
                            </p>
                        </div>
                    </div>
                    {/* Mobile Navigation */}
                    <nav className="mt-4">
                        <div className="flex space-x-1 overflow-x-auto">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-blue-900 text-blue-300'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
                
                <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-16">
                    {/* About Section */}
                    <section id="about" className="scroll-mt-8">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            About Me
                        </h2>
                        <div className="prose prose-lg prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed">
                                {resume.summary}
                            </p>
                        </div>
                        
                        {/* Skills */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.frontend.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-blue-900 text-blue-200 text-sm rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">Backend</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.backend.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-green-900 text-green-200 text-sm rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="scroll-mt-8">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {resume.experience.map((experience, index) => (
                                <Card key={index} className="h-fit flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 relative flex-shrink-0">
                                                    <Image
                                                        src={experience.img}
                                                        alt={`${experience.company} logo`}
                                                        fill
                                                        className="object-contain rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl font-bold text-white">
                                                        {experience.company}
                                                    </CardTitle>
                                                    <CardDescription className="text-lg font-medium text-blue-400">
                                                        {experience.position}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {experience.tech.map((tech, techIndex) => (
                                                    <TechLogo key={techIndex} tech={tech} size={36} className="opacity-80 hover:opacity-100 transition-opacity rounded-md" />
                                                ))}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardDescription className="ml-6">{experience.startDate} - {experience.endDate}</CardDescription>
                                    <CardContent className="flex-1 overflow-y-auto">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                                Key Contributions
                                            </h4>
                                            <ul className="space-y-2">
                                                {experience.contributions.map((contribution, contributionIndex) => (
                                                    <li 
                                                        key={contributionIndex}
                                                        className="flex items-start gap-2 text-gray-300"
                                                    >
                                                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-sm leading-relaxed">{contribution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <div className="text-center mb-8">
                            <p className="text-xl text-gray-300 mb-6">
                                View and download my professional resume
                            </p>
                            <Button 
                                onClick={handleDownload}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>
                        </div>
                        </div>
                    </section>

                    {/* Education Section */}
                    <section id="education" className="scroll-mt-8">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Education
                        </h2>
                        <div className="space-y-6">
                            {resume.education.map((education, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-xl font-bold text-white">
                                                    {education.institution}
                                                </CardTitle>
                                                <CardDescription className="text-lg font-medium text-blue-400">
                                                    {education.degree}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-300">
                                                    {education.startDate} - {education.endDate}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {education.location}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {education.dissertation && (
                                        <CardContent>
                                            <div className="text-sm text-gray-300">
                                                <strong>Dissertation:</strong> {education.dissertation}
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="scroll-mt-8">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Projects
                        </h2>
                        
                        {/* GitHub Repositories */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <TechLogo tech='github' size={24} className="opacity-80 hover:opacity-100 transition-opacity rounded-md" />
                                <h3 className="text-2xl font-bold text-white">
                                    GitHub Repositories
                                </h3>
                            </div>
                            
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, i) => (
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
                                                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                                    <TechLogo tech='github' size={20} />
                                                    {repo.name}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-gray-300 line-clamp-2">
                                                    {repo.description || "No description available"}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1 flex flex-col justify-between">
                                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
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
                        </div>

                        {/* Featured Projects */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Featured Projects
                            </h3>
                            <div className="space-y-6">
                                {resume.projects.map((project, index) => (
                                    <Card key={index} className="h-fit flex flex-col">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-xl font-bold text-white">
                                                        {project.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-base text-gray-300 mt-2">
                                                        {project.description}
                                                    </CardDescription>
                                                </div>
                                                <div className="flex gap-2">
                                                    {project.dataSource && (
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={project.dataSource} target="_blank" rel="noopener noreferrer">
                                                                <TechLogo tech="kaggle" size={20}/>
                                                                Kaggle
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.liveUrl && (
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                                Live
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.githubUrl && (
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <TechLogo tech='github' size={16} />
                                                                Code
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.blogUrl && (
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={project.blogUrl} target="_blank" rel="noopener noreferrer">
                                                                <BookOpenText className="w-3 h-3 mr-1"/>
                                                                Blog
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-1 overflow-y-auto">
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                                                        Technologies
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, techIndex) => (
                                                            <span 
                                                                key={techIndex}
                                                                className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-md"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                                        Key Features
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {project.features.map((feature, featureIndex) => (
                                                            <li 
                                                                key={featureIndex}
                                                                className="flex items-start gap-2 text-gray-300"
                                                            >
                                                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
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
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}