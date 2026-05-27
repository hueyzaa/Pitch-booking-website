import Hero from '../components/Hero';
import FeaturedPitches from '../components/FeaturedPitches';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedPitches />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </main>
  );
}
