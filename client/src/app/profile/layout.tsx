export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   {/*
    //     <head /> will contain the components returned by the nearest parent
    //     head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    //   */}
    //   <head />
    //   <body><div>layout</div>{children}</body>
    // </html>
    <section>layout입니다.{children}</section>
  );
}
