import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { VideoShowcase } from '@/components/VideoShowcase';
import { EquipmentCatalog } from '@/components/EquipmentCatalog';
import { About } from '@/components/About';
import { Questions } from '@/components/Questions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { approvedSiteUrl } from '@/lib/site-url';

export const metadata = { alternates: approvedSiteUrl() ? { canonical: '/' } : undefined };

export default function Home() {
 return <>
   <a className="skip-link" href="#contenido">Saltar al contenido</a>
   <Header />
   <main id="contenido">
     <Hero />
     <Services />
     <Projects />
     <VideoShowcase />
     <EquipmentCatalog />
     <About />
     <Questions />
     <Contact />
   </main>
   <Footer />
 </>;
}
