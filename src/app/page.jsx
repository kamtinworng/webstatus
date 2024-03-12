"use client";
import {
  AppShell,
  Burger,
  Skeleton,
  Title,
  Text,
  Flex,
  Avatar,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Content } from "./content/page";
import { IconHome2 } from "@tabler/icons-react";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
          px="md"
          h="100%"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <div>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3}>
              Web
              <Text span c="blue" inherit>
                Check
              </Text>
              Status
            </Title>
          </div>
          <div>
            <Avatar color="cyan" radius="xl">
              MK
            </Avatar>
          </div>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        MENU
        <NavLink
          href="/"
          label="Check Status URLs"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          active
        />
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <main>
          <Content />
        </main>
      </AppShell.Main>
    </AppShell>
  );
}
