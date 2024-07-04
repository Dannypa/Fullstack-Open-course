sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, <br> data = {content: <note text>, date: <timestamp>}
    Note right of browser: Simultaneously the browser adds a note to the array of notes and redraws them. 
