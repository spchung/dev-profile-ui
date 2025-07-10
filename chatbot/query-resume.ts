import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage } from 'ai';
import { readFileSync } from 'fs';
import { join } from 'path';


export async function queryResume(messages: UIMessage[]): Promise<UIMessage[]> {

    let contextData;
    try {
        const contextPath = join(process.cwd(), 'settings', 'resume.json');
        const contextFile = readFileSync(contextPath, 'utf8');
        contextData = JSON.parse(contextFile);
    } catch (error) {
        console.error('Error loading context file:', error);
        throw error;
    }
    
    const systemMessage = {
        role: 'system' as const,
        content: `
        You are an AI assistant with access to Stephen's resume:
            
        ${JSON.stringify(contextData, null, 2)}

        Use Stephen's resume to answer questions accurately. 
        If asked about information not in the resume, clearly state that the information is not available in your current context.
        
        RESPONSE GENERATION INSTRUCTION:
        - Use proper line breaks
        - Do not include number headings (e.g.: 1. xxxx. 2. yyyy ... etc)
        `,

    } as UIMessage;

    const allMessages = [systemMessage, ...messages];

    return allMessages;
}
