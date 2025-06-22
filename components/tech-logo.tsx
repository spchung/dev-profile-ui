import Image from 'next/image'

interface TechLogoProps {
    tech: string
    size?: number
    className?: string
}

const logoMap: Record<string, string> = {
    typescript: '/technology/Typescript_logo_2020.svg.png',
    angular: '/technology/angular.svg',
    aws: '/technology/aws-color.png',
    'c-sharp': '/technology/c-sharp.webp',
    csharp: '/technology/c-sharp.webp',
    dart: '/technology/dart.svg',
    fastapi: '/technology/fastapi.png',
    flask: '/technology/flask.png',
    flutter: '/technology/flutter.png',
    golang: '/technology/golang.png',
    mysql: '/technology/mysql.png',
    neo4j: '/technology/neo4j.webp',
    nextjs: '/technology/nextjs.svg',
    next: '/technology/nextjs.svg',
    postgres: '/technology/postgres.png',
    python: '/technology/python.svg',
    qdrant: '/technology/qdrant-logo.svg',
    react: '/technology/react.svg',
    shadcn: '/technology/shadcn.png',
    lambda: '/technology/lambda.png',
    'step-function': '/technology/step-function.svg',
    sqs: '/technology/sqs.png',
    cpp: '/technology/cpp.png',
    unity: '/technology/unity.jpg',
    github: '/technology/github.svg',
    kaggle: '/technology/kaggle.png'

}

export function TechLogo({ tech, size = 24, className = '' }: TechLogoProps) {
    const logoPath = logoMap[tech.toLowerCase()]
    const addedClass = ['flask', 'nextjs', 'aws', 'postgres', 'golang'].includes(tech) ? 'dark:bg-gray-200' : ''
    if (!logoPath) {
        return (
            <div 
                className={`flex items-center justify-center bg-gray-200 rounded ${className}`}
                style={{ width: size, height: size }}
            >
                <span className="text-xs font-mono">{tech.slice(0, 2).toUpperCase()}</span>
            </div>
        )
    }
    return (
        <Image
            src={logoPath}
            alt={`${tech} logo`}
            width={size}
            height={size}
            className={`object-contain ${className} ${addedClass}`}
        />
    )
}