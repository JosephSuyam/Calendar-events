import { useEffect, useState} from 'react';
import axios from 'axios';

const base_url = 'http://localhost/coding-chall/public';

const fetchEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(base_url + '/api/event');
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const parseEvent = (events) => {
      return events.map((event) => {
          return {
              id: event.id,
              title: event.name,
              start: event.start_at,
              end: event.end_at,
          }
      });
  }

  return parseEvent(events);
};

const createEvent = (event) => {
  return async () => {
    try {
      const response = await axios.post(base_url + '/api/event/', event);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export { fetchEvent, createEvent };