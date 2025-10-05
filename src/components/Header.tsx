"use client"; // This component has interactivity (the theme toggle)

import {
  Container,
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Title,
  Text,
} from "@mantine/core";
import { IconSun, IconMoon, IconRecycle } from "@tabler/icons-react";

export function AppHeader() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <header style={{ padding: "1rem 0", borderBottom: "1px solid #ddd" }}>
      <Container size="xl">
        <Group justify="space-between">
          {/* Logo and App Name */}
          <Group gap="xs">
            <IconRecycle
              size={32}
              color={computedColorScheme === "light" ? "#D9534F" : "#FFC700"}
            />
            <Title
              order={2}
              style={{
                fontFamily: "Verdana, sans-serif",
                fontWeight: 700,
                color: computedColorScheme === "light" ? "#3C2A21" : "#F5F5F5",
              }}
            >
              Re:Craft
            </Title>
          </Group>

          {/* Dark Mode Toggle */}
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="light"
            size="lg"
            aria-label="Toggle color scheme"
            color={computedColorScheme === "light" ? "fieryCoral" : "yellow"}
          >
            <IconSun
              size={18}
              display={computedColorScheme === "dark" ? "block" : "none"}
            />
            <IconMoon
              size={18}
              display={computedColorScheme === "light" ? "block" : "none"}
            />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
}
