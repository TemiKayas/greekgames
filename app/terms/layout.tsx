import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Greek Games",
  description:
    "Terms of service for Greek Games - Read our terms and conditions for using our Greek language learning platform.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | Greek Games",
    description: "Terms of service for Greek Games language learning platform",
    url: "https://greekgames.io/terms",
    siteName: "Greek Games",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://greekgames.io/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
