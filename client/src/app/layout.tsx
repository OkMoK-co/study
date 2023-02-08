"use client";

import "@/styles/_global.css";
import { client } from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ApolloProvider client={client}>
          <div>root layout 입니다.</div>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
