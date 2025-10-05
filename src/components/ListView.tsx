"use client";

// Import Link from next/link for navigation
import Link from "next/link";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Title,
  Button,
  Container,
} from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import type { ItemData } from "../lib/placeholder-data";

interface ListViewProps {
  items: ItemData[];
}

export function ListView({ items }: ListViewProps) {
  if (!items || items.length === 0) {
    return <Text>No items found.</Text>;
  }

  // A Container to constrain the width, and a Stack to create the vertical list
  return (
    <Container size="sm" p={0}>
      <Stack>
        {items.map((item) => (
          // Each card is now a vertical layout, matching the Inspiration Hub
          <Card shadow="sm" padding="lg" radius="md" withBorder key={item.id}>
            <Card.Section>
              <Image
                src={item.imageUrl}
                height={200} // Same height as InspirationHub cards
                alt={item.title}
                fit="cover"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Title order={4}>{item.title}</Title>
              <Badge color="fieryCoral" variant="light">
                {item.category}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Listed by {item.creator}
            </Text>

            <Group gap="xs" c="dimmed" mt={4}>
              <IconMapPin size={16} />
              <Text size="sm">{item.city}</Text>
            </Group>

            {/* THE KEY CHANGE: Button is now a Link */}
            <Button
              component={Link}
              href={`/item/${item.id}`} // Dynamic link to the detail page
              mt="md"
              fullWidth
            >
              Claim Item
            </Button>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
