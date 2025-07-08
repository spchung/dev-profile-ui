'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            isUser: true,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            })

            const data = await response.json()

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                isUser: false,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error('Error sending message:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
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
                            <h3 className="font-semibold">Chat with Stephen&apos;s Resume</h3>
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
                                            onClick={() => setInputMessage(question)}
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
                                className={`p-2 rounded-lg max-w-[80%] ${
                                    message.isUser
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-700 text-gray-200'
                                }`}
                            >
                                <p className="text-sm">{message.text}</p>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-gray-700 text-gray-200 p-2 rounded-lg max-w-[80%]">
                                <p className="text-sm">Typing...</p>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isLoading || !inputMessage.trim()}
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