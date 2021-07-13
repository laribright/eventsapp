import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJs FireBase MongoDB" />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </div>
  ); 
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return { 
    props: { featuredEvents },
    revalidate: 1800, //Regenerate the page every 30mins
  };
}

export default HomePage;
