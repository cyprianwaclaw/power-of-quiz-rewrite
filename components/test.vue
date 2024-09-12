<template>
  <div>
    <pre>
            {{ user }}
        </pre>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/useUser";

const userState = useUser();

// const currentUser = userState?.user;

const { user } = storeToRefs(userState);

// await userState.login();





const schoolQuestion = [
  {
    question: "W jakiej formie odbywa się nauka?",
    answer: `TCM czyli Tradycyjna Medycyna Chińska to styl medycyny tradycyjnej, który wywodzi się z ponad 2500-letniej chińskiej tradycji praktyk medycznych. Obejmuje różne formy leczenia np.: akupunkturę, masaże, terapię dietetyczną czy medycynę ziołową `
  },
  {
    question: "Czy jest jakaś grupa dla kursantów?",
    answer: `Hybrydowo. Widza teoretyczna przekazywana jest podczas webinarów on-line natomiast zajęcia praktyczne odbywają się w siedzibie Instytutu przy ul. Tynieckiej 82 w Krakowie `
  },
  {
    question: "Czy wystawiacie faktury?",
    answer: `Oczywiście! Prosimy o podanie danych do faktury podczas zapisu do Szkoły (lub późniejsze przesłanie ich drogą mailową na adres ksiegowosc@itcmkrakow.pl)`
  },
  {
    question: "Co to jest TCM? ",
    answer: `TCM czyli Tradycyjna Medycyna Chińska to styl medycyny tradycyjnej, który wywodzi się z ponad 2500-letniej chińskiej tradycji praktyk medycznych. Obejmuje różne formy leczenia np.: akupunkturę, masaże, terapię dietetyczną czy medycynę ziołową `
  }, {
    question: "Czy mogę skorzystać z dofinansowań do szkoły?",
    answer: `Informację o dofinanowaniach są dostępne pod <a href="https://itcmkrakow.pl/kursy/dofinansowanie/" class="faq-link">TYM LINKIEM</a>. Jeśli masz już przyznane dofinanowanie i potrzebujesz pomocy z dokumentami do Urzędu Pracy napisz do nas na adres ksiegowosc@itcmkrakow.pl`
  },
  {
    question: "Czy po zakończeniu szkoły otrzymam certyfikat? ",
    answer: `Tak, po ukończeniu szkoły studenci otrzymują certyfikat potwierdzający ich praktyczne umiejętności oraz nadający im kwalifikację zawodu`
  },
  {
    question: "Kto prowadzi zajęcia?",
    answer: `Nasi wykładowcy to doświadczeni specjaliści z dziedziny medycyny chińskiej w tym lekarze, terapeuci, akupunkturzyści czy naturopaci z wieloletnim doświadczeniem. Pełną listę wykładowców znajdziesz pod <a href="https://itcmkrakow.pl/kursy/wykladowcy/" class="faq-link">TYM LINKIEM</a>`
  },
  {
    question: "Jakie hotele/noclegi polecacie w okolicy?",
    answer: `Vanilla Apart Hotel - <a href="https://aparthotelvanilla.pl" class="faq-link">LINK</a><br>  
Hotel Panorama - <a href="https://hotel-panorama.pl" class="faq-link">LINK</a><br>
Hotel Sympozjum - <a href="https://www.sympozjum.com.pl" class="faq-link">LINK</a><br>
Hotel Campanile - <a href=" https://krakow-south.campanile.com/pl" class="faq-link">LINK</a>
`
  },
]





</script>

<style scoped></style>
