import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai";
import { z } from "zod";

const classificationSchema = z.object({
    type: z.enum(['resume','non-resume']),
    ressoning: z.string()
})

export async function classifyIntnet(query: string): Promise<string> {
    const { object: classification }  = await generateObject({
        model: openai('gpt-4-turbo'),
        schema: classificationSchema,
        prompt: `Analyze the following user query and determine what kind of task it is: 
                
                "${query}"

                Classify the query as one of the following types:
                - 'resume': this query is related resume and professional experience
                - 'non-resume': this query is NOT related to resume and professional experience
                
                
                Explain why you chose that classification.
        `,
    });

    return classification.type;
}