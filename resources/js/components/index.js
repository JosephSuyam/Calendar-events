import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.js';
import axios from 'axios';

const base_url = 'http://localhost/coding-chall/public';

const App = () => {
    const [ events, setEvents ] = useState();
    const [ loading, setLoading ] = useState(false);

    const fetchEventData = async () => {
        try {
            const response = await axios.get(base_url + '/api/event');
            const data = parseEvent(response.data);
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const createEvent = async (event) => {
        try {
            const response = await axios.post(base_url + '/api/event', event);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Calendar
                        loading={loading}
                        setLoading={setLoading}
                        events={events}
                        fetchEventData={fetchEventData}
                        createEvent={createEvent}
                    />
                </div>
            </div>
        </div>
    )
}

if (document.getElementById('main-frame')) {
    ReactDOM.render(<App />, document.getElementById('main-frame'));
}
