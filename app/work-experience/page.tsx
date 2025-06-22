import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkExperience {
    company: string;
    logo: string;
    position: string;
    contributions: string[];
}

const workExperiences: WorkExperience[] = [
    {
        company: "Tech Corp",
        logo: "/api/placeholder/100/100",
        position: "Senior Software Engineer",
        contributions: [
            "Led development of microservices architecture serving 1M+ users",
            "Implemented CI/CD pipelines reducing deployment time by 80%",
            "Mentored 5 junior developers and conducted code reviews",
            "Architected scalable backend systems using Node.js and PostgreSQL"
        ]
    },
    {
        company: "Innovation Labs",
        logo: "/api/placeholder/100/100",
        position: "Full Stack Developer",
        contributions: [
            "Built responsive web applications using React and TypeScript",
            "Developed RESTful APIs with comprehensive error handling",
            "Optimized database queries improving performance by 60%",
            "Collaborated with UX/UI team to implement design systems"
        ]
    },
    {
        company: "StartupXYZ",
        logo: "/api/placeholder/100/100",
        position: "Frontend Developer",
        contributions: [
            "Created interactive user interfaces with modern JavaScript frameworks",
            "Implemented responsive design patterns for mobile-first approach",
            "Integrated third-party APIs and payment processing systems",
            "Maintained 95%+ test coverage with unit and integration tests"
        ]
    },
    {
        company: "Digital Solutions Inc",
        logo: "/api/placeholder/100/100",
        position: "Software Developer Intern",
        contributions: [
            "Developed internal tools to automate manual processes",
            "Fixed bugs and implemented new features in legacy systems",
            "Participated in agile development process and daily standups",
            "Learned industry best practices for software development"
        ]
    }
];

export default function WorkExperience() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Work Experience
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        My professional journey and key contributions across various organizations
                    </p>
                </div>
                
                <div className="space-y-6">
                    {workExperiences.map((experience, index) => (
                        <Card key={index} className="h-80 flex flex-col">
                            <CardHeader className="flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 relative flex-shrink-0">
                                        <Image
                                            src={experience.logo}
                                            alt={`${experience.company} logo`}
                                            fill
                                            className="object-contain rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                            {experience.company}
                                        </CardTitle>
                                        <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                                            {experience.position}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                        Key Contributions
                                    </h4>
                                    <ul className="space-y-2">
                                        {experience.contributions.map((contribution, contributionIndex) => (
                                            <li 
                                                key={contributionIndex}
                                                className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                            >
                                                <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span className="text-sm leading-relaxed">{contribution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}