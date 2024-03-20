  <template>
    <div>
      <div v-for="(group, groupIndex) in checkboxGroups" :key="groupIndex">
        <div v-for="(checkbox, index) in group" :key="index">
          <label class="flex w-full mt-2">
            <input
              :type="checkbox.type"
              :id="checkbox.id"
              class="w-5 flex mb-[4px]"
              v-model="checkbox.checked"
              @change="handleCheckboxChange(checkbox, groupIndex)"
            />
            <p class="ml-2">{{ checkbox.label }}</p>
          </label>
        </div>
      </div>
      <button @click="saveCookies">Zapisz</button>
    </div>
  </template>
  
  <script setup>
  
  const checkboxes = ref([
    { id: "checkbox1", api: '[01]', type: "checkbox", label: "Hobby", checked: false, group: 0 },
    { id: "checkbox2", api: '[01]', type: "checkbox", label: "Ulubione jedzenie", checked: false, group: 0 },
    { id: "checkbox3", api: '[01]', type: "checkbox", label: "Sport", checked: false, group: 1 },
    { id: "checkbox4", api: '[01]', type: "checkbox", label: "Muzyka", checked: false, group: 1 },
  ]);
  
  const cookieData = useCookie("select");
  const checkboxGroups = ref([]);
  
  function useCookie(name) {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  
    const setCookie = (name, value) => {
      document.cookie = `${name}=${value}`;
    }
  
    return {
      value: getCookie(name),
      set: (value) => setCookie(name, value)
    }
  }
  
  onMounted(() => {
    if (!cookieData.value) {
      // Inicjuj checkboxy, jeśli brak danych w cookie
      checkboxes.value.forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      // Wczytaj dane z cookie i zdeserializuj je
      const cookieValuesJSON = cookieData.value;
      const cookieValues = JSON.parse(cookieValuesJSON);
  
      checkboxes.value.forEach((checkbox) => {
        const matchingCheckbox = cookieValues.find((c) => c.id === checkbox.id);
        if (matchingCheckbox) {
          checkbox.checked = matchingCheckbox.checked;
        }
      });
    }
  
    // Grupowanie checkboxów
    checkboxGroups.value = checkboxes.value.reduce((groups, checkbox) => {
      if (!groups[checkbox.group]) {
        groups[checkbox.group] = [];
      }
      groups[checkbox.group].push(checkbox);
      return groups;
    }, []);
  });
  
  const handleCheckboxChange = (changedCheckbox, groupIndex) => {
    checkboxGroups.value[groupIndex].forEach((checkbox) => {
      if (checkbox !== changedCheckbox) {
        checkbox.checked = false;
      }
    });
    saveCookies();
  };
  
  const saveCookies = () => {
  const selectedCheckboxes = checkboxes.value
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      return {
        id: checkbox.id,
        api: checkbox.api,
        type: checkbox.type,
        label: checkbox.label,
        checked: checkbox.checked,
        group: checkbox.group,
      };
    });

  const selectedCheckboxesJSON = JSON.stringify(selectedCheckboxes);
  cookieData.set(selectedCheckboxesJSON);
};
  </script>
