# Notes for reviewers

## How to start appliacation

U CMD otvorite folder projekta. Zatim pokrenite komandu 'npm start'.
Podrazumeva se da imate instaliran NPM.

Za pokretanje gotovog build-a iskopirajte sve fajlove i foldere u odredjeni folder na vasem hostingu. Aplikaciju pokrecete sa url adresom koja vodi na index.html u tom folderu. Taj folder treba da bude domain ili subdomain rutu. U Protivnom su potrebne manje prepravke putanja u file index.html.

## How to make new build
U CMD otvorite folder projekta. Zatim pokrenite komandu 'npm run build'.
Prethodno bi trebalo obrisati folder build ukoliko postoji.

Vise uputsava na: https://create-react-app.dev/docs/deployment/


## Explaining the choices

voideci princip za aplikaciju sam izabrao da bude sto jednostavnije moguce i da sto vise resenja izradim sam, bez biblioteka, modula i gotovih komponenti, da bih prikazao svoje razumevanje. izuzetak je date range modul koji je kompleksan zbog samog baratanja datumima i iziskivao bi previse vremena.

### Technologies

Sustina aplikacije je u React + Redux tehnologija i principi programiranja koje oni promovisu. Kao neophodne module korisceni su react,redux, react-redux.

Modul redux-thunk iako nije neophodan u ovom slucaju, odlucio sam se za njega jer je minimalisticki i ne prekida uobicajan patern dispatchovanja akcija pomocu poziva action creatora funckcija. 

### Ajax simulator
S obzirom da je za potrebe zadatka bilo potrebno upotrebiti frontend vestine, "pravi" backend naravno nismo implementirali. Medjutim, rad sa backenedom je maksimalno simuliran. Umesto pravih ajax poziva, izradio sam ajax simulator(/utils/ajax-simulator-utils.js) koji u potpunosti oponasa rad sa ajaxom. vraca promise (isto kao npr axios or fetch) i resoluje ga nakom odredjenog vremenskog perioda (u nasem slucaju 1 sec). Tako da imamo priliku koristimo asinhrone akcije, spinnere dok cekamo na podatke. Aplikacija je spremna da se uz najmanje moguce prepravke radi sa pravim backendom.

### Search feature
Ovu recenicu "The user can search the entries for a specific person with type ahead" sam ja razumeo da to treba da pretrazuje nakon svakog ukucanog simbola u search pretragu(bez potrebe da se klikne na nekakav taster search) i da rezultate prikazuje uzivo bez potrebe da se otvara nova stranica. 

Rezultati pretrage nisu prava pretraga (posto nemamo API za pretragu) nego uvek dobijemo sve rezultate od ajax simulatora. A search i date range funkcionisu kao filteri koji suzavaju broj itema za prikazivanje. ovo je smesteno u /utils/filter-utils.js.

### Grupisanje
"The user can group the list of “meetings” by date or person" - Ovde sam pravio svoje resenje koje mozda nespretnije od gotovih resenja koje to rade, ali je bilo neophodno zbog netipicnog resenja za odredjivanje kljuca za person. Posto ne radimo sa bazom, person ne dodejuju idove, koristio sam zbir imena i prezimena kao kljuc. 

### Geo Location
"Using a geo location API the user can add the location where he/she met that person" - konkretan geo loc api nije specifiran. Trazenjem tog pojma sam nasao apije koji funkcionisu unutar native aplikacija, browser extenzija i oni sluze da preuzmu lokaciju od gps senzora u uredjaj, tako da nisam nasao prikladno resesnje da korisnik izabere lokaciju na kojoj je nekoga sreo osobu. Umesto toga odlucio sam se za navigator metode ( /utils/geo-utils.js ) koje su ugradjene u browser sa kojima mozemo da dobijemo lokaciju na kojoj se trenutno nalazi browser. Takodje su dostupna polja lat./long. gde mozemo ukucati i druge koordinate. 

### Date range

"The user can define a date range and will get all the persons they have met" - Imam prethodna iskustva sa radom sa datumima i kalendarima i koja mi govore da je to kompleksna stvar, ima puno posla i detalja i prakticno se moraju koristiti neka od gotovih kompleksnijih resenja. Izabrao sam react-date-range modul ako picker za datume i date ranges. izvan toga sam se trudio da maksimalno koristim cist javascript za baratanjne datumima. Npr. resenja za validaciju datuma se mogu videtu u <MeetingForm> komponenti u metodu _validate.

### Add people form
"The user cann add people that he/she met at a specific day" - forma je dizajnirana minimalisticki uz minimalni broj css pravila da nalikuje na "materijal dizajn". Za two-way binding izmedju stata i forme koristimo preporuceno univerzalno resenje sa reactjs.org. imamo jednostavan validator sa feedbackom gresaka u samoj formi, uslovni submit, toasts prikazujemo kao feedback za uspesan submit.

### Modal & Toast 
Tamo gde je upotreba bila prikladna ubacio sam sopstvena, jednostavna i minimilisticka resenja za prikaz Modala i Toasta.  
Toasts funkcionisu na sledeci nacin: njihov nosac kroz container je prakticno nevidljiv i ne kvari layout. A sam modeal i toast element su prikazani i animirani u theme cssa i minimalnih intervencia u react statu. To je takodje jednostavna demonstracija primene animiacija i animiranih komp u reactu



## Progresive Web App
Aplikacija je spremna da radi i kao PWA. Jedan od uslova je da bude hostovana na https protokolu, sto ne zavisi od mene. Naravno da bi pwa imalo smisla, to bi trebalo da ima i backend. Mi naravno nemamo backend ali je sve ostalo u aplikaciji podeseno da demonstrira i te vestine.  

