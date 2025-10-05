"use client";

import { useState, useRef, useEffect } from "react";
// Import additional components for the interactive chat
import {
  Container,
  Grid,
  Image,
  Title,
  Text,
  Badge,
  Stack,
  Paper,
  Button,
  Alert,
  Center,
  Group,
  Modal,
  Avatar,
  Flex,
  TextInput,
  ScrollArea,
  Loader,
} from "@mantine/core";
import {
  IconMapPin,
  IconUser,
  IconCreditCard,
  IconCircleCheck,
  IconMessageCircle,
  IconSend,
} from "@tabler/icons-react";
import { AppHeader } from "../../../components/Header";
import { items } from "../../../lib/placeholder-data";

// Define the structure for a chat message
interface Message {
  text: string;
  sender: "user" | "seller";
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // NEW STATE FOR INTERACTIVE CHAT
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! Is this item still available for pickup this weekend?",
      sender: "user",
    },
    {
      text: "Yes, it is! Saturday afternoon works great for me.",
      sender: "seller",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSellerTyping, setIsSellerTyping] = useState(false);

  // A ref to automatically scroll the chat down
  const viewport = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });

  // Effect to scroll down whenever a new message is added
  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { text: currentMessage, sender: "user" }]);
    setCurrentMessage("");

    // Simulate seller typing and replying
    setIsSellerTyping(true);
    setTimeout(() => {
      const sellerReply = "That sounds good. I'll be home after 2 PM.";
      setMessages((prev) => [...prev, { text: sellerReply, sender: "seller" }]);
      setIsSellerTyping(false);
    }, 1500); // 1.5 second delay for realism
  };

  const item = items.find((i) => i.id === parseInt(params.id));

  if (!item) {
    /* ... (no changes here) ... */ return null;
  }

  return (
    <main>
      <AppHeader />
      {/* THE NEW INTERACTIVE CHAT MODAL */}
      <Modal
        opened={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        title={
          <Group>
            <Avatar color="coral" radius="xl">
              {item.creator.charAt(0)}
            </Avatar>
            <Text fw={500}>Chat with {item.creator}</Text>
          </Group>
        }
        centered
        size="lg"
      >
        <ScrollArea h={300} viewportRef={viewport}>
          <Stack gap="lg" p="md">
            {messages.map((message, index) => (
              <Paper
                key={index}
                p="xs"
                radius="md"
                shadow="xs"
                c={message.sender === "user" ? "white" : "black"}
                bg={message.sender === "user" ? "fieryCoral" : "#f1f3f5"}
                style={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <Text>{message.text}</Text>
              </Paper>
            ))}
            {isSellerTyping && (
              <Group>
                <Avatar color="coral" radius="xl" size="sm">
                  {item.creator.charAt(0)}
                </Avatar>
                <Loader color="gray" size="sm" type="dots" />
              </Group>
            )}
          </Stack>
        </ScrollArea>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Group mt="md" gap="sm">
            <TextInput
              placeholder="Type your message..."
              style={{ flex: 1 }}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.currentTarget.value)}
            />
            <Button type="submit" leftSection={<IconSend size={16} />}>
              Send
            </Button>
          </Group>
        </form>
      </Modal>

      <Container my="xl">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image
              src={item.imageUrl}
              radius="md"
              fit="cover"
              height={400}
              alt={item.title}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack>
              <Badge color="fieryCoral" size="lg" variant="light">
                {item.category}
              </Badge>
              <Title order={1}>{item.title}</Title>

              <Paper withBorder p="md" radius="md">
                <Stack>
                  <Group>
                    <IconUser />
                    <Text>
                      Seller: <strong>{item.creator}</strong>
                    </Text>
                  </Group>
                  <Group>
                    <IconMapPin />
                    <Text>
                      Pickup Address: <strong>{item.city}, India</strong>
                    </Text>
                  </Group>
                  <Button
                    onClick={() => setIsChatOpen(true)}
                    variant="outline"
                    leftSection={<IconMessageCircle size={18} />}
                    mt="sm"
                  >
                    Chat with Seller
                  </Button>
                </Stack>
              </Paper>

              <Paper withBorder p="md" radius="md" mt="lg">
                <Stack>
                  <Group>
                    <IconCreditCard />
                    <Title order={4}>Complete Your Claim</Title>
                  </Group>
                  <Text size="sm" c="dimmed">
                    This is a prototype. No real payment is required.
                  </Text>
                  {showSuccess ? (
                    <Alert
                      icon={<IconCircleCheck size="1rem" />}
                      title="Claim Successful!"
                      color="teal"
                      radius="md"
                    >
                      You have successfully claimed this item!
                    </Alert>
                  ) : (
                    <Button onClick={() => setShowSuccess(true)} size="lg">
                      Confirm Claim & Proceed to Pay
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}
