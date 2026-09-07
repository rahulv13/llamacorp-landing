import { constructMetadata } from '@/lib/metadata';
import WorkClient from './page.client';

export const metadata = constructMetadata({
  title: "Selected Work | Llamacorp",
  description: "Browse our portfolio of high-performance websites and digital products.",
  path: "/work",
});

export default function Work() {
  return <WorkClient />;
}
