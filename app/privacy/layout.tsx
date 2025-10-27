import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Greek Games",
  description:
    "Privacy policy for Greek Games - Learn how we collect, use, and protect your data when you use our Greek language learning platform.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Greek Games",
    description: "Privacy policy for Greek Games language learning platform",
    url: "https://greekgames.io/privacy",
    siteName: "Greek Games",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://greekgames.io/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
