<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Event;
use App\Http\Requests\CreateEventRequest;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getLatest()
    {
        try {
            return Event::latest()->take(5)->get();
            // return Event::latest()->first();
        } catch (Throwable $e) {
            Log::error($e);
            throw $e;
        }
    }

    /**
     * Create a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(CreateEventRequest $request)
    {
        $request->validated();

        try {
            return Event::create($request->all());
        } catch (Throwable $e) {
            Log::error($e);
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
