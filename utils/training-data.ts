export async function prepareTrainingData(
  componentsData: TrainingExample[],
  styleSystem: string,
  builderName: string
): Promise<TrainingExample[]> {
  try {
    return componentsData.map((example) => ({
      conversation: example.conversation.map((turn) => ({
        user_prompt: turn.user_prompt,
        generated_code: turn.generated_code,
        files: Object.entries(turn.files).reduce(
          (acc, [path, data]) => ({
            ...acc,
            [path]: {
              content: data.content,
              styling: extractStyling(data.content, styleSystem),
              props: path.includes("component") ? extractComponentProps(data.content) : [],
            },
          }),
          {}
        ),
      })),
      bolt_metadata: {
        framework: "nextjs",
        style_system: styleSystem,
        builder: builderName,
      },
    }))
  } catch (error) {
    throw new Error(`Failed to prepare training data: ${error}`)
  }
}

function extractStyling(implementation: string, styleSystem: string): string[] {
  if (styleSystem === "tailwind") {
    return implementation.match(/[\w-]+(?=:)/g) || []
  }
  return []
}

function extractComponentProps(implementation: string): string[] {
  const propsMatch = implementation.match(/interface Props {\s+([^}]+)}/)?.[1]
  if (!propsMatch) return []
  return propsMatch
    .split("\n")
    .map((line) => line.trim().split(":")[0])
    .filter(Boolean)
}

