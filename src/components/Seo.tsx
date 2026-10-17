import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
};

const siteUrl = 'https://your-deployed-domain.example/';

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', siteUrl, 'property');
    setMeta('og:site_name', 'Sowmiya S Portfolio', 'property');
    setMeta('og:image', '/social-preview.png', 'property');
    setMeta('twitter:title', title, 'property');
    setMeta('twitter:description', description, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:image', '/social-preview.png');
    setCanonical(siteUrl);

    let script = document.head.querySelector<HTMLScriptElement>('#structured-data-person');
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data-person';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sowmiya S',
      jobTitle: 'DevOps & Cloud Engineering Student',
      url: siteUrl,
      sameAs: ['https://github.com/sowmiiiiyaa', 'https://www.linkedin.com/in/sowmiya-s-241486346/'],
    });
  }, [description, title]);

  return null;
}