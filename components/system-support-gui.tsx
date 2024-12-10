"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const faqs = [
  {
    question: "How do I install Ollama?",
    answer: "You can install Ollama by following the instructions on the official Ollama website. Generally, it involves downloading the appropriate package for your operating system and running the installer."
  },
  {
    question: "What are the system requirements for running Ollama?",
    answer: "Ollama requires a 64-bit operating system (macOS, Windows, or Linux) with at least 8GB of RAM. For optimal performance, we recommend 16GB of RAM or more, especially when working with larger language models."
  },
  {
    question: "How can I update my Ollama installation?",
    answer: "To update Ollama, you can download the latest version from the official website and install it over your existing installation. Ollama will automatically update to the newest version."
  },
  {
    question: "What should I do if I encounter an 'Out of Memory' error?",
    answer: "If you encounter an 'Out of Memory' error, try closing other applications to free up RAM, or consider using a smaller language model. You can also try increasing your system's swap space or upgrading your hardware if this is a recurring issue."
  }
]

export function SystemSupportGUI() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [issue, setIssue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !issue) {
      setError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Simulate ticket submission
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Submitting support ticket:', { name, email, issue })
      // Here you would typically call an API to submit the support ticket

      setSuccessMessage("Your support ticket has been submitted successfully. We'll get back to you soon.")
      setName("")
      setEmail("")
      setIssue("")
    } catch (error) {
      console.error('Ticket submission error:', error)
      setError("An error occurred while submitting your ticket. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue">Describe your issue</Label>
              <Textarea
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Please describe the issue you're experiencing"
                rows={4}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert variant="default">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

