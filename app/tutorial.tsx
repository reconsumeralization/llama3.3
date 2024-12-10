import { Steps } from "@/components/ui/steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Tutorial() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">LLaMA 3.3 Fine-Tuning Tutorial</h1>
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with LLaMA 3.3 Fine-Tuning</CardTitle>
          <CardDescription>
            Follow these steps to fine-tune your LLaMA 3.3 model and deploy it for your specific use case.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step title="Data Preparation">
              <p>Start by preparing your training data:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Navigate to the "Data Preparation" page.</li>
                <li>Use the Data Upload Form to upload your dataset file or paste text data.</li>
                <li>Ensure your data is in the correct format (JSON with input-output pairs).</li>
                <li>Review the uploaded datasets in the Dataset List.</li>
                <li>Use the Training Data Builder to create or refine your training pairs.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Model Configuration">
              <p>Configure your model parameters:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Go to the "Model Configuration" page.</li>
                <li>Use the Model Config Form to set learning rate, batch size, epochs, and warmup steps.</li>
                <li>Consider using the automated model configuration suggestions for optimal settings.</li>
                <li>Save your configuration for use in the training process.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Training">
              <p>Start and monitor your training jobs:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Navigate to the "Training" page.</li>
                <li>Use the New Training Job component to start a new fine-tuning job.</li>
                <li>Select your prepared dataset and saved model configuration.</li>
                <li>Monitor the progress of your training jobs in the Training Job List.</li>
                <li>View real-time updates in the Training Progress component.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Hyperparameter Tuning">
              <p>Optimize your model's performance:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Access the Hyperparameter Tuning component.</li>
                <li>Set ranges for learning rate, batch size, and epochs.</li>
                <li>Start the automated hyperparameter tuning process.</li>
                <li>Review the results and apply the best-performing parameters to your model.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Evaluation">
              <p>Assess your fine-tuned model's performance:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Go to the "Evaluation" page.</li>
                <li>Use the Model Evaluation Form to select your fine-tuned model and test dataset.</li>
                <li>Review the evaluation metrics in the Evaluation Results component.</li>
                <li>Compare different models using the Model Comparison feature.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Model Export">
              <p>Export your fine-tuned model:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Navigate to the Model Export component.</li>
                <li>Select the fine-tuned model you want to export.</li>
                <li>Choose the export format (if applicable).</li>
                <li>Initiate the export process and download your model.</li>
              </ol>
            </Steps.Step>

            <Steps.Step title="Deployment">
              <p>Deploy your fine-tuned model:</p>
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>Access the Model Deployment component.</li>
                <li>Select the exported model you want to deploy.</li>
                <li>Choose a deployment environment or platform.</li>
                <li>Configure any necessary deployment settings.</li>
                <li>Initiate the deployment process.</li>
                <li>Once deployed, test your model to ensure it's working as expected.</li>
              </ol>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

