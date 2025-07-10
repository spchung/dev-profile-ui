'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
}

interface ChatbotProps {
    isOpen: boolean
    onClose: () => void
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
    const { messages, input, handleInputChange, setInput, handleSubmit, status } = useChat({
        api:'/api/workflow'
    });
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <>
            {/* Large Chat Window - 1/4 screen space */}
            {isOpen && (
                <Card className="fixed bottom-4 left-4 z-40 w-[600px] h-[800px] md:w-[600px] md:h-[800px] sm:w-[350px] sm:h-[500px] xs:w-[90vw] xs:h-[80vh] \
                        xs:bottom-2 xs:left-2 flex flex-col pt-0 \
                        "
                    >
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center bg-blue-600 text-white rounded-t-xl border-blue-500">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">💼</span>
                            <h3 className="font-semibold">Chat with Stephen&apos;s Resume {status}</h3>
                        </div>
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-blue-700"
                        >
                            ✕
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                        {messages.length === 0 && (
                            <div className="space-y-4">
                                <p className="text-gray-400 text-sm">Ask me anything about Stephen&apos;s experience and background!</p>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Suggested Questions:</p>
                                    {[
                                        "What's Stephen's experience with React and Next.js?",
                                        "Tell me about his AI and machine learning projects",
                                        "What technologies has he worked with at AMD?",
                                        "What's his educational background?",
                                    ].map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(question)}
                                            className="block text-left text-xs text-blue-400 hover:text-blue-300 bg-gray-800 hover:bg-gray-700 p-2 rounded border transition-colors w-full"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`p-2 rounded-lg max-w-[80%] w-fit ${
                                    message.role === 'user'
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-700 text-gray-200'
                                }`}
                            >
                                {/* <p className="text-sm whitespace-pre-wra">{message.content}</p> */}
                                <div className="text-sm prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                            code: ({ children }) => (<code className="block bg-gray-800 p-2 rounded text-xs overflow-x-auto">{children}</code>),
                                            pre: ({ children }) => <pre className="bg-gray-800 p-2 rounded overflow-x-auto">{children}</pre>,
                                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                            em: ({ children }) => <em className="italic">{children}</em>,
                                            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-2 italic">{children}</blockquote>,
                                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>

                            </div>
                        ))}
                        {status !== 'ready' && (
                            <div className="bg-gray-700 text-gray-200 p-2 rounded-lg max-w-[80%]">
                                <p className="text-sm w-auto">Typing...</p>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleInputChange(e)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                disabled={status !== 'ready'}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={status !== 'ready' || !input.trim()}
                                size="sm"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </>
    )
}