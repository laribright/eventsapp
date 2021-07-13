import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";

function EventsPage(props) {
  const { allEvents } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="This is your application content" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { allEvents },
    revalidate: 60,
  };
}

export default EventsPage;
