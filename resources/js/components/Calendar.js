import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = (props) => {
    const {
        loading,
        setLoading,
        events,
        fetchEventData,
        createEvent,
    } = props;

    const handleDateSelect = (selectInfo) => {
        setLoading(true);
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
            createEvent({
                name: title,
                start_at: selectInfo.startStr,
                end_at: selectInfo.endStr,
            });

            if(!loading) fetchEventData();
        }
    }

    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))
            clickInfo.event.remove();
    }

    // const handleEvents = () => fetchEventData();

    useEffect(() => {
        fetchEventData()
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        // initialEvents={currentEvents}
                        events={events} // alternatively, use the `events` setting to fetch from a feed
                        select={handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>
            </div>
        </div>
    )
}
    
function renderEventContent(eventInfo) {
    return (
    <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
    </>
    )
}

export default Calendar;
