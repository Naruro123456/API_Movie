
beskrivning av din applikation:
-----------------------------------------
Vad min applikation går ut på är att jag med hjälp av en databas kan hämta information om olika filmer baserat på olika kriterier. Vi har tillgång till följande information om filmerna: titel, betyg, genre, år, releasedatum, manusförfattare, skådespelare och handling. Genom att skriva in filmens namn i sökrutan visas olika filmer som matchar söktermen. Om man klickar på en film visas detaljerad information om den specifika filmen. 



beskrivning av din API: 
-----------------------------------
The Open Movie Database (OMDb) är en API som tillhandahåller information om filmer och TV-serier. OMDb samlar in och organiserar data om tusentals filmer och TV-serier från olika källor och erbjuder en plattform för att söka efter filmrelaterad information. utan vad API är att den  hanterar accesspunkten för den specifika informationen som system behöver kunna tillhandahålla för externa system villket koden/applikationen. 


funktionaliteter
-----------------------------
Innan jag går in på dom separat funktionerna så kan jag kort berätta att kodens funkonalitet är Filmdatabas. Genom en databas så har den tillgåmg till en bred utbud av filmer och serier. Genom att skriva i sökrutan så kan du kolla upp olika filmer/ serier.



1. `async function loadMovies(searchTerm) { ... }`
   - Detta är en asynkron funktion som laddar filmer baserat på den angivna söktermen. Den använder OMDb API för att göra en sökning och hämta filmdata. 

2. `function findMovies() { ... }`
   - Detta är en funktion som triggar när användaren trycker på sökknappen. Den hämtar söktermen från sökrutan, anropar `loadMovies()` för att ladda filmer och visar sökresultatlistan på webbsidan.

3. `function displayMovieList(movies) { ... }`
   - Denna funktion visar listan över filmer baserat på de returnerade sökresultaten från OMDb API. Den skapar HTML-element för varje film i sökresultatet och lägger till dem i sökresultatlistan.

4. `function loadMovieDetails() { ... }`
   - Denna funktion läser in filmens detaljer när användaren klickar på en film i sökresultatlistan. Den använder filmens IMDB ID för att göra en ytterligare förfrågan till OMDb API och hämta detaljerad information om filmen.

5. `function displayMovieDetails(details) { ... }`
   - Denna funktion visar detaljerad information om en film. Den tar emot filmobjektet som parameter och skapar HTML-element för att visa titel, poster, år, releasedatum, genre, skådespelare, handling osv.

6. `window.addEventListener('click', (event) => { ... });`
   - Denna händelselyssnare döljer sökresultatlistan när användaren klickar någonstans utanför sökrutan.
