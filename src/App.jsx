import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link
} from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Navbar,
  Footer,
  WhatsApp
} from './components/Layout.jsx';

import Home from './pages/Home.jsx';

import {
  About,
  Programs,
  Trainers,
  Membership,
  Gallery,
  Contact,
  Legal,
  FAQPage
} from './pages/Pages.jsx';

import { site } from './data/site.js';

import './styles.css';


const pageMeta = {
  '/': [
    'Gym in Ghaziabad | XYZ Fitness Club',
    'Looking for a gym in Ghaziabad? Explore strength training, personal training, fitness programmes and membership enquiries at XYZ Fitness Club.'
  ],

  '/about': [
    'About XYZ Fitness | Fitness Club in Ghaziabad',
    'Get to know XYZ Fitness in Ghaziabad, our training philosophy, coaching approach and fitness community.'
  ],

  '/programs': [
    'Gym & Fitness Programs in Ghaziabad | XYZ Fitness',
    'Explore strength and conditioning, personal training, functional fitness, cardio and group training at XYZ Fitness Ghaziabad.'
  ],

  '/trainers': [
    'Personal Trainers | XYZ Fitness Ghaziabad',
    'Meet the coaching team at XYZ Fitness. Ask about personal training and guided workouts in Ghaziabad.'
  ],

  '/membership': [
    'Gym Membership Plans in Ghaziabad | XYZ Fitness',
    'Explore illustrative monthly, quarterly and yearly gym membership options. Contact XYZ Fitness Ghaziabad to confirm current prices and offers.'
  ],

  '/gallery': [
    'Gym Photos & Training Space | XYZ Fitness Ghaziabad',
    'Explore the XYZ Fitness training atmosphere and gym gallery.'
  ],

  '/contact': [
    'Contact XYZ Fitness | Gym in Ghaziabad',
    'Call or WhatsApp XYZ Fitness on +91 95288 76007 for gym membership, training and trial visit enquiries in Ghaziabad.'
  ],

  '/privacy': [
    'Privacy Policy | XYZ Fitness',
    'Read the XYZ Fitness website privacy policy.'
  ],

  '/terms': [
    'Terms & Conditions | XYZ Fitness',
    'Read the XYZ Fitness website terms and conditions.'
  ],

  '/faq': [
    'Gym FAQs | XYZ Fitness Ghaziabad',
    'Answers about gym membership, beginner workouts, personal training and visiting XYZ Fitness in Ghaziabad.'
  ]
};


// 404 PAGE
function NotFound() {
  return (
    <main className="not-found container">

      <span className="eyebrow">
        ERROR 404
      </span>

      <h1>
        THIS PAGE
        <br />
        <em>WENT OFF TRACK.</em>
      </h1>

      <p>
        The page you're looking for doesn't exist or may have moved.
      </p>

      <Link className="btn btn-primary" to="/">
        BACK TO HOME ↗
      </Link>

    </main>
  );
}


// ANIMATED ROUTES
function AnimatedRoutes() {

  const loc = useLocation();

  const [title, description] =
    pageMeta[loc.pathname] || [
      'Page Not Found | XYZ Fitness',
      'Explore XYZ Fitness, a gym and fitness club in Ghaziabad, Uttar Pradesh.'
    ];

  const canonical = site.canonicalBase
    ? `${site.canonicalBase.replace(/\/+$/, '')}${loc.pathname}`
    : undefined;


  // LOCAL BUSINESS SCHEMA
  const businessSchema = {

    '@context': 'https://schema.org',

    '@type': 'HealthClub',

    name: site.name,

    telephone: site.phoneLink,

    areaServed: {
      '@type': 'City',
      name: 'Ghaziabad'
    },

    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ghaziabad',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    },

    description:
      'Fitness club in Ghaziabad offering strength training, conditioning and personal training enquiries.',

    priceRange: 'Contact for membership prices',

    url: canonical || undefined
  };


  return (
    <>

      <Helmet>

        <title>{title}</title>

        <meta
          name="description"
          content={description}
        />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />

        <meta
          name="theme-color"
          content="#11120f"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:site_name"
          content="XYZ Fitness"
        />

        <meta
          property="og:title"
          content={title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={title}
        />

        <meta
          name="twitter:description"
          content={description}
        />

        {canonical && (
          <link
            rel="canonical"
            href={canonical}
          />
        )}

        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>

      </Helmet>


      <Navbar />


      <AnimatePresence mode="wait">

        <motion.main
          key={loc.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{
            duration: 0.22,
            ease: 'easeOut'
          }}
        >

          <Routes location={loc}>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/programs"
              element={<Programs />}
            />

            <Route
              path="/trainers"
              element={<Trainers />}
            />

            <Route
              path="/membership"
              element={<Membership />}
            />

            <Route
              path="/gallery"
              element={<Gallery />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/privacy"
              element={<Legal type="privacy" />}
            />

            <Route
              path="/terms"
              element={<Legal type="terms" />}
            />

            <Route
              path="/faq"
              element={<FAQPage />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </motion.main>

      </AnimatePresence>


      <Footer />

      <WhatsApp />

    </>
  );
}


// MAIN APP
export default function App() {

  return (

    <HelmetProvider>

      <BrowserRouter basename="/xyz-fitness">

        <AnimatedRoutes />

      </BrowserRouter>

    </HelmetProvider>

  );

}