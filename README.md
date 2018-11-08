# Musefan

Musefan is a very simple mashup application built with Angular 6 that implements three APIs :
- Spotify API - This is used to retrieve artists from a global database.
- Songkick API - This api is used to retrieve a list of upcoming concerts for an artist via XML.
- Google Maps API - This API is used to retrieve drive times from Paris to the each concert (if possible).

## Quick run via development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Using the app

Just start typing the name of an artist in the input field at the top and click the artist that you are interested in. A list of upcoming concerts will then appear underneath the input field including drive times when possible.

Good artists to try:
- Jain
- Grand Blanc
- Christine and the Queens
- U2

## Build

`ng serve` will build the project for you. To force-build the project, run `ng build`. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Thinking behind the design

The aim of this project was to create a simple mashup application implementing standard webservice protocoles in a useful and meaningful way. Here we have an integration of 3 APIs
that complete each other in a helpful way. I retrieve artists via Spotify because of the exhaustivity of its database. I use Songkick for concerts because of the company's leadership in ticket reservations worldwide.
Google maps was the smartest choice for retrieving routes because of the reactivity of the service.

Spotify and Google Maps APIs use JSON for communication and are decoded by Angular's built'in parser. The Songkick API uses XML which is parsed using the xml-js library.

Originally, this project would have to implement the SoundCloud API. This has been made impossible because of SoundCloud temporarily closing their application registration.
