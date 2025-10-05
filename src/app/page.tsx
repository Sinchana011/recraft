"use client";

import { useState, useMemo } from "react";
import {
  Container,
  Center,
  Tabs,
  rem,
  useComputedColorScheme,
  Text,
  TextInput,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import {
  IconMap2,
  IconPhoto,
  IconList,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { AppHeader } from "../components/Header";
import { InspirationHub } from "../components/InspirationHub";
import { AddItemForm } from "../components/AddItemForm";
import { ListView } from "../components/ListView";
import { items as allItems } from "../lib/placeholder-data";

const DiscoveryMap = dynamic(
  () => import("../components/DiscoveryMap").then((mod) => mod.DiscoveryMap),
  {
    ssr: false,
    loading: () => (
      <Center style={{ height: "60vh" }}>
        <Text>Loading map...</Text>
      </Center>
    ),
  }
);

const categories = ["All", ...new Set(allItems.map((item) => item.category))];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return allItems
      .filter(
        (item) =>
          selectedCategory === "All" || item.category === selectedCategory
      )
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory]);

  const computedColorScheme = useComputedColorScheme("light");
  const iconStyle = { width: rem(16), height: rem(16) };
  const primaryColor =
    computedColorScheme === "light" ? "fieryCoral" : "vibrantGold";

  return (
    <main style={{ paddingBottom: "2rem" }}>
      <AppHeader />
      <Container size="xl" mt="md">
        <Tabs
          defaultValue="map-view"
          color={primaryColor}
          variant="pills"
          radius="md"
        >
          <Tabs.List grow>
            <Tabs.Tab
              value="map-view"
              leftSection={<IconMap2 style={iconStyle} />}
            >
              Map View
            </Tabs.Tab>
            <Tabs.Tab
              value="list-view"
              leftSection={<IconList style={iconStyle} />}
            >
              List View
            </Tabs.Tab>
            <Tabs.Tab
              value="inspiration"
              leftSection={<IconPhoto style={iconStyle} />}
            >
              Inspiration Hub
            </Tabs.Tab>
            <Tabs.Tab
              value="add-item"
              leftSection={<IconPlus style={iconStyle} />}
            >
              Add Item
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="map-view" pt="lg">
            <Stack mb="lg">
              <TextInput
                placeholder="Search for items by title..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
              <Group>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "filled" : "light"}
                    onClick={() => setSelectedCategory(category)}
                    color={primaryColor}
                  >
                    {category}
                  </Button>
                ))}
              </Group>
            </Stack>
            <DiscoveryMap items={filteredItems} />
          </Tabs.Panel>

          <Tabs.Panel value="list-view" pt="lg">
            <ListView items={filteredItems} />
          </Tabs.Panel>

          <Tabs.Panel value="inspiration" pt="lg">
            <InspirationHub />
          </Tabs.Panel>
          <Tabs.Panel value="add-item" pt="lg">
            <AddItemForm />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </main>
  );
}
