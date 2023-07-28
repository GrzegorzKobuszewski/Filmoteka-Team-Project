# parcel-project-template

## Zalezności

Na komputerze musi być zainstalowana LTS-wersja [Node.js](https://nodejs.org/en/).

## Przed rozpoczęciem pracy

Jeden raz na projekt zainstalować wszystkie zalezności.

```shell
npm ci
```

### Praca

Włączyć tryp pracy.

```shell
npm run dev
```

W przeglądarce przejść na [http://localhost:1234](http://localhost:1234).

### Deploy

Kod będzie automatycznie się zbierać i robić deploy aktualnej wersji projektu na GitHub Pages, w gałąź `gh-pages`, za kazdym razem jeśli zostaną wprowadzone zmiany w `main`. Na przykład, po bezpośrenim push lub po przyjęciu pull-request. Aby to działało musimy w pliku `package.json` zmienić pole `homepage` i skrypt
`build`, zmieniając `nazwe_uzytkownika` i `nazwe_repozytorium` na swoje.

```json
"homepage": "https://nazwa_uzytkownika.github.io/nazwa_repozytorium",
"scripts": {
  "build": "parcel build src/*.html --public-url /nazwa_repozytorium/"
},
```

Po jakimś czasie stronę mozna będzie zobaczyć na zywo pod adresem który 
jest wpisany w poprawione właściwości `homepage`, na przykład
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Pliki i folderzy

- Wszystkie partials plików styłów powinny być w folderze `src/sass` i importować się w
  `src/sass/main.scss`
- Zdjęcia dodawajcie w folder `src/images`, przed tym zoptymizujcie te zdjęcia które dodajecie. Program po prostu 
  kopiuje wykorzystane zdjęcia aby system nie musiał optymizować je, bo na słabych komputerach 
  to moze zająć duzo czasu.





----------------------------------------------------------------------
TECH - Kryteria przyjęcia projektu z JS
----------------------------------------------------------------------

1. Zrealizowano adaptacyjny layout z trzema frakcjami (mobile, tablet, desktop), zgodnie z układem i specyfikacją techniczną.
2. Podłączony  modern-normalize.
3. Konsola dewelopera nie wyświetla błędów ani console.logs.
4. Nazwy plików nie zawierają dużych liter i spacji, wyłącznie litery alfabetu angielskiego.
5. Wszystkie zmienne nazywane są z użyciem camelCase, klasy z użyciem PascalCase, a stałe z użyciem UPPER_SNAKE_CASE.
6.  Wszystkie foldery i pliki są strukturyzowane zgodnie z wybranym bundlerem i instrukcjami Team Leadera.
7. Wszystkie wątki robocze oprócz main i gh-pages zostały usunięte.
8. Końcowa wersja projektu jest wdrożona na stronie GitHub Pages lub Netlify (studenci mogą również wybrać wdrożenie swojego projektu na wynajętym serwerze, jeśli tego chcą).
9. Wszystkie obrazy są zoptymalizowane pod wyświetlacz retina
10.  Mentor przeprowadził code review ostatecznej wersji projektu.

Matryca w FIGMIE
https://www.figma.com/file/ieXHCTVNre6afLNCW0cDFc/Filmoteka?type=design&node-id=0-1&mode=design&t=5OvvRh37vJ2PyWuf-0


----------------------------------------------------------------------
Plan dla projektu JS
----------------------------------------------------------------------

Cele projektu:
Zrealizowanie projektu przez zespół w wyznaczonym terminie (czas na wykonanie - 14 dni).
Zdobycie praktycznego doświadczenia pracy w zespole:
- doświadczenie z  programem do łączenia projektów - Parcel;
- współdziałanie w zespole i praca z Git;
- umiejętności rozgałęziania i scalania projektu;
- rozwiązywanie konfliktów po połączeniu wątków;
- doświadczenie w planowaniu i wyznaczaniu zadań;
- doświadczenie w pracy z Trello (https://trello.com/);
- doświadczenie na stanowisku Team Lead zespołu;
- doświadczenie na stanowisku Scrum Master zespołu;
- doświadczenie w prezentowaniu projektów.

-------
Role:
-------
---> Team Lead. Monitoruje techniczną realizację projektu, odpowiada za jakość kodu, pisze code reviews i zadania projektowe dla członków zespołu. Jest właścicielem repozytorium dla projektu zespołowego.  Bezpośrednio komunikuje się z mentorem projektu w kwestiach, związanych z realizacją projektu i problemami, jakie pojawiają się w zespole.
---> Scrum Master. Reguluje terminy wykonania projektu. Prowadzi codzienny Stand Up w celu zaplanowania pracy zespołu. Do przeprowadzenia Stand Up można wykorzystać Google Meet, Zoom, Skype, Discord. Monitoruje dostępność zadań dla wszystkich członków zespołu oraz terminy ich realizacji. Bezpośrednio komunikuje się z mentorem projektu w sprawach planowania i terminów wykonania projektu.
---> Mentor Projektu. Jest mentorem podczas realizacji projektu. Zadaniem mentora projektu jest doradztwo w kwestiach, związanych z techniczną realizacją projektu, wyboru narzędzi, technologii i planowania pracy w projekcie. Mentor dokonuje również recenzji kodu projektu przed jego prezentacją.

-------
Dzień 1. Planowanie.
-------
1 Studenci zostają podzieleni na zespoły przez opiekuna klienta.
2. Każdy zespół otrzymuje oddzielny kanał w slack.
3. Zespół musi wykonać zadania:
- wybrać nazwę zespołu;
- wybrać Team Leadera;
- wybrać Scrum Mastera;
- przejrzeć materiały dotyczące projektu.
4. Scrum Master powinien wypełnić tablicę Trello i zaprosić do niej wszystkich członków zespołu.
5. Wziąć udział we wstępnym webinarze o tytule "Projekt".
6. Zespół musi ocenić zadania i rozdzielić je między wszystkimi uczestnikami projektu.
7. Każdy uczestnik projektu wybiera w Trello kartę z zadaniem do dalszej realizacji i na bieżąco aktualizuje informacje o postępach w jego wykonaniu.

-------
Dzień 2-12. Praca nad projektem.
-------
1. Każdy pracuje nad swoim zadaniem.
2. W przypadku pytań technicznych zespół zwraca się do lidera zespołu (Team Lead).
3. Team Lead komunikuje się z mentorem, jeśli są pytania, które zespół nie był w stanie rozwiązać.
4. Team Lead codziennie, w dowolnej formie, informuje mentora o postępach w pracy nad projektem.
!!!Ważne!!! Udział w projekcie powinien być nie tylko zaplanowany, ale i rzeczywisty. Będzie to sprawdzane przez administrację GoIT.
5. Zespół przeprowadza codzienne spotkania Stand Up trwające 15-20 minut.
6. Każdy deweloper odpowiada na Stand Upie na trzy pytania: Co zrobili wczoraj (dziś)? Co będą robić dzisiaj (jutro)? W czym potrzebują pomocy?
!!!Ważne!!! Na spotkaniu Stand Up nie zaczynamy rozwiązywać kwestii, w których potrzebna jest pomoc. Mówimy o nich, aby cały zespół miał świadomość, jak przebiega proces realizacji projektu. Po przeprowadzeniu spotkania Stand Up programista, który potrzebuje pomocy, może pozostać i omówić swoje pytania z członkiem zespołu, który zna odpowiedź, lub z Team Leadem.

-------
Dzień 13: Demo. Przygotowanie do prezentacji.
-------
1. Zespół łączy w całość poprzednią wersję projektu.
2. Link do plików źródłowych projektu i strony roboczej (github pages) przekazywany jest projektowemu mentorowi do przeglądu kodu.
3. Mentor przegląda kod i przesyła go Team Lead'owi, a następnie każdy uczestnik projektu wybiera zadanie do poprawy w razie potrzeby.
4. Team Lead lub Scrum Master przesyła mentorowi listę członków zespołu według ról wraz z opisem zadań, które wykonali.

-------
Dzień 14. Prezentacja projektu.
-------
1. Zespół przygotowuje prezentację projektu. Czas trwania prezentacji nie powinien przekraczać 10 minut.
2. Team Lead dokonuje ostatecznego wdrożenia projektu.
3. Zespół sprawdza ostateczną wersję projektu pod kątem błędów krytycznych.
4. Prezentacja projektu odbywa się z udziałem przedstawiciela GoIT i wszystkich studentów kursu.

----------------------------------------------------------------------
Mail od Lidera - inicjacja projektu i pracy zespołu
----------------------------------------------------------------------

Drodzy!
Postawiłem repo Naszego projektu. Zapraszam do kopiowania i pracy nad swoimi częściami ;)

Zanim jeszcze zaczniecie pracę, pozwólcie, że dokładnie opiszę Wam co zrobiłem, żebyście widzieli, co i jak, bo nie wiem czy zdążę na jutrzejsze spotkanie - będę w trasie.

Generalnie po ustawieniu repo na Githubie dodałem potrzebne pliki i foldery do szkieletu strony naszego projektu - wszystko zgodnie z makietą. Podpiąłem też fonty (czcionki) z Google i modern-normalize. 

Stworzyłem też podstronę library.html, która różni się od index.html tylko nagłówkiem. Nagłówek też już jest podpięty pod te dwie strony (home i my library). Podobnie podpiąłem pod te 2 strony partiale html, główny plik ze stylami scss oraz główny z index.js.

Gdyby coś jeszcze było potrzebne to śmiało dokładajcie, reszta będzie uzupełniana na bieżąco ;)

Jest też kilka zasad, które chciałbym, żebyśmy w tym projekcie zastosowali. Część wynika bezpośrednio z wytycznych projektu, a część wprowadziłem dla lepszej czytelności. Oto one:

1) OBRAZY
Wszelkie obrazy, zdjęcia ikony i pliki svg wrzucamy do folderu "images" w folderze "src". Folder ma podfoldery tematyczne, więc warto z nich skorzystać. Pamiętajcie o optymalizacji pod wyświetlacz retina. 

Dla osób, które będą robiły galerię wrzuciłem wstępnie (na roboczo) 6x jeden obrazek - możecie go wykorzystać do stylowania zarówno galerii, jak i modala dla różnych rozdzielczości. Potem go usuniemy, bo pewnie nie będzie potrzebny.

2) PARTIALE (HTML)
Dodałem pliki odpowiednio do podziału pracy w Naszym zespole. Na początku każdy w Was będzie mógł pracować na własnym pliku bez ryzyka konfliktów - przynajmniej na razie :)

Generalnie nazwy są tam intuicyjne i spokojnie się połapiecie - a w razie potrzeby improwizujcie tworząc własne pliki - chociaż chyba na tę chwilę nie będziemy potrzebowali innych niż te, które już są. Starałem się wszystko dokładnie Wam rozpisać i zrobić ten układ niejako intuicyjny.

Ścieżka naszych partiali html to po prostu: src --> partials

Dałem też wstępne nazwy klas Waszych sekcji i/lub elementów znajdujących się w nich. Nazwy klas oczywiście będziecie tworzyć własne w ramach pracy nad Waszą częścią, ale te co już są zostawcie bez zmian, ponieważ część z nich ostylowałem, żeby zrobić kontener (klasa "container").

3) PARTIALE (SCSS)
Tutaj było najwięcej zabawy :)

Przyznam, że trochę zastanawiałem się jak to uprościć, żeby nam się potem nie myliły te pliki i klasy, bo ich będzie najwięcej. I chyba fajnie to wymyśliłem, ale o szczegółach przeczytacie już sobie w samym pliku zbierającym wszystkie style, czyli "main.scss".

Zapoznajcie się z plikiem "main.scss" (src --> sass --> main.scss), dałem w nim sporo komentarzy, jak będziemy dodawać i opisywać nowe pliki stylów.

Dodałem tylko style bazowe (base_variables, base_reset, base_typography) - zobaczcie sobie do czego są i co jest w nich umieszczone. Korzystajcie z tych stałych - szczególnie w przypadku kolorów. A jak jakiś przeoczyłem to dodajcie zgodnie z przykładami.

Ścieżka naszych partiali scss: src --> scss --> partials --> ...

4) Pliki JS - na tę chwilę jest folder tylko z 3 plikami, ale można "dokładać" w miarę potrzeb i rozrastania się Naszej aplikacji ;)


Aha, widziałem, że na Trello pojawiła się sugestia, żebym wszystko dobrze opisał, więc to robię - chociaż bez niej też bym tak pewnie zrobił ;)

Ale też chyba widzicie i czujecie, że zupełnie inaczej przegląda, pracuje i rozumie się projekt, jak wszystko jest transparentnie poopisywane.

Mam też nadzieję, że tym sposobem (opisywania wszystkiego, co robicie) będziecie wykonywać swoje części Naszego wspólnego projektu - dla wspólnej korzyści ;)


Pamiętajcie też proszę o kilku ważnych "Kryteriach tech. przyjęcia projektu":
1. Layout z trzema frakcjami (mobile, tablet, desktop), zgodnie z układem z FIGMY.
2. Nazwy plików nie zawierają dużych liter i spacji, wyłącznie litery alfabetu angielskiego.
3. Wszystkie zmienne nazywane są z użyciem camelCase, klasy z użyciem PascalCase, a stałe z użyciem UPPER_SNAKE_CASE.


PS Pobierzcie sobie proszę repozytorium zgodnie z instrukcją od GoIt i dajcie mi znać czy wszystko jest ok, i czy uruchomiliście to repo... powinno wyglądać jak screen w załączniku ;)

Powodzenia! :)

