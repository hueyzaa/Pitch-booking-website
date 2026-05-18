import Hero from '../components/Hero';

export default function Home({ config }: any) {
  return (
    <main>
      <Hero config={config} />
    </main>
  );
}

