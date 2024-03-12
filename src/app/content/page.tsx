"use client";

import {
  Accordion,
  Badge,
  Button,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Chain, Root } from "./type";
import { notifications } from "@mantine/notifications";
import Link from "next/link";

export function Content() {
  const [url, setURL] = useState<string | undefined>();
  const [value, setValue] = useState<Root>();
  const [isLoading, setIsLoading] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json; charset=utf-8");
  myHeaders.append(
    "X-Billing-Token",
    "3eb1317c42f233aa1cba467ac00adf00875e523fad201898c30ac21ea11131a358c25d929df866d53fd92abc0b38ebb52b207063ef4421a0fec53661333f4523"
  );

  function fetching() {
    setIsLoading(true);
    if (!url || url === "") {
      setIsLoading(false);
      notifications.show({
        title: "ไม่พบแหล่งที่อยู่",
        color: "red",
        message: "มีบ้างอย่างผิดพลาด ❌",
      });
      return;
    } else {
      fetch("https://api.httpstatus.io/v1/status", {
        method: "POST",
        headers: myHeaders,
        body: `{\r\n    \"requestUrl\":\"${url}\"\r\n}`,
      })
        .then((response) => response.text())
        .then((result) => {
          setValue(JSON.parse(result));
          setIsLoading(false);
          notifications.show({
            title: "ดำเนินการสำเสร็จ",
            color: "green",
            message: "DATA CHECK SUCCESS ❤️",
          });
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <Stack gap={"md"}>
      <div>
        <Stack gap={"sm"}>
          <TextInput
            size="lg"
            radius="lg"
            label="Enter URL"
            description="System can check only one url,Easily check status codes, response headers, and redirect chains."
            onChange={(event) => setURL(event.currentTarget.value)}
          />
          <Button
            disabled={!url || url === ""}
            fullWidth
            radius="lg"
            onClick={fetching}
            loading={isLoading}
            loaderProps={{ type: "dots" }}
          >
            Check Status
          </Button>
        </Stack>
      </div>
      <div>
        {!url || url === "" || !value ? (
          ""
        ) : (
          <Accordion variant="filled" defaultValue={"result"}>
            <Accordion.Item key="result" value={url as string}>
              <Accordion.Control>
                <SimpleGrid cols={3}>
                  <div>
                    {
                      value.response.chain[value.response.chain.length - 1]
                        .url as string
                    }
                  </div>
                  <div>
                    {value.response.chain.map((element) => {
                      return (
                        <Badge
                          color={
                            element.statusCode > 499
                              ? "red"
                              : element.statusCode > 399
                              ? "yellow"
                              : element.statusCode > 299
                              ? "blue"
                              : element.statusCode === 200
                              ? "green"
                              : "red"
                          }
                        >
                          {element.statusCode}
                        </Badge>
                      );
                    })}
                  </div>
                  <div>Redirects:{value.response.numberOfRedirects}</div>
                </SimpleGrid>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  <Title c={"blue"}>Summary</Title>
                  <Paper shadow="sm" radius="md" p="xl">
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Status Code</Table.Th>
                          <Table.Th>ip</Table.Th>
                          <Table.Th>status message</Table.Th>
                          <Table.Th>Redirects to</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {value.response === undefined
                          ? "ไม่พบแหล่งที่อยู่"
                          : value.response.chain.map(
                              (element: Chain, key: number) => (
                                <Table.Tr key={key}>
                                  <Table.Td>
                                    <Badge
                                      color={
                                        element.statusCode > 499
                                          ? "red"
                                          : element.statusCode > 399
                                          ? "yellow"
                                          : element.statusCode > 299
                                          ? "blue"
                                          : element.statusCode === 200
                                          ? "green"
                                          : "red"
                                      }
                                    >
                                      {element.statusCode}
                                    </Badge>
                                  </Table.Td>
                                  <Table.Td>{element.ip}</Table.Td>
                                  <Table.Td>{element.statusMessage}</Table.Td>
                                  <Table.Td>
                                    <Button
                                      variant="transparent"
                                      component={Link}
                                      target="_blank"
                                      href={element.url}
                                    >
                                      {" "}
                                      {element.url}
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                              )
                            )}
                      </Table.Tbody>
                    </Table>
                  </Paper>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    </Stack>
  );
}
