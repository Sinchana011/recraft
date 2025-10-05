"use client";

import { useState, useRef, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Image,
  Paper,
  Stack,
  Divider,
  Group,
  Avatar,
  Button,
  Textarea,
  Center,
  Rating,
  Modal,
  ScrollArea,
  TextInput,
  Loader,
} from "@mantine/core";
import { AppHeader } from "../../../components/Header";
import { IconSend, IconMessageCircle2 } from "@tabler/icons-react";
import { inspirationPosts } from "../../../lib/inspiration-data";

// Define the structure for a chat message
interface Message {
  text: string;
  sender: "user" | "creator";
}

export default function InspirationPostPage({
  params,
}: {
  params: { id: string };
}) {
  // State for the main page comments and rating
  const [comments, setComments] = useState([
    { user: "CreativeChris", text: "This is so inspiring! What a great idea." },
    { user: "DIY-Danielle", text: "Love this! So creative." },
  ]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(4);

  // State for the two-step modal flow
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // State for the interactive chat
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const [isCreatorTyping, setIsCreatorTyping] = useState(false);

  const post = inspirationPosts.find((p) => p.id === parseInt(params.id));
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });

  useEffect(() => {
    if (isChatModalOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatModalOpen]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    setComments((prev) => [...prev, { user: "You", text: newComment }]);
    setNewComment("");
  };

  const handleChatSendMessage = () => {
    if (currentChatMessage.trim() === "") return;
    setChatMessages((prev) => [
      ...prev,
      { text: currentChatMessage, sender: "user" },
    ]);
    setCurrentChatMessage("");
    setIsCreatorTyping(true);
    setTimeout(() => {
      const creatorReply = `Hi there! Thanks for your interest in the "${
        post?.title.split(":")[0]
      }". I can make a similar custom piece for you. Let me know if you have any questions!`;
      setChatMessages((prev) => [
        ...prev,
        { text: creatorReply, sender: "creator" },
      ]);
      setIsCreatorTyping(false);
    }, 1500);
  };

  const openChatFromDetails = () => {
    setIsDetailModalOpen(false);
    setIsChatModalOpen(true);
  };

  if (!post) {
    return null;
  }

  return (
    <main>
      <AppHeader />

      {/* MODAL 1: Product & Creator Details */}
      <Modal
        opened={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Request Details"
        centered
      >
        <Stack>
          <Image src={post.imageUrl} radius="md" height={180} fit="cover" />
          <Title order={3}>{post.title}</Title>
          <Text>
            by <strong>{post.author}</strong>
          </Text>
          <Text size="sm" c="dimmed">
            You can start a conversation with the creator to inquire about
            custom orders, price, and availability.
          </Text>
          <Button
            onClick={openChatFromDetails}
            leftSection={<IconMessageCircle2 size={18} />}
            fullWidth
            mt="md"
          >
            Chat with Creator
          </Button>
        </Stack>
      </Modal>

      {/* MODAL 2: Interactive Chat */}
      <Modal
        opened={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        title={`Chat with ${post.author}`}
        centered
        size="lg"
      >
        <ScrollArea h={300} viewportRef={viewport}>
          <Stack gap="lg" p="md">
            {chatMessages.length === 0 && (
              <Center>
                <Text c="dimmed">Start the conversation!</Text>
              </Center>
            )}
            {chatMessages.map((message, index) => (
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
            {isCreatorTyping && (
              <Group>
                <Avatar color="coral" radius="xl" size="sm">
                  {post.author.charAt(0)}
                </Avatar>
                <Loader color="gray" size="sm" type="dots" />
              </Group>
            )}
          </Stack>
        </ScrollArea>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChatSendMessage();
          }}
        >
          <Group mt="md" gap="sm">
            <TextInput
              placeholder="Ask about price..."
              style={{ flex: 1 }}
              value={currentChatMessage}
              onChange={(e) => setCurrentChatMessage(e.currentTarget.value)}
            />
            <Button type="submit" leftSection={<IconSend size={16} />}>
              Send
            </Button>
          </Group>
        </form>
      </Modal>

      <Container my="xl">
        <Stack>
          <Title order={1}>{post.title}</Title>
          <Group>
            <Avatar color="coral" radius="xl">
              {post.author.charAt(0)}
            </Avatar>
            <Text c="dimmed">by {post.author}</Text>
          </Group>
          <Image
            src={post.imageUrl}
            height={400}
            radius="md"
            fit="cover"
            my="md"
          />
          <Paper p="lg">
            <Text lh={1.7}>{post.story}</Text>
          </Paper>
          <Divider my="xl" label="Rate this Creation" labelPosition="center" />
          <Center>
            <Rating value={rating} onChange={setRating} size="xl" />
          </Center>

          {/* RESTORED: Community Comments Section */}
          <Divider my="xl" label="Community Comments" labelPosition="center" />
          <Stack>
            {comments.map((comment, index) => (
              <Paper withBorder p="md" radius="md" key={index} shadow="xs">
                <Group align="start">
                  <Avatar color="gray" radius="xl">
                    {comment.user.charAt(0)}
                  </Avatar>
                  <Stack gap={0}>
                    <Text fw={500}>{comment.user}</Text>
                    <Text>{comment.text}</Text>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </Stack>

          {/* RESTORED: Add a Comment Form */}
          <Paper withBorder p="md" radius="md" mt="lg">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
              minRows={3}
            />
            <Button
              onClick={handleCommentSubmit}
              leftSection={<IconSend size={16} />}
              mt="md"
            >
              Post Comment
            </Button>
          </Paper>

          {/* MOVED: Request to Buy Button */}
          <Divider my="xl" />
          <Paper p="xl" radius="md" withBorder>
            <Stack align="center" gap="xs">
              <Title order={3}>Like this creation?</Title>
              <Text c="dimmed" ta="center">
                Contact the creator to request a custom piece for yourself!
              </Text>
              <Button
                onClick={() => setIsDetailModalOpen(true)}
                size="lg"
                mt="md"
              >
                Request to Buy from Creator
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </main>
  );
}
