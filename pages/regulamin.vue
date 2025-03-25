<template>
    <div class="regulations-container">
        <header class="regulations-header">
            <h1>REGULAMIN SERWISU INTERNETOWEGO</h1>
        </header>

        <section class="regulation-section">
            <h2 @click="toggleSection('general')" class="section-title">
                I. POSTANOWIENIA OGÓLNE
                <span class="toggle-icon">{{ sections.general ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.general" class="section-content">
                <p>Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia Usług drogą elektroniczną a
                    także sposób składania Zamówienia za pośrednictwem serwisu internetowego www.powerbook.pl (zwanego
                    dalej: „Serwisem Internetowym” lub „Serwisem”).</p>
                <p>Serwis prowadzony jest przez Mirosława Czanik, prowadzącego działalność gospodarczą pod firmą POWERBOOK
                    MAREK CZANIK, wpisanego do rejestru przedsiębiorców Centralnej Ewidencji i Informacji o Działalności
                    Gospodarczej prowadzonej przez ministra właściwego od spraw gospodarki pod adresem ul. Duchowizna, nr
                    10A, 05-170 Zakroczym, NIP 5311694728, REGON 364938135, zwanym dalej „Usługodawcą”.</p>
                <p>Serwis ma charakter informacyjny, edukacyjny i szkoleniowy. Jego społeczność tworzą przede wszystkim
                    osoby o zbliżonych poglądach, pomysłach, które przy wykorzystaniu forum Serwisu udostępnionego przez
                    Usługodawcę tworzą i rozwijają grupy zbieżne z ich zainteresowaniami. Ponadto Użytkownicy Serwisu mają
                    możliwość pozyskania inwestora na sfinansowanie swojego pomysłu. Do części serwisu należy Grupa
                    Powerbook, przeznaczona do tworzenia grup przez uczniów i studentów oraz Samorządy Powerbook ułatwiające
                    komunikację samorządów szkół z osobami tworzącymi społeczność Serwisu Powerbook.</p>
                <p>Kontakt z Usługodawcą odbywa się:</p>
                <ul>
                    <li>za pośrednictwem poczty elektronicznej pod adresem Usługodawcy: marocz@o2.pl,</li>
                    <li>telefonicznie pod numerem: +48 531 088 461,</li>
                </ul>
                <p>Niniejszy Regulamin jest nieprzerwanie i nieodpłatnie udostępniony przez Usługodawcę w witrynie
                    internetowej www.powerbook.pl, w sposób umożliwiający Użytkownikom jego pozyskanie, odtwarzanie i
                    utrwalanie jego treści poprzez wydrukowanie lub zapisanie na nośniku w każdej chwili za pomocą systemu
                    informatycznego, którym posługuje się Użytkownik.</p>
                <p>Wszelkie prawa do Serwisu Internetowego, w tym majątkowe prawa autorskie, prawa własności intelektualnej
                    do jego nazwy, domeny internetowej, strony internetowej Serwisu, a także do formularzy oraz logotypów
                    należą do Usługodawcy, a korzystanie z nich może następować wyłącznie w sposób określony i zgodny z
                    Regulaminem.</p>
                <p>Usługodawca zastrzega sobie prawo do zamieszczania na stronie internetowej Serwisu treści reklamowych
                    dotyczących oferowanych Usług, jak i towarów i usług osób trzecich, w formach stosowanych w sieci
                    Internet. Korzystanie z takich ofert lub usług nie jest elementem Serwisu, a ich zasady określają
                    odpowiednie podmioty trzecie.</p>
                <p>Usługodawca informuje, że korzystanie z Usług świadczonych drogą elektroniczną może wiązać się z
                    zagrożeniem po stronie każdego Użytkownika sieci Internet, polegającym na możliwości wprowadzenia do
                    systemu teleinformatycznego Użytkownika szkodliwego oprogramowania oraz pozyskania i modyfikacji jego
                    danych przez osoby nieuprawnione. Aby uniknąć ryzyka wystąpienia zagrożeń Użytkownik powinien stosować
                    właściwe środki techniczne, które zminimalizują ich wystąpienie, w szczególności programy antywirusowe i
                    zaporę sieciową typu firewall.</p>
                <p>Zasady świadczenia w ramach Serwisu innych Usług, w tym Usług płatnych, mogą określać dodatkowe
                    regulaminy.</p>
            </div>
        </section>

        <section class="regulation-section">
            <h2 @click="toggleSection('definitions')" class="section-title">
                II. DEFINICJE
                <span class="toggle-icon">{{ sections.definitions ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.definitions" class="section-content">
                <p>Pojęcia użyte w niniejszym dokumencie mają następujące znaczenie:</p>
                <dl>
                    <dt>Użytkownik</dt>
                    <dd>– osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba fizyczna prowadząca
                        działalność gospodarczą, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej,
                        która może korzystać z Usług dostępnych w Serwisie;</dd>

                    <dt>Konsument</dt>
                    <dd>- Użytkownik będący konsumentem w rozumieniu art. 22[1] Kodeksu cywilnego;</dd>

                    <dt>Przedsiębiorca</dt>
                    <dd>– Użytkownik będący przedsiębiorcą w rozumieniu art. 43[1] Kodeksu cywilnego;</dd>

                    <dt>Usługi</dt>
                    <dd>– usługi świadczone przez Usługodawcę na rzecz Użytkowników drogą elektroniczną w rozumieniu
                        przepisów ustawy z dnia 18 lipca 2002 roku o świadczeniu usług drogą elektroniczną (Dz.U. nr 144,
                        poz. 1204 ze zm.);</dd>

                    <dt>Umowa o świadczenie Usług/Umowa</dt>
                    <dd>– Umowa o świadczenie Usług drogą elektroniczną w rozumieniu Ustawy o świadczeniu Usług drogą
                        elektroniczną, zawierana w Serwisie pomiędzy Usługodawcą a Użytkownikiem;</dd>

                    <dt>Dni robocze</dt>
                    <dd>– są to dni od poniedziałku do piątku z wyłączeniem dni ustawowo wolnych od pracy;</dd>

                    <dt>Subskrypcja</dt>
                    <dd>– odpłatny zestaw usług świadczonych przez Usługodawcę, polegających w szczególności na umożliwienie
                        Użytkownikowi dostępu do treści Serwisu, które nie mają charakteru ogólnodostępnego. Szczegółowy
                        zakres usług wchodzących w skład poszczególnych Subskrypcji wskazany jest na stronie internetowej
                        Serwisu;</dd>

                    <dt>Konto</dt>
                    <dd>- przydzielona danemu Użytkownikowi część Serwisu, w której przechowywane są jego dane osobowe oraz
                        informacje o zrealizowanych Usługach lub będących w trakcie realizacji, a także wykupionych
                        Subskrypcjach;</dd>

                    <dt>Grupa Powerbook</dt>
                    <dd>– przestrzeń udostępniona przez Usługodawcę dostępna pod adresem www.grupy.powerbook.pl,
                        umożliwiająca tworzenie grup przez uczniów i studentów, dzięki którym komunikacja pomiędzy nimi
                        staje się łatwiejsza.</dd>

                    <dt>Samorządy Powerbook</dt>
                    <dd>– przestrzeń udostępniona przez Usługodawcę dostępna pod adresem www.samorzady.powerbook.pl,
                        ułatwiająca komunikację pomiędzy samorządami szkół a użytkownikami Serwisu Powerbook.</dd>

                    <dt>Rejestracja</dt>
                    <dd>– jednorazowa czynność polegająca na założeniu Konta w Serwisie na zasadach wskazanych w niniejszym
                        Regulaminie;</dd>

                    <dt>Ustawa o prawach konsumenta</dt>
                    <dd>– ustawa z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014, poz. 827);</dd>

                    <dt>Ustawa o świadczeniu usług drogą elektroniczną</dt>
                    <dd>– ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz.U. 2002 nr 144, poz.
                        1204 ze zm.);</dd>

                    <dt>Kodeks cywilny</dt>
                    <dd>– ustawa z dnia 23 kwietnia 1964 r. (Dz.U. 1964 nr 16, poz. 93 ze zm.);</dd>

                    <dt>Regulamin</dt>
                    <dd>– niniejszy dokument;</dd>

                    <dt>Zamówienie</dt>
                    <dd>– oświadczenie woli Użytkownika, zmierzające bezpośrednio do zawarcia Umowy o świadczenie usług w
                        ramach Subskrypcji wybranego przez Użytkownika.</dd>
                </dl>
            </div>
        </section>

        <!-- Sekcje III-X można dodać w podobny sposób -->
        <!-- Dla zachowania przejrzystości kodu pomijam je tutaj, ale w pełnej implementacji powinny być uwzględnione -->

        <section class="regulation-section">
            <h2 @click="toggleSection('final')" class="section-title">
                X. POSTANOWIENIA KOŃCOWE
                <span class="toggle-icon">{{ sections.final ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.final" class="section-content">
                <p>Regulamin jest dostępny w języku polskim.</p>
                <p>Powielanie lub rozpowszechnianie niniejszego Regulaminu lub jego części bez pisemnej zgody Usługodawcy
                    jest zabronione.</p>
                <p>Zawarte w niniejszym Regulaminie zapisy dotyczące Konsumenta, w przedmiocie odstąpienia od umowy oraz
                    reklamacji, stosuje się do osoby fizycznej zawierającej umowę bezpośrednio związaną z jej działalnością
                    gospodarczą, gdy z treści tej umowy wynika, że nie posiada ona dla tej osoby charakteru zawodowego,
                    wynikającego w szczególności z przedmiotu wykonywanej przez nią działalności gospodarczej,
                    udostępnionego na podstawie przepisów o Centralnej Ewidencji i Informacji o Działalności Gospodarczej.
                    Nie stosuje się zapisów o pozasądowych sposobach rozstrzygania reklamacji i dochodzenia roszczeń.</p>
                <p>O ile bezwzględnie obowiązujące przepisy prawa nie stanowią inaczej, prawem właściwym dla rozstrzygania
                    wszelkich sporów powstałych na gruncie niniejszego Regulaminu jest prawo polskie. Wszelkie spory
                    powstałe na gruncie niniejszego Regulaminu, w przypadku, gdy drugą stroną jest nie jest Konsument, będą
                    rozwiązywane przed sądem powszechnym właściwym ze względu na siedzibę Usługodawcy.</p>
                <p>W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie przepisy Kodeksu cywilnego,
                    przepisy Ustawy o świadczeniu usług drogą elektroniczną, przepisy Ustawy o prawach konsumenta oraz inne
                    właściwe przepisy prawa polskiego.</p>
                <p>Treść niniejszego Regulaminu może ulec zmianie. O wszelkich zmianach każdy Użytkownik będący Konsumentem
                    zostanie poinformowany poprzez informacje na stronie głównej Serwisu zawierającej zestawienie zmian i
                    termin ich wejścia w życie. Termin wejścia w życie zmian nie będzie krótszy niż 14 dni od dnia ich
                    ogłoszenia.</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'RegulationsPage',
    data() {
        return {
            sections: {
                general: true,
                definitions: false,
                rules: false,
                services: false,
                account: false,
                order: false,
                rights: false,
                intellectual: false,
                complaints: false,
                privacy: false,
                final: false
            }
        }
    },
    methods: {
        toggleSection(section) {
            this.sections[section] = !this.sections[section]
        },
        printRegulations() {
            window.print()
        },
        downloadPDF() {
            // Tutaj można dodać logikę generowania i pobierania PDF
            alert('Funkcja pobierania PDF będzie dostępna wkrótce.')
        }
    }
}
</script>

<style scoped>
.regulations-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.regulations-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}

.regulation-section {
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
}

.section-title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2c3e50;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.section-title:hover {
    background-color: #e9ecef;
}

.toggle-icon {
    font-weight: bold;
    font-size: 1.2em;
}

.section-content {
    padding: 15px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
}

dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 10px 20px;
}

dt {
    font-weight: bold;
    grid-column: 1;
}

dd {
    grid-column: 2;
    margin: 0;
}

.regulations-footer {
    margin-top: 40px;
    text-align: center;
    padding-top: 20px;
    border-top: 2px solid #eee;
}

.print-button,
.download-button {
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.print-button:hover,
.download-button:hover {
    background-color: #2980b9;
}

@media print {

    .regulations-header,
    .regulation-section {
        break-inside: avoid;
    }

    .print-button,
    .download-button {
        display: none;
    }
}

@media (max-width: 768px) {
    dl {
        grid-template-columns: 1fr;
    }

    dt,
    dd {
        grid-column: 1;
    }

    dt {
        margin-top: 10px;
    }
}</style>