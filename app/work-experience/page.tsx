import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resume } from "@/settings/resume";
import { TechLogo } from "@/components/tech-logo";
interface WorkExperience {
    company: string;
    img: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    contributions: string[];
    tech: string[];
}

const workExperiences: WorkExperience[] = resume.experience;

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
                                            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                                {experience.company}
                                            </CardTitle>
                                            <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
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