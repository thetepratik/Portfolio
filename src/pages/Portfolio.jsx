import { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingScreen from '../components/common/LoadingScreen';
import ScrollToTop from '../components/common/ScrollToTop';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Research from '../components/sections/Research';
import Achievements from '../components/sections/Achievements';
import Certifications from '../components/sections/Certifications';
import GitHub from '../components/sections/GitHub';
import Testimonials from '../components/sections/Testimonials';
import Blog from '../components/sections/Blog';
import Contact from '../components/sections/Contact';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const { data } = useData();

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  return (
    <>
      <Helmet>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <meta name="keywords" content={data.seo.keywords?.join(', ')} />
        <meta property="og:title" content={data.seo.title} />
        <meta property="og:description" content={data.seo.description} />
        <meta property="og:image" content={data.seo.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Achievements />
        <Certifications />
        <GitHub />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
