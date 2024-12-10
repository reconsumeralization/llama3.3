import { TutorialCard } from "@/components/tutorial-card"

const fineTuningSteps = [
  {
    title: "Setting Up the Environment",
    content: (
      <>
        <p>To begin fine-tuning LLMs like Llama 3, we need to set up our environment with the necessary libraries and tools. Follow these steps to get started:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>Install required libraries</li>
          <li>Import necessary modules</li>
          <li>Set up environment variables</li>
        </ol>
      </>
    ),
    codeBlocks: [
      {
        language: "bash",
        code: "!pip install -qqq -U bitsandbytes transformers peft accelerate datasets scipy einops evaluate trl rouge_score"
      },
      {
        language: "python",
        code: `
import os
import torch
from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, TrainingArguments, 
    pipeline, HfArgumentParser
)
from trl import ORPOConfig, ORPOTrainer, setup_chat_format, SFTTrainer
from tqdm import tqdm
import gc
import pandas as pd
import numpy as np
from huggingface_hub import interpreter_login

# Disable Weights and Biases logging
os.environ['WANDB_DISABLED'] = "true"
interpreter_login()
        `
      }
    ]
  },
  {
    title: "Loading and Preprocessing the Dataset",
    content: (
      <>
        <p>Next, we'll load our dataset and preprocess it for fine-tuning. We'll use the DialogSum dataset as an example:</p>
      </>
    ),
    codeBlocks: [
      {
        language: "python",
        code: `
dataset_name = "neil-code/dialogsum-test"
dataset = load_dataset(dataset_name)

print(dataset['test'][0])
        `
      }
    ]
  },
  {
    title: "Configuring the Model",
    content: (
      <>
        <p>Now we'll set up the BitsAndBytes configuration for 4-bit quantization and load our pre-trained model:</p>
      </>
    ),
    codeBlocks: [
      {
        language: "python",
        code: `
compute_dtype = getattr(torch, "float16")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',
    bnb_4bit_compute_dtype=compute_dtype,
    bnb_4bit_use_double_quant=False,
)

model_name = 'microsoft/phi-2'
device_map = {"": 0}
original_model = AutoModelForCausalLM.from_pretrained(
    model_name, 
    device_map=device_map,
    quantization_config=bnb_config,
    trust_remote_code=True,
    use_auth_token=True
)
        `
      }
    ]
  },
  // Add more steps here...
]

export default function FineTuningGuidePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">LLM Fine-Tuning Guide</h1>
      <TutorialCard
        title="Fine-Tuning LLMs with QLoRA"
        steps={fineTuningSteps}
      />
    </div>
  )
}

