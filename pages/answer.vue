<script setup>
import { ref } from 'vue'

const schoolQuestion = ref([
	{
		question: "W jakiej formie odbywa się nauka?",
		answer: `TCM czyli Tradycyjna Medycyna Chińska to styl medycyny tradycyjnej, który wywodzi się z ponad 2500-letniej chińskiej tradycji praktyk medycznych. Obejmuje różne formy leczenia np.: akupunkturę, masaże, terapię dietetyczną czy medycynę ziołową `
	}
	,
	{
		question: "Czy jest jakaś grupa dla kursantów?",
		answer: `Hybrydowo. Widza teoretyczna przekazywana jest podczas webinarów on-line natomiast zajęcia praktyczne odbywają się w siedzibie Instytutu przy ul. Tynieckiej 82 w Krakowie `
	}
	,
	{
		question: "Czy wystawiacie faktury?",
		answer: `Oczywiście! Prosimy o podanie danych do faktury podczas zapisu do Szkoły (lub późniejsze przesłanie ich drogą mailową na adres ksiegowosc@itcmkrakow.pl)`
	}
	,
	{
		question: "Co to jest TCM? ",
		answer: `TCM czyli Tradycyjna Medycyna Chińska to styl medycyny tradycyjnej, który wywodzi się z ponad 2500-letniej chińskiej tradycji praktyk medycznych. Obejmuje różne formy leczenia np.: akupunkturę, masaże, terapię dietetyczną czy medycynę ziołową `
	}
	, {
		question: "Czy mogę skorzystać z dofinansowań do szkoły?",
		answer: `Informację o dofinanowaniach są dostępne pod <a href="https://itcmkrakow.pl/kursy/dofinansowanie/" class="faq-link">TYM LINKIEM</a>. Jeśli masz już przyznane dofinanowanie i potrzebujesz pomocy z dokumentami do Urzędu Pracy napisz do nas na adres ksiegowosc@itcmkrakow.pl`
	}
	,
	{
		question: "Czy po zakończeniu szkoły otrzymam certyfikat? ",
		answer: `Tak, po ukończeniu szkoły studenci otrzymują certyfikat potwierdzający ich praktyczne umiejętności oraz nadający im kwalifikację zawodu`
	}
	,
	{
		question: "Kto prowadzi zajęcia?",
		answer: `Nasi wykładowcy to doświadczeni specjaliści z dziedziny medycyny chińskiej w tym lekarze, terapeuci, akupunkturzyści czy naturopaci z wieloletnim doświadczeniem. Pełną listę wykładowców znajdziesz pod <a href="https://itcmkrakow.pl/kursy/wykladowcy/" class="faq-link">TYM LINKIEM</a>`
	}
	,
	{
		question: "Jakie hotele/noclegi polecacie w okolicy?",
		answer: `Vanilla Apart Hotel - <a href="https://aparthotelvanilla.pl" class="faq-link">LINK</a><br>  
Hotel Panorama - <a href="https://hotel-panorama.pl" class="faq-link">LINK</a><br>
Hotel Sympozjum - <a href="https://www.sympozjum.com.pl" class="faq-link">LINK</a><br>
Hotel Campanile - <a href=" https://krakow-south.campanile.com/pl" class="faq-link">LINK</a>
`
	}
	, {
		question: "Czy na miejscu jest możliwość płatności kartą/blikiem?",
		answer: `Za zakupy w bufecie możesz zapłacić tylko i wyłącznie gotówką. Jeśli chcesz opłacić pozostałą kwotę za szkołe to przyjmujemy płatność tylko gotówką w sekretariacie (1 piętro)
`,
	}
	,
	{
		question: "Czy mogę otrzymać dyplom w języku angielskim?",
		answer: "Tak, w tym celu napisz do nas e-mail na sekretariat@itcmkrakow.pl",
	}
])
const firstQuestion = ref([
	{
		question: "Co to jest TCM?",
		answer: `TCM czyli Tradycyjna Medycyna Chińska to styl medycyny tradycyjnej, który wywodzi się z ponad 2500-letniej chińskiej tradycji praktyk medycznych. Obejmuje różne formy leczenia np.: akupunkturę, masaże, terapię dietetyczną czy medycynę ziołową`
	},
	{
		question: "Jakie pomoce naukowe otrzymam po kursie?",
		answer: `Oferujemy uczestnikom naszych szkoleń dostęp do materiałów z kursu. Po zakończeniu szkolenia wysyłamy wiadomość e-mail z linkiem do platformy, na której znajdują się wszystkie niezbędne pomoce naukowe do przyswojenia wiedzy. Dostęp do mariałów nadawany jest na okres 30 dni`
	},
	{
		question: "Jak mogę skorzystać z dofinansowania?",
		answer: `Istnieje możliwość uzyskania dofinansowania na kurs z Urzędu Pracy lub Bazy Usług Rozwojowych. Więcej informacji na temat dofinansowań znajdziesz pod TYM LINKIEM. Jeśli chcesz ubiegać się o dofinansowanie, prosimy o kontakt pod adresem ksiegowosc@itcmkrakow.pl lub numerem telefonu 000-000-000`
	}
])
const faqData = ref([
	{
		question: "Co jeśli zapiszę się w trakcie trwania cyklu?",
		answer: `Wszystkie nagrania oraz prezentacje są udostępniane na naszej platformie LINK. Aby je znaleźć, wystarczy przejść do sekcji „Moje produkty” wybrać kurs a następnia lekcje lub zagadnienie, które nas interesuje. Tam znajdziesz wszystkie odbyte już wydarzenia z cyklu`,
		tryb: "Cykl webinarów",
	},
	{
		question: "Czy musze od razu zapłacić całą kwotę?",
		answer: `Nie, jeśli kwota jest większa niż 1000zł. Na początek można wpłacić zadatek, a resztę uregulować przelewem (po wykonaniu przelewu prosimy o przesłanie nam potwierdzenia na maila: ksiegowosc@itcmkrakow.pl) lub zapłacić gotówką na miejscu. Istnieje również możliwość rozłożenia płatności na raty – dostępne opcje to 1, 3, 4, 8, 12 lub 24 raty. Płatności ratalne realizujemy za pośrednictwem firmy MeriRaty`,
		tryb: "Hybrydowe",
	},
	{
		question: "Czy musze od razu zapłacić całą kwotę?",
		answer: `Nie, jeśli kwota jest większa niż 1000zł. Na początek można wpłacić zadatek, a resztę uregulować przelewem (po wykonaniu przelewu prosimy o przesłanie nam potwierdzenia na maila: ksiegowosc@itcmkrakow.pl) lub zapłacić gotówką na miejscu. Istnieje również możliwość rozłożenia płatności na raty – dostępne opcje to 1, 3, 4, 8, 12 lub 24 raty. Płatności ratalne realizujemy za pośrednictwem firmy MeriRaty`,
		tryb: "Stacjonarne",
	},
	{
		question: "Czy musze od razu zapłacić całą kwotę?",
		answer: `Nie, jeśli kwota jest większa niż 1000zł. Na początek można wpłacić zadatek, a resztę uregulować przelewem (po wykonaniu przelewu prosimy o przesłanie nam potwierdzenia na maila: ksiegowosc@itcmkrakow.pl). Istnieje również możliwość rozłożenia płatności na raty – dostępne opcje to 1, 3, 4, 8, 12 lub 24 raty. Płatności ratalne realizujemy za pośrednictwem firmy MeriRaty`,
		tryb: "Online",
	}, {
		question: "Czy musze od razu zapłacić całą kwotę?",
		answer: `Nie, jeśli kwota jest większa niż 1000zł. Na początek można wpłacić zadatek, a resztę uregulować przelewem (po wykonaniu przelewu prosimy o przesłanie nam potwierdzenia na maila: ksiegowosc@itcmkrakow.pl). Istnieje również możliwość rozłożenia płatności na raty – dostępne opcje to 1, 3, 4, 8, 12 lub 24 raty. Płatności ratalne realizujemy za pośrednictwem firmy MeriRaty`,
		tryb: "Cykl webinarów",
	},
	{
		question: "Jakie miejsca moclegowe polecacie w okolicy?",
		answer: `Vanilla Apart Hotel - <a href="https://aparthotelvanilla.pl" class="faq-link">LINK</a><br>  
Hotel Panorama - <a href="https://hotel-panorama.pl" class="faq-link">LINK</a><br>
Hotel Sympozjum - <a href="https://www.sympozjum.com.pl" class="faq-link">LINK</a><br>
Hotel Campanile - <a href=" https://krakow-south.campanile.com/pl" class="faq-link">LINK</a>
`,
		tryb: "Hybrydowe",
	},
	{
		question: "Jakie miejsca moclegowe polecacie w okolicy?",
		answer: `Vanilla Apart Hotel - <a href="https://aparthotelvanilla.pl" class="faq-link">LINK</a><br>  
Hotel Panorama - <a href="https://hotel-panorama.pl" class="faq-link">LINK</a><br>
Hotel Sympozjum - <a href="https://www.sympozjum.com.pl" class="faq-link">LINK</a><br>
Hotel Campanile - <a href=" https://krakow-south.campanile.com/pl" class="faq-link">LINK</a>
`,
		tryb: "Stacjonarne",
	},
	{
		question: "Czy na miejscu można kupić coś do jedzenia?",
		answer: `W trakcie szkoleń zaplanowana jest przerwa obiadowa, podczas której wszyscy uczestnicy otrzymują zapewniony przez nas posiłek. Oprócz tego, przez cały czas trwania szkolenia, dostępne są bezpłatnie woda oraz herbata. Kawa natomiast jest ona dostępna za dodatkową opłatą, którą można uregulować wyłącznie gotówką.`,
		tryb: "Hybrydowe",
	},
	{
		question: "Czy na miejscu można kupić coś do jedzenia?",
		answer: `W trakcie szkoleń zaplanowana jest przerwa obiadowa, podczas której wszyscy uczestnicy otrzymują zapewniony przez nas posiłek. Oprócz tego, przez cały czas trwania szkolenia, dostępne są bezpłatnie woda oraz herbata. Kawa natomiast jest ona dostępna za dodatkową opłatą, którą można uregulować wyłącznie gotówką.`,
		tryb: "Stacjonarnie",
	},
	{
		question: "Co warto zabrać ze sobą na kurs?",
		answer: `Aby dowiedzieć się więcej o konkretnym kursie (zakres, cena, terminy) prosimy przejść na stronę pod <a href="https: //itcmkrakow.pl/kursy/" class="faq-link">TYM LINKIEM</a> i wybrać interesujący kurs. Na dole strony każdego z kursów istnieje możliwość zapisu `,
		tryb: "Hybrydowe",
	},
	{
		question: "Co warto zabrać ze sobą na kurs?",
		answer: `Aby dowiedzieć się więcej o konkretnym kursie (zakres, cena, terminy) prosimy przejść na stronę pod <a href="https: //itcmkrakow.pl/kursy/" class="faq-link">TYM LINKIEM</a> i wybrać interesujący kurs. Na dole strony każdego z kursów istnieje możliwość zapisu `,
		tryb: "Stacjonarnie",
	}

])



const additionalQuestion = ref([
	{
		question: "Opłaciłem zadatek. Jak mogę uiścić pozostałą kwotę?",
		answer: `Po wpłacie zadatku nasz dział księgowy skontaktuje się z Tobą przed kursem, aby przypomnieć o konieczności uregulowania pozostałej płatności. Pozostałą kwotę możesz wpłacić na poniższe dane: <br> <br>
<b>NZOZ Werra, ul. Ogrody 17, 32-050 Skawina</b><br>
<b>PKOBP Centrum Bankowości Detalicznej</b><br>
<b>79 1440 1387 0000 0000 0967 7771</b><br>
<b>Tytuł przelewu: Imię Nazwisko Nazwa kursu / szkoły</b><br><br><br>
<span class="copy-number" id="test123" onclick="copyNumber()">Skopiuj numer konta
<span id="tooltip" class="tooltip" style="display: none;">Skopiowano numer!</span> </span>
`
	},
	{
		question: "Jak przebiegają webinary?",
		answer: `Podczas pierwszego spotkania wysyłamy wiadomość e-mail zawierającą wszystkie niezbędne dane do dołączenia: link, hasło oraz numer ID, który pozostaje niezmienny przez cały okres trwania cyklu – zalecamy zapisanie tych danych. Dodatkowo, przed każdym spotkaniem ponownie przesyłamy te informacje. Po zakończeniu webinaru nagrania udostępniamy w ciągu 5 dni na naszej platformie`,
	},
	{
		question: "Co zrobić, gdy nie pamiętam hasła do platformy Sklep ITCM DAO?",
		answer: `Możesz samodzielnie zresetować hasło w dowolnym momencie, korzystając z linku dostępnego na stronie tutaj. Wprowadź adres e-mail, który jest powiązany z Twoim kontem, a system automatycznie wyśle Ci wiadomość z linkiem do utworzenia nowego hasła. Po podaniu nowego hasła dwukrotnie, będziesz mógł się zalogować na platformę przy użyciu nowego hasła`
	},
	{
		question: "Gdzie mogę znaleźć nagrania z webinarów?",
		answer: `Wszystkie nagrania są udostępniane na naszej platformie LINK. Aby je znaleźć, wystarczy przejść do sekcji „Moje produkty” wybrać kurs a następnia lekcje lub zagadnienie, które nas interesuje. Tam znajdziesz zarówno nagrania, jak i prezentacje do pobrania`,
	},
	{
		question: "Jak mogę otrzymać fakturę za kurs?",
		answer: `Aby otrzymać fakturę za kurs, wyślij nam e-mail z nazwą kursu oraz swoimi danymi (imię, nazwisko, adres oraz NIP, jeśli dotyczy) na adres: ksiegowosc@itcmkrakow.pl. Po przetworzeniu Twojej prośby, faktura zostanie wysłana na podany adres e-mail. Upewnij się, że wszystkie dane są poprawne, aby przyspieszyć proces`
	}
])

const hybridCoursesFilter = faqData.value.filter(single => single.tryb === 'Hybrydowe')
const hybridCoursesFilterArray = [...firstQuestion.value, ...hybridCoursesFilter, ...additionalQuestion.value]

const coursesFilter = faqData.value.filter(single => single.tryb === 'Hybrydowe')
const coursesFilterArray = [...firstQuestion.value, ...coursesFilter, ...additionalQuestion.value]

const onlineCoursesFilter = faqData.value.filter(single => single.tryb === 'Hybrydowe')
const onlineCoursesFilterArray = [...firstQuestion.value, ...onlineCoursesFilter, ...additionalQuestion.value]

</script>

<template>
	<h1 style="margin-bottom: -3px;">Pytania do szkół</h1>
	<div v-for="(question, index) in schoolQuestion" :key="index">
		<p style="font-size: 19px; font-weight: bold; margin-top: 32px;">{{ question.question }}</p>
		<p style="margin-top: -12px; line-height: 20px;">{{ question.answer }}</p>
	</div>
	<h1 style="margin-top: 100px;">Pytania do kursów hybrydowych</h1>
	<div v-for="(question, index) in hybridCoursesFilterArray" :key="index">
		<p style="font-size: 19px; font-weight: bold; margin-top: 32px;">{{ question.question }}</p>
		<p style="margin-top: -12px; line-height: 20px;">{{ question.answer }}</p>
	</div>
	<h1 style="margin-top: 100px;">Pytania do kursów stacjonarnych</h1>
	<div v-for="(question, index) in coursesFilterArray" :key="index">
		<p style="font-size: 19px; font-weight: bold; margin-top: 32px;">{{ question.question }}</p>
		<p style="margin-top: -12px; line-height: 20px;">{{ question.answer }}</p>
	</div>
	<h1 style="margin-top: 100px;">Pytania do kursów online</h1>
	<div v-for="(question, index) in onlineCoursesFilterArray" :key="index">
		<p style="font-size: 19px; font-weight: bold; margin-top: 32px;">{{ question.question }}</p>
		<p style="margin-top: -12px; line-height: 20px;">{{ question.answer }}</p>
	</div>
	<div style="margin-bottom: 120px" />
</template>
