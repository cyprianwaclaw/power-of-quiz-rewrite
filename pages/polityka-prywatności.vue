<template>
    <div class="privacy-container">
        <header class="privacy-header">
            <h1>POLITYKA PRYWATNOŚCI</h1>
        </header>

        <section class="privacy-section">
            <h2 @click="toggleSection('intro')" class="section-title">
                CZYM JEST POLITYKA PRYWATNOŚCI?
                <span class="toggle-icon">{{ sections.intro ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.intro" class="section-content">
                <p>Chcielibyśmy zapoznać Cię ze szczegółami przetwarzania przez nas Twoich danych osobowych, aby dać Ci
                    pełną wiedzę i komfort w korzystaniu z naszej strony internetowej.</p>
                <p>W związku z tym, że sami działamy w branży internetowej, wiemy jak ważna jest ochrona Twoich danych
                    osobowych. Dlatego dokładamy szczególnych starań, aby chronić Twoją prywatność i informacje, które nam
                    przekazujesz.</p>
                <p>Starannie dobieramy i stosujemy odpowiednie środki techniczne, w szczególności te o charakterze
                    programistycznym i organizacyjnym, zapewniające ochronę przetwarzanych danych osobowych. Nasza strona
                    używa szyfrowanej transmisji danych (SSL), co zapewnia ochronę identyfikujących Cię danych.</p>
                <p>W naszej Polityce prywatności znajdziesz wszystkie najważniejsze informacje odnośnie przetwarzania przez
                    nas Twoich danych osobowych. Prosimy Cię o jej przeczytanie i obiecujemy, że nie zajmie Ci to więcej niż
                    kilka minut.</p>
            </div>
        </section>

        <section class="privacy-section">
            <h2 @click="toggleSection('administrator')" class="section-title">
                KTO JEST ADMINISTRATOREM STRONY INTERNETOWEJ?
                <span class="toggle-icon">{{ sections.administrator ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.administrator" class="section-content">
                <p>Administratorem strony internetowej jest POWERBOOK MAREK CZANIK, wpisanego do rejestru przedsiębiorców
                    Centralnej Ewidencji i Informacji o Działalności Gospodarczej prowadzonej przez ministra właściwego od
                    spraw gospodarki pod adresem ul. Duchowizna, nr 10A, 05-170 Zakroczym, NIP 5311694728, REGON 364938135
                    (czyli: my).</p>
            </div>
        </section>

        <section class="privacy-section">
            <h2 @click="toggleSection('data')" class="section-title">
                DANE OSOBOWE
                <span class="toggle-icon">{{ sections.data ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.data" class="section-content">
                <h3>Jaki akt prawny reguluje przetwarzanie Twoich danych osobowych?</h3>
                <p>Twoje dane osobowe są przez nas zbierane i przetwarzane zgodnie z przepisami Rozporządzenia Parlamentu
                    Europejskiego i Rady (UE) 2016/679 z 27.04.2016 r. w sprawie ochrony osób fizycznych w związku z
                    przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy
                    95/46/WE (ogólne rozporządzenie o ochronie danych) (Dz.Urz. UE L 119, s. 1), zwanego powszechnie: RODO.
                    W zakresie nieuregulowanym przez RODO przetwarzanie danych osobowych jest regulowane przez Ustawę o
                    ochronie danych osobowych z dnia 10 maja 2018 r.</p>

                <h3>Kto jest administratorem Twoich danych osobowych?</h3>
                <p>Administratorem Twoich danych osobowych jest POWERBOOK MAREK CZANIK, wpisanego do rejestru
                    przedsiębiorców Centralnej Ewidencji i Informacji o Działalności Gospodarczej prowadzonej przez ministra
                    właściwego od spraw gospodarki pod adresem ul. Duchowizna, nr 10A, 05-170 Zakroczym, NIP 5311694728,
                    REGON 364938135.</p>
                <p>W sprawie swoich danych osobowych możesz skontaktować się z nami za pomocą:</p>
                <ul>
                    <li>poczty elektronicznej: marocz@o2.pl,</li>
                    <li>poczty tradycyjnej: 05-170 Zakroczym ul. Duchowizna 10a,</li>
                    <li>telefonu: + 48 531 088 461.</li>
                </ul>

                <h3>JAK PRZETWARZAMY TWOJE DANE OSOBOWE, KTÓRE NAM PODAJESZ?</h3>
                <h4>Jakie dane osobowe przetwarzamy i w jakich celach je przetwarzamy?</h4>
                <p>Na naszej stronie internetowej oferujemy Ci wiele różnych usług, dla których celów przetwarzamy różne
                    dane osobowe, w oparciu o różne podstawy prawne.</p>

                <h4>Dobrowolność podania danych osobowych</h4>
                <p>Podanie przez Ciebie wymaganych danych osobowych jest dobrowolne ale stanowi warunek świadczenia przez
                    nas usług na Twoją rzecz (np. wysyłania newslettera czy założenia konta).</p>

                <h4>Odbiorcy danych osobowych</h4>
                <p>Aktualną listę podmiotów, którym ujawniamy Twoje dane osobowe możesz znaleźć tutaj.</p>

                <h4>Zautomatyzowane podejmowanie decyzji (w tym profilowanie)</h4>
                <p>Nie podejmujemy wobec Ciebie decyzji w sposób zautomatyzowany ani nie stosujemy profilowania.</p>

                <h4>Czy będziemy przekazywać Twoje dane osobowe poza EOG lub do organizacji międzynarodowej?</h4>
                <p>Nie przekazujemy Twoich danych poza Europejski Obszar Gospodarczy ani do organizacji międzynarodowej.</p>
            </div>
        </section>

        <section class="privacy-section">
            <h2 @click="toggleSection('rights')" class="section-title">
                JAKIE PRZYSŁUGUJĄ CI PRAWA W ZWIĄZKU Z PRZETWARZANIEM PRZEZ NAS TWOICH DANYCH OSOBOWYCH?
                <span class="toggle-icon">{{ sections.rights ? '−' : '+' }}</span>
            </h2>
            <div v-if="sections.rights" class="section-content">
                <p>Na podstawie RODO masz prawo do:</p>
                <ul>
                    <li>żądania dostępu do swoich danych osobowych,</li>
                    <li>żądania sprostowania swoich danych osobowych,</li>
                    <li>żądania usunięcia swoich danych osobowych,</li>
                    <li>żądania ograniczenia przetwarzania danych osobowych,</li>
                    <li>wniesienia sprzeciwu wobec przetwarzania danych osobowych,</li>
                    <li>żądania przenoszenia danych osobowych.</li>
                </ul>
                <p>W razie zgłoszenia nam któregokolwiek z wymienionych powyższej żądań bez zbędnej zwłoki – a w każdym
                    razie w terminie miesiąca od otrzymania żądania – udzielimy Ci informacji o działaniach podjętych w
                    związku ze zgłoszonym przez Ciebie żądaniem.</p>
                <p>W razie potrzeby możemy wydłużyć termin miesięczny o kolejne dwa miesiące z uwagi na skomplikowany
                    charakter żądania lub liczbę żądań.</p>
                <p>W każdym wypadku poinformujemy Ciebie w terminie miesiąca od otrzymania żądania o przedłużeniu terminu i
                    podamy Tobie przyczyny opóźnienia.</p>

                <h3>Prawo dostępu do danych osobowych (art. 15 RODO)</h3>
                <p>Masz prawo uzyskania informacji czy przetwarzamy Twoje dane osobowe. Jeżeli przetwarzamy Twoje dane
                    osobowe to masz prawo do:</p>
                <ul>
                    <li>dostępu do danych osobowych,</li>
                    <li>uzyskania informacji o celach przetwarzania, kategoriach przetwarzanych danych osobowych, o
                        odbiorcach lub kategoriach odbiorców tych danych, planowanym okresie przechowywania Twoich danych
                        lub o kryteriach ustalania tego okresu, o prawach przysługujących Ci na mocy RODO oraz o prawie
                        wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, o źródle tych danych, o
                        zautomatyzowanym podejmowaniu decyzji, w tym o profilowaniu oraz o zabezpieczeniach stosowanych w
                        związku z przekazaniem tych danych poza Unię Europejską;</li>
                    <li>uzyskania kopii swoich danych osobowych.</li>
                </ul>
                <p>Jeśli chcesz zażądać dostępu do swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a></p>

                <h3>Prawo do sprostowania danych osobowych (art. 16 RODO)</h3>
                <p>Jeżeli Twoje dane osobowe są nieprawidłowe masz prawo żądania od nas niezwłocznego sprostowania Twoich
                    danych osobowych. Masz też prawo do żądania uzupełnienia przez nas Twoich danych osobowych. Jeśli chcesz
                    zażądać sprostowania lub uzupełnienia swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a>.</p>

                <h3>Prawo do usunięcia danych osobowych, tzw. "prawo do bycia zapomnianym" (art. 17 RODO)</h3>
                <p>Masz prawo żądania usunięcia swoich danych osobowych, gdy:</p>
                <ul>
                    <li>Twoje dane osobowe przestały być niezbędne do celów, dla których zostały zebrane lub w inny sposób
                        przetwarzane;</li>
                    <li>wycofałeś określoną zgodę, w zakresie w jakim dane osobowe były przetwarzane w oparciu o Twoją
                        zgodę;</li>
                    <li>Twoje dane osobowe były przetwarzane niezgodnie z prawem;</li>
                    <li>wniosłeś/wniosłaś sprzeciw wobec przetwarzania Twoich danych osobowych na potrzeby marketingu
                        bezpośredniego, w tym profilowania, w zakresie w jakim przetwarzanie danych osobowych jest związane
                        z marketingiem bezpośrednim;</li>
                    <li>wniosłeś/wniosłaś sprzeciw wobec przetwarzania Twoich danych osobowych w związku z przetwarzaniem
                        niezbędnym dla wykonania zadania realizowanego w interesie publicznym lub przetwarzania niezbędnego
                        dla celów wynikających z prawnie uzasadnionych interesów realizowanych przez nas lub stronę trzecią.
                    </li>
                </ul>
                <p>Pomimo zgłoszenia żądania usunięcia danych osobowych możemy przetwarzać Twoje dane dalej w celu
                    ustalenia, dochodzenia lub obrony roszczeń o czym zostaniesz poinformowany/poinformowana.</p>
                <p>Jeśli chcesz zażądać usunięcia swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a>.</p>

                <h3>Prawo do zgłoszenia żądania ograniczenia przetwarzania danych osobowych (art. 18 RODO)</h3>
                <p>Masz prawo do żądania ograniczenia przetwarzania Twoich danych osobowych, gdy:</p>
                <ul>
                    <li>kwestionujesz prawidłowość swoich danych osobowych – w takim wypadku ograniczymy przetwarzanie
                        Twoich danych osobowych na czas pozwalający sprawdzić prawidłowość tych danych;</li>
                    <li>przetwarzanie Twoich danych jest niezgodne z prawem, a zamiast usunięcia danych osobowych zażądasz
                        ograniczenia przetwarzania Twoich danych osobowych;</li>
                    <li>Twoje dane osobowe przestały być potrzebne do celów przetwarzania, ale są one potrzebne w celu
                        ustalenia, dochodzenia lub obrony Twoich roszczeń;</li>
                    <li>zgłosiłeś/zgłosiłaś sprzeciw wobec przetwarzania Twoich danych osobowych – do czasu stwierdzenia czy
                        nasze prawnie uzasadnione interesy są nadrzędne wobec podstaw wskazanych w Twoim sprzeciwie.</li>
                </ul>
                <p>Jeśli chcesz zażądać ograniczenia przetwarzania swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a></p>

                <h3>Prawo do sprzeciwu wobec przetwarzania danych osobowych (art. 21 RODO)</h3>
                <p>Masz prawo w dowolnym momencie wnieść sprzeciw wobec przetwarzania Twoich danych osobowych, w tym
                    profilowania, w związku z:</p>
                <ul>
                    <li>przetwarzaniem niezbędnym dla wykonania zadania realizowanego w interesie publicznym lub
                        przetwarzania niezbędnego dla celów wynikających z prawnie uzasadnionych interesów realizowanych
                        przez Administratora danych osobowych lub stronę trzecią;</li>
                    <li>przetwarzaniem na potrzeby marketingu bezpośredniego.</li>
                </ul>
                <p>Jeśli chcesz zagłosić sprzeciw wobec przetwarzania Twoich danych osobowych zgłoś swoje żądanie na adres:
                    <a href="mailto:marocz@o2.pl">marocz@o2.pl</a>.</p>

                <h3>Prawo do żądania przenoszenia danych osobowych (art. 20 RODO)</h3>
                <p>Masz prawo otrzymać od nas swoje dane osobowe w ustrukturyzowanym, powszechnie używanym formacie
                    nadającym się do odczytu maszynowego oraz przesłać je innemu administratorowi danych osobowych.</p>
                <p>Standardowo udostępnimy Ci Twoje dane osobowe w formacie CSV. Jeśli wolisz aby dane zostały Ci
                    udostępnione w innym formacie wskaż preferowany format w swoim żądaniu. W miarę możliwości postaramy się
                    udostępnić Ci dane w preferowanym przez Ciebie formacie.</p>
                <p>Możesz również zażądać, abyśmy przesłali Twoje dane osobowe bezpośrednio innemu administratorowi (o ile
                    jest to technicznie możliwe).</p>
                <p>Jeśli chcesz zażądać przeniesienia swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a>.</p>

                <h3>Czy możesz cofnąć wyrażoną zgodę na przetwarzanie danych osobowych?</h3>
                <p>Możesz cofnąć udzieloną zgodę na przetwarzanie swoich danych osobowych w dowolnym momencie. Cofnięcie
                    zgody na przetwarzanie danych osobowych nie ma wpływu na zgodność z prawem przetwarzania dokonanego
                    przez nas na podstawie Twojej zgody przed jej cofnięciem.</p>
                <p>Jeśli chcesz cofnąć zgodę na przetwarzanie swoich danych osobowych zgłoś swoje żądanie na adres: <a
                        href="mailto:info@powerbook.pl">info@powerbook.pl</a>.</p>
                <p>W przypadku, gdy chcesz cofnąć zgodę na przetwarzanie danych osobowych w celu świadczenia usługi
                    "Newsletter" możesz z niego zrezygnować pisząc do administratora strony na e-mail <a
                        href="mailto:marocz@o2.pl">marocz@o2.pl</a></p>

                <h3>Skarga do organu nadzorczego</h3>
                <p>Jeżeli sądzisz, że przetwarzanie Twoich danych osobowych narusza przepisy ochrony danych osobowych masz
                    prawo złożenia skargi do organu nadzorczego, w szczególności w państwie członkowskim swojego zwykłego
                    pobytu, swojego miejsca pracy lub miejsca popełnienia domniemanego naruszenia.</p>
                <p>W Polsce organem nadzorczym w rozumieniu RODO jest Prezes Urzędu Ochrony Danych Osobowych, który z dniem
                    25 maja 2018 roku zastąpił GIODO.</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PrivacyPolicyPage',
    data() {
        return {
            sections: {
                intro: true,
                administrator: false,
                data: false,
                rights: false
            }
        }
    },
    methods: {
        toggleSection(section) {
            this.sections[section] = !this.sections[section]
        },
        printPrivacyPolicy() {
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
.privacy-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.privacy-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}

.privacy-section {
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

.section-content h3 {
    margin-top: 20px;
    color: #2c3e50;
}

.section-content h4 {
    margin-top: 15px;
    color: #2c3e50;
}

ul {
    padding-left: 20px;
}

li {
    margin-bottom: 8px;
}

.privacy-footer {
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

    .privacy-header,
    .privacy-section {
        break-inside: avoid;
    }

    .print-button,
    .download-button {
        display: none;
    }
}

@media (max-width: 768px) {
    .section-content {
        padding: 10px;
    }

    .section-title {
        font-size: 1.1em;
    }
}</style>