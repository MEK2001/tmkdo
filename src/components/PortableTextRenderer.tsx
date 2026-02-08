import {PortableText, PortableTextComponents} from '@portabletext/react';
import Image from 'next/image';
import {urlFor} from '@/lib/sanity.image';

// Custom components for rendering Portable Text
const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul>{children}</ul>,
    number: ({children}) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong>{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({value}) => {
      if (!value?.asset) return null;
      return (
        <figure style={{margin: '2rem 0'}}>
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            style={{width: '100%', height: 'auto'}}
          />
          {value.caption && (
            <figcaption style={{marginTop: '0.5rem', fontSize: '0.9rem', color: '#666'}}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({value}: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
