export function validateDataset(data: string): { isValid: boolean; error?: string } {
  try {
    const jsonData = JSON.parse(data)
    
    if (!Array.isArray(jsonData)) {
      return { isValid: false, error: "Data must be an array of examples" }
    }

    for (const example of jsonData) {
      if (typeof example.input !== "string" || typeof example.output !== "string") {
        return { isValid: false, error: "Each example must have 'input' and 'output' fields as strings" }
      }
    }

    return { isValid: true }
  } catch (error) {
    return { isValid: false, error: "Invalid JSON format" }
  }
}

