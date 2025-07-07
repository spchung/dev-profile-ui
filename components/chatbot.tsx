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

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
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
            {/* Floating Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
                size="icon"
            >
                {isOpen ? '✕' : '💬'}
            </Button>

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-6 z-40 w-80 h-96 max-w-[25vw] max-h-[25vh] flex flex-col shadow-xl">
                    {/* Header */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold">Chat Assistant</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                        {messages.length === 0 && (
                            <p className="text-gray-400 text-sm">Start a conversation...</p>
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