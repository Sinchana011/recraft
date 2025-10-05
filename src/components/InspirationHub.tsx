"use client";

import Link from "next/link";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  SimpleGrid,
  Title,
  UnstyledButton,
} from "@mantine/core";
// Import our new, centralized data
import { inspirationPosts } from "../lib/inspiration-data";

export function InspirationHub() {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        Community Showcase
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {inspirationPosts.map((item) => (
          <UnstyledButton
            component={Link}
            href={`/inspiration/${item.id}`}
            key={item.id}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ height: "100%" }}
            >
              <Card.Section>
                <Image
                  src={item.imageUrl}
                  height={200}
                  alt={item.title}
                  fit="cover"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                {/* Use the title from our data */}
                <Text fw={500}>{item.title.split(":")[0]}</Text>
                <Badge color="vibrantGold" variant="light">
                  {item.materials}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed">
                by {item.author}
              </Text>
            </Card>
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </>
  );
}
