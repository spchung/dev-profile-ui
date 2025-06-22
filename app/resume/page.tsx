'use client'
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Resume() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/StephenChungCV.pdf';
        link.download = 'StephenChungCV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Resume
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
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

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-[800px] md:h-[900px]">
                        <iframe
                            src="/StephenChungCV.pdf"
                            className="w-full h-full border-0"
                            title="Stephen Chung Resume"
                        />
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Having trouble viewing the PDF? 
                        <button 
                            onClick={handleDownload}
                            className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                        >
                            Download it directly
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}