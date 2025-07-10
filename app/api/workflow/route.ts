import { openai } from "@ai-sdk/openai"
import { generateObject, streamText } from "ai";
import { UIMessage } from "ai";
import { classifyIntnet } from "@/chatbot/intent-classifier";
import { queryResume } from "@/chatbot/query-resume";

export const maxDuration = 30;
export async function POST(req: Request) {
    const { messages } = await req.json() as { messages: UIMessage[]};
    if (messages.length < 1) {
        return '';
    }

    const latest = messages.at(-1);
    if (!latest) return '';
    
    const intent = await classifyIntnet(latest.content);

    let finalMessages: UIMessage[];
    switch (intent){
        case 'resume':
            finalMessages = await queryResume(messages);
            break
        default:
            finalMessages = messages
            
    }
    
    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages: finalMessages,
    });


    return result.toDataStreamResponse();
}






