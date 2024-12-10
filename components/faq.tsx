import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I get the best results with the LLaMA fine-tuning system?",
    answer: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Prepare high-quality data:</strong> Ensure your training data is clean, diverse, and representative of the task you're fine-tuning for.</li>
          <li><strong>Start with the right model:</strong> Choose an appropriate base model size based on your task complexity and computational resources.</li>
          <li><strong>Experiment with hyperparameters:</strong> Use the hyperparameter tuning component to find the optimal settings for your specific use case.</li>
          <li><strong>Monitor training progress:</strong> Keep an eye on the training metrics to detect and address issues like overfitting early on.</li>
          <li><strong>Evaluate thoroughly:</strong> Use a variety of evaluation metrics and test sets to ensure your fine-tuned model generalizes well.</li>
        </ul>
      </>
    )
  },
  {
    question: "How can I contribute to the LLaMA fine-tuning project?",
    answer: "We welcome contributions! Please check our GitHub repository for open issues, submit pull requests for new features or bug fixes, and participate in discussions. Make sure to read our contribution guidelines before getting started."
  },
  {
    question: "What are the future plans for this LLaMA fine-tuning system?",
    answer: "We're constantly working to improve the system. Future plans include supporting more model architectures, implementing advanced fine-tuning techniques like LoRA and QLoRA, enhancing the user interface, and improving integration with popular ML frameworks."
  },
  {
    question: "How does this system compare to other fine-tuning solutions?",
    answer: "Our system is designed to be user-friendly while still offering advanced capabilities. It provides a comprehensive web interface for the entire fine-tuning process, from data preparation to model deployment. However, for very large-scale projects, specialized solutions might be more appropriate."
  },
  {
    question: "I'm getting an error during the fine-tuning process. What should I do?",
    answer: "First, check the logs in the 'Training' section for any specific error messages. Common issues include insufficient GPU memory, incompatible data formats, or incorrect hyperparameters. If you can't resolve the issue, please report it on our GitHub issues page with detailed information about your setup and the error message."
  },
  {
    question: "Can I use this system for commercial projects?",
    answer: "The usage rights depend on the specific LLaMA model you're fine-tuning and the license of our system. Please refer to the LLaMA license and our project license for detailed information. For commercial use, we recommend consulting with a legal professional."
  },
  {
    question: "How do I ensure the privacy and security of my training data?",
    answer: "Our system is designed with data privacy in mind. All processing is done locally on your machine or your chosen cloud infrastructure. We recommend using encrypted storage for your datasets and fine-tuned models. For highly sensitive data, consider setting up an air-gapped system."
  }
]

export function FAQ() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

