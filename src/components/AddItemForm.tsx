"use client";

import { useState } from "react";
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Title,
  Stack,
  FileInput,
  TagsInput,
  Loader,
  Text,
  rem,
  Center,
  Paper,
} from "@mantine/core";
import { IconUpload, IconCircleCheck } from "@tabler/icons-react";

export function AddItemForm() {
  const [isScanning, setIsScanning] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  // THIS IS THE NEW STATE FOR THE SUBMISSION
  const [isSubmitted, setIsSubmitted] = useState(false);

  // This function simulates the AI processing
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setFileName(file.name);
    setSuggestedTags([]); // Clear previous tags
    setIsScanning(true);

    // Simulate a 2-second AI scan
    setTimeout(() => {
      const aiTags = ["glass bottle", "transparent", "green glass", "reusable"];
      setSuggestedTags(aiTags);
      setIsScanning(false);
    }, 2000);
  };

  // THIS IS THE NEW SUBMISSION HANDLER
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent actual form submission
    setIsSubmitted(true);
  };

  // THIS IS THE NEW SUCCESS VIEW
  if (isSubmitted) {
    return (
      <Paper
        withBorder
        shadow="md"
        p="xl"
        radius="md"
        style={{ textAlign: "center" }}
      >
        <Stack align="center">
          <IconCircleCheck
            style={{ width: rem(80), height: rem(80) }}
            color="teal"
          />
          <Title order={2}>Item Listed Successfully!</Title>
          <Text c="dimmed">
            Thank you for contributing to the circular economy.
          </Text>
          <Button onClick={() => setIsSubmitted(false)} mt="lg">
            List Another Item
          </Button>
        </Stack>
      </Paper>
    );
  }

  // THIS IS THE ORIGINAL FORM, WRAPPED IN A <form> TAG
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg" align="center" style={{ maxWidth: 600, margin: "auto" }}>
        <Title order={2} ta="center">
          List a New Material
        </Title>

        <FileInput
          label="1. Upload a Photo"
          description="Our AI will scan it to suggest tags."
          placeholder={fileName || "Click to upload or drag image here"}
          onChange={handleFileChange}
          accept="image/png,image/jpeg"
          leftSection={
            <IconUpload style={{ width: rem(18), height: rem(18) }} />
          }
          w="100%"
        />

        <TagsInput
          label="2. Material Tags (AI Suggested)"
          description="Our AI suggestions. You can add or remove tags."
          placeholder="Tags will appear here after scanning..."
          data={suggestedTags}
          value={suggestedTags}
          onChange={setSuggestedTags}
          disabled={isScanning}
          w="100%"
          rightSection={isScanning ? <Loader size="xs" /> : null}
        />

        {isScanning && (
          <Text size="sm" c="dimmed">
            🧠 AI is scanning your image...
          </Text>
        )}

        <TextInput
          required
          label="3. Title"
          placeholder="e.g., 12 Empty Wine Bottles"
          w="100%"
        />
        <Textarea
          label="4. Description"
          placeholder="Green glass, labels removed. Perfect for crafts."
          w="100%"
        />
        <NumberInput
          required
          label="5. Quantity"
          defaultValue={1}
          min={1}
          w="100%"
        />

        <Button type="submit" size="lg" mt="md" fullWidth>
          List My Item
        </Button>
      </Stack>
    </form>
  );
}
