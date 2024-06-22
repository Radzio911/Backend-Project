
Ten projekt kursu koncentruje się na zakończeniu modułów dotyczących Node.js, Express oraz baz danych. W trakcie tego projektu zostaniesz oceniony pod kątem tego, jak dobrze osiągnąłeś cele naukowe tych modułów, które obejmują:

Techniki Debugowania: Zastosujesz odpowiednie techniki debugowania, aby zidentyfikować i naprawić powszechne błędy w aplikacji Express.js.

Rozwój API zgodnego z REST: Zaprojektujesz i opracujesz API zgodne z REST za pomocą Express.js. Obejmuje to obsługę tras, integrację middleware, implementację mechanizmów uwierzytelniania oraz efektywne obsługiwanie błędów.

Łączność z Bazami Danych: Nauczysz się łączyć bazy danych z aplikacjami, umożliwiając im interakcję z trwałymi danymi.

Implementacja ORM z użyciem Prisma: Wdrożysz najnowocześniejsze rozwiązanie ORM (Object-Relational Mapping) - Prisma.

Projekt końcowy: API Rezerwacji

Witaj w projekcie końcowym!

Opis:

Celem tego projektu jest zaprojektowanie i opracowanie API zgodnego z REST dla aplikacji rezerwacji online za pomocą Express.js i Prisma. Będziesz pracować nad budową części backendowej aplikacji, skupiając się na kluczowych aspektach, takich jak obsługa tras, middleware do zadań takich jak logowanie i uwierzytelnianie, a także obsługa błędów.

Modele są tworzone przy użyciu Prisma, a dane są odczytywane, modyfikowane i usuwane za pomocą klienta Prisma (w usługach).

Rozpoczniesz od zera, budując kompleksowe rozwiązanie backendowe.

Aplikacja pozwala użytkownikom na:

• Logowanie

• Tworzenie, przeglądanie, aktualizowanie i usuwanie użytkowników

• Tworzenie, przeglądanie, aktualizowanie i usuwanie gospodarzy

• Tworzenie, przeglądanie, aktualizowanie i usuwanie nieruchomości

• Tworzenie, przeglądanie, aktualizowanie i usuwanie udogodnień

• Tworzenie, przeglądanie, aktualizowanie i usuwanie rezerwacji

• Tworzenie, przeglądanie, aktualizowanie i usuwanie recenzji

Model, który należy zaimplementować, wygląda następująco:

[Plik do pobrania]

[Uwaga]

W modelu Prisma dodamy kilka kolekcji, aby ułatwić pobieranie danych. Na przykład, pobierając nieruchomość, chcielibyśmy mieć listę wszystkich udogodnień i recenzji, które posiada. W instrukcjach znajdziesz dodatkowe kolekcje Prisma, które chcemy dodać do nieruchomości i gospodarza.

Zacznij od zapoznania się z instrukcjami i wymaganiami. Szczegóły implementacji znajdziesz w wymaganiach.

Powodzenia i udanych kodowań!

Instrukcje

1.Pobierz i skonfiguruj nasze szkieletowe rozwiązanie na swoim komputerze, klonując je za pomocą git clone https://github.com/WincAcademy/bed-final-project-boilerplate.git i używając npm install w odpowiednim folderze.
Następne 4 kroki są takie same jak w poprzednim ćwiczeniu. Możesz spróbować je wykonać samodzielnie lub po prostu otworzyć element, aby przeczytać bardziej szczegółowe instrukcje.

2.Skonfiguruj swoją bazę danych
Utwórz nową bazę danych. Możesz skorzystać z PlanetScale lub dowolnego innego dostawcy baz danych. Jeśli używasz PlanetScale, możesz:
Usuń utworzoną wcześniej bazę danych, jeśli nie masz nic przeciwko temu, żeby nie prezentować swojego interfejsu API wydarzeń ani łączyć go z aplikacją front-endową.
Utwórz nową bazę danych, a następnie utwórz pod nią nową gałąź.
Utwórz bazę danych z nowym kontem.
Dodaj klucze .env dla bazy danych. Jeśli korzystasz z PlanetScale, możesz użyć głównej gałęzi jako DATABASE_URL, a inną gałąź jako SHADOW_DATABASE_URL, ale śmiało można postępować zgodnie z oficjalnymi wytycznymi dla dowolnej bazy danych, jeśli chcesz wypróbować inną.

Będziesz również musiał dodać klucze dla AUTH_SECRET_KEY i SENTRY_DSN (możesz użyć tych samych wartości).

3.Utwórz model Prisma oparty na danych w plikach JSON
Rozważ następujące zasady:
ID powinny być unikalnymi identyfikatorami każdego typu modelu.
W przypadku Użytkowników (Users) i Gospodarzy (Hosts), nazwa użytkownika (username) powinna również być unikalna (ale nie jest to ID!). Jest to konieczne ze względu na uwierzytelnianie.
Zaimplementuj następujące kolekcje i relacje w modelu Prisma:
Property (Nieruchomość)

amenities[] - (wiele do wielu)
bookings[] (jeden do wielu)
reviews[] (jeden do wielu)
Host (Gospodarz)

listings[] (jeden do wielu) z Property (Nieruchomość)
Zalecamy użycie niejawnych relacji wiele-do-wiele.

Dla Property, cena za noc (pricePerNight) może być zdefiniowana jako liczba dziesiętna z dwiema cyframi po przecinku, w następujący sposób: pricePerNight Decimal @mysql.Decimal(10, 2)

4.
Zainicjuj bazę danych na podstawie modelu
Możesz zainicjować bazę danych na podstawie modelu za pomocą poleceń npx prisma migrate dev lub npx prisma db push. Jeśli to tylko test, zalecamy użycie db push. Jeśli uważasz, że Twój model jest poprawny, migrate dev utworzy plik migracji w Twojej bazie kodu.


5.Zasiej bazę danych
W naszym folderze prisma stwórz plik o nazwie seed.js. W tym pliku będziemy implementować skrypt, który będziemy uruchamiać za pomocą specjalnej komendy dostarczonej przez Prisma. Główną funkcjonalnością tego pliku powinno być wczytanie danych z plików JSON do bazy danych w odpowiedni sposób. Możesz użyć pliku seed.js z API Księgarni jako odniesienie, z następującymi różnicami:
Zalecamy najpierw utworzenie przykładowych danych dla użytkowników i kategorii, a następnie dla wydarzeń.

Kategorie i wydarzenia mają relację wiele do wielu, co należy uwzględnić podczas tworzenia wydarzeń. Proszę, odwołaj się do odpowiedniego przewodnika w celu uzyskania poprawnej składni.

Upewnij się, że polecenie seed jest odpowiednio skonfigurowane w pliku package.json. Możesz sprawdzić swój plik z kodem księgarni lub sprawdzić poniższy fragment kodu.

Uruchom komendę npx prisma db seed, aby załadować dane do swojej bazy danych. Zawsze, gdy chcesz całkowicie zresetować bazę danych do początkowej zawartości (np. po usunięciu lub dodaniu wielu rekordów za pomocą testów), możesz uruchomić komendę npx prisma migrate reset, która resetuje schemat bazy danych do stanu ostatniej migracji, a następnie wykonuje skrypt zasiewu.

6.

/login: POST (Zaloguj użytkownika za pomocą JWT i zwróć token)
/users: GET (Pobierz wszystkich użytkowników i ich informacje), POST (Utwórz nowego użytkownika)
/users/
: GET (Pobierz pojedynczego użytkownika), PUT (Zaktualizuj użytkownika), DELETE (Usuń użytkownika)
Stwórz te same punkty końcowe CRUD API jak opisano w /users i /users
dla gospodarzy, nieruchomości, udogodnień, rezerwacji i recenzji.


7.
Oczywiście, oto odpowiednie kody stanu HTTP dla udanych i nieudanych odpowiedzi:

Udane żądania:
Dla pomyślnych żądań: 200 (OK) dla udanych żądań lub 201 (Created) dla utworzonych zasobów.
Nieudane żądania:
Dla żądań, które nie znalazły zasobów: 404 (Not Found).
Dla błędnych danych uwierzytelniających podczas próby logowania: 401 (Unauthorized).
Dla ogólnych wewnętrznych błędów: 500 (Internal Server Error).

8.
Zaimplementuj middleware uwierzytelniania przy użyciu JWT dla następujących operacji:

POST na trasie /users
PUT, DELETE na trasie /users/
Zaimplementuj uwierzytelnianie dla tych samych tras, co opisano powyżej, dla hostów, nieruchomości, udogodnień, rezerwacji i opinii.

9.
Zaimplementuj parametry zapytania umożliwiające następujące trasy:

# TODO /properties?location=Amsterdam&pricePerNight=88&amenities=Wifi
/bookings?userId=ee4b8bc3-4e54-4e0a-962d-d5a5570db4e7
/users?username=PietVanMolen
/users?email=piet@vanmolen.nl
/hosts?name=Linda+Pollen

Wartości powyżej to przykładowe wartości. Możesz sprawdzić, jakie dane istnieją w bazie danych, wykonując polecenie npx prisma studio.

10.
Zaimplementuj logowanie czasu trwania wszystkich żądań jako middleware do logowania (do faktycznego logowania możesz użyć Winsona, Morgana, Pino lub po prostu console.log, co wolisz).

11.
Złap wszystkie niewyłapane błędy za pomocą middleware obsługującego błędy i odpowiedz JSON-em zawierającym ogólną wiadomość o błędzie (np. "Wystąpił błąd na serwerze, proszę sprawdzić swoje żądanie!"). Upewnij się również, że Twoja aplikacja jest połączona z Sentry.io i wszystkie niewyłapane błędy są tam raportowane.

12.
Przetestuj swoje punkty końcowe, uruchamiając zestaw testów. Najpierw uruchom serwer w folderze, który chcesz przetestować, za pomocą npm run dev (jeśli jeszcze tego nie zrobiłeś). Teraz wykonaj polecenie npm test. Jeśli test nie jest uruchamiany, warto sprawdzić więcej szczegółów na naszej stronie repozytorium. Jeśli uruchamiasz test wielokrotnie, niektóre sprawdzenia, które wcześniej zakończyły się sukcesem, mogą tym razem zawieść, ponieważ niektóre elementy mogły zostać usunięte podczas testowania operacji usuwania. Aby rozwiązać ten problem, wystarczy ponownie uruchomić serwer, a ponownie użyje on oryginalnego zestawu danych.

Tip.


• Nie zapomnij brać regularnych przerw.

• Możesz korzystać z przykładów kodu z poprzednich ćwiczeń i projektów.

• API spełnia właściwości danych opisane w diagramie pokazanym wcześniej, a model jest zaimplementowany za pomocą Prisma. Możesz ponownie wyświetlić model, otwierając poniższy akordeon.

https://learnamp.engine.scorm.com/vault/a53786ad-69d7-444e-be7e-9a80ddb5bb49/r/4/courses/default/89bbfd6e-93c4-4743-b6a1-e96fda60cf80/0/scormcontent/assets/ovT0IS/bookings.png


Model Prisma zawiera następujące kolekcje dla property i host:

Property

amenities[] - (wiele do wielu)
bookings[] (1 do wielu)
reviews[] (1 do wielu)
Host

listings[] (1 do wielu)
API zawiera następujące punkty końcowe z odpowiadającymi im metodami, ścieżkami i opisem:


Usługi używane dla tych punktów końcowych wykorzystują Prisma do operacji CRUD w celu pobierania, modyfikowania lub usuwania danych z bazy danych.

• API zwraca odpowiednie statusy dla udanych odpowiedzi. Użyj kodu stanu 200 dla udanych żądań i 201 dla utworzonych zasobów (żądania POST).

• API zwraca odpowiednie statusy dla nieudanych odpowiedzi. Użyj kodu stanu 404, gdy zasób (id) nie zostanie znaleziony, 401 dla nieprawidłowych danych uwierzytelniających podczas próby logowania i 500 dla ogólnych błędów wewnętrznych.

• API ma middleware uwierzytelniania dla żądań POST na wszystkich ścieżkach (np. /users) oprócz logowania, PUT, DELETE na ścieżkach, które otrzymują parametr id (np. /users/
).

• Uwierzytelnianie jest zaimplementowane za pomocą JWT.

• Zaimplementuj parametry zapytania, które umożliwiają następujące ścieżki końcowe:
/properties?location=Amsterdam&pricePerNight=88&amenities=Wifi
/bookings?userId=ee4b8bc3-4e54-4e0a-962d-d5a5570db4e7
/users?username=PietVanMolen
/users?email=piet@vanmolen.nl
/hosts?name=Linda+Pollen

Powyższe wartości to przykładowe wartości, możesz sprawdzić, jakie dane istnieją w bazie danych, wykonując polecenie npx prisma studio.

• Zaimplementuj obsługę błędów z Sentry.


Notowanko:

Podczas tworzenia aplikacji ważne jest zachowanie najlepszych praktyk programistycznych, w tym odpowiednich konwencji nazewnictwa, stosowanie komentarzy dla klarowności oraz efektywne wykorzystanie funkcji, aby utrzymać kod zgodny z zasadą DRY (Don't Repeat Yourself - Nie Powtarzaj Się).

Przekazywanie projektu kursowego

Kiedy będziesz gotowy, możesz przekazać swój projekt, przesyłając link do GitHuba na następnej stronie.



