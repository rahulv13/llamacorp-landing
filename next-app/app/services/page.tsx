import { constructMetadata } from '@/lib/metadata';
import ServicesClient from './page.client';
import { JsonLd } from '@/components/seo/JsonLd';
import { getServiceSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';

export const metadata = constructMetadata({
  title: "Our Services | Llamacorp",
  description: "Discover our AI-driven web design and development services.",
  path: "/services",
});

export default function Services() {
  const serviceSchema = getServiceSchema({
    name: "Web Design & Development",
    description: "Premium AI-powered web design and development services for startups and businesses.",
    url: `${SITE_URL}/services`,
  });

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <ServicesClient />
    </>
  );
}
