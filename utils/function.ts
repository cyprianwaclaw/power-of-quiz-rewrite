
import type { FieldContext } from 'vee-validate';

type InteractionEventGetter = (ctx: FieldContext) => string[];

const passive = () => [];

const lazy: InteractionEventGetter = ({ meta, errorMessage }) => {
  return ['change'];
};

const aggressive: InteractionEventGetter = () => ['input'];

const eager: InteractionEventGetter = ({ meta, errorMessage }) => {
  if (errorMessage.value) {
    return ['input'];
  }

  return ['change'];
};

export const modes: any = {
  passive,
  lazy,
  aggressive,
  eager,
};



export const formatQueryString = (queryObject: Record<string, any>) => {
  const filteredQueryObject: Record<string, string | number> = Object.keys(queryObject)
    // .filter((key) => key !== "page")
    .reduce((obj, key) => {
      obj[key] = queryObject[key];
      return obj;
    }, {} as Record<string, string | number>);
  const queryString = Object.keys(filteredQueryObject)
    .map((key) => `${key}=${filteredQueryObject[key]}`)
    .join("&");
  return queryString;
};


export const returnSelectedNameFromArray = (ourArray: any) => {
  const selectedCategories = ourArray.filter((single: any) => single.selected === true);
  const selectedCategoryNames = selectedCategories.map((single: any) => single.name);
  return selectedCategoryNames;
}


// ! nie wiem czy wszystko jest potrzebne, chyba nie xDDDD

export function ErrorInput(text: string,) {
  let result = {
    plMessage: '',
    errorInput: false
  }
  if (text == "The given data was invalid.") {
    result = {
      plMessage: '',
      errorInput: true
    }
  }
  else if (text == "This User does not exist, check your details") {
    result = {
      plMessage: 'Podany użytkownik  nie istnieje, sprawdź poprawność danych',
      errorInput: true
    }
  }
  return result;
}


export function onInvalidSubmit() {
  const submitBtn: any = document.querySelector("#submit");
  submitBtn.classList.add("invalid");
  setTimeout(() => {
    submitBtn.classList.remove("invalid");
  }, 400);
}


// TODO: Dodać wszystkie linki
export function RouteChange(name: string) {
  let result = "";

  if (name == "/panel") {
    result = "home";
  }
  else if (name == "/panel/zaproszeni") {
    result = "invite";
  }
  else if (name == "/panel/konto") {
    result = "account";
  }

  else if (name == "/panel/konto/srodki/wyplata") {
    result = "account";
  }
  else if (name == "/panel/konto/srodki") {
    result = "account";
  }
  else if (name == "/panel/quiz") {
    result = "quiz";
  }


  return result;
}

export function AddAnswer(correct: number, incorrect: number) {

  return correct + incorrect

}

export function ChangePlaceholderInput(name: any, text: any) {
  let results = {
    placeholder: '',
    class: ''
  }
  if (!name) {
    results = {
      placeholder: text,
      class: 'input-not-data'
    }
  }
  else {
    results = {
      placeholder: name,
      class: 'input-data'
    }
  }
  return results;
}

export function ChangeDataInput(value: any, apiData: any) {
  let results = ''
  if (value) {
    results = value
  } else if (apiData) {
    results = apiData
  }
  return results;
}


export function indexBigger(index: number) {
  let results = false
  if (index > 0) {
    results = true
  }
  return results
}



export const changeDifficult = (text: any) => {
  let result: string = ''
  if (text == 'easy') {
    result = 'Łatwy'
  }
  if (text == 'medium') {
    result = 'Średni'
  }
  if (text == 'hard') {
    result = 'Trudny'
  }
  return result;
}

export function changeStatus(number: number) {
  let result: string = ''
  if (number == 0) {
    result = 'W oczekiwaniu'
  }
  if (number == 1) {
    result = 'Aktywny'
  }
  return result;
}

export const categoryMapping = (allCategories: any, quiz: any) => {
  const filtered = allCategories.filter((cat: any) =>
    quiz.category_id == cat.id
  )
  return filtered[0]?.name
}



export const changePayoutsStatus = (name: string) => {
  let results: any = {
    name: '',
    class: ''
  }
  if (name == 'success') {
    results = {
      name: 'Wypłacono',
      class: 'font-medium green'
    }
  } else if (name == 'fail') {
    results = {
      name: 'Błąd wypłaty',
      class: 'red font-medium'
    }
  } else {
    results = {
      name: 'W oczekiwaniu',
      class: 'font-medium wait'
    }
  }
  return results;
}

export const changePaymentStatus = (name: string) => {
  let results: any = {
    name: '',
    class: ''
  }
  if (name == 'success') {
    results = {
      name: 'Sukces',
      class: 'font-medium green'
    }
  } else if (name == 'fail') {
    results = {
      name: 'Błąd płatności',
      class: 'red font-medium'
    }
  } else {
    results = {
      name: 'W oczekiwaniu',
      class: 'font-medium wait'
    }
  }
  return results;
}

export const dataURLtoBlob = (dataURL: any) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};


export const truncateText = (text: any, maxLength: number) => {
  let results: any = ''
  if (text?.length > maxLength) {
    results = text.slice(0, maxLength) + '...'
  } else {
    results = text
  }
  return results;
};

export const handleInputOwn = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
};

export const placeholderAnswer = (index: number) => {
  return 'Opowiedż ' + (index + 1)
}

export const addQuestion = (array: any) => {
  array.push(
    {
      title: "",
      answers: [
        { answer: "", correct: false },
        { answer: "", correct: false },
        { answer: "", correct: false },
        { answer: "", correct: false },
      ],
    }
  );
};


// ! zamykanie i otwieranie modalu, gdy mamy tylko jedną wartość 
export const openModal = (open: boolean) => {
  let results: any = ''
  if (open == true) results = false
  else results = true
  return results;
}

export const quizQuestionForRemove = (allQuestion: any, questionArray: any) => {
  let APIquestions = allQuestion.value;
  let formatedArrayFromProps = questionArray.value;

  const filteredQuestionToRemoveFromArray = APIquestions.filter((APIarrayElemnt: any) => {
    return !formatedArrayFromProps.some((newArrayFormated: any) => {
      return newArrayFormated.id === APIarrayElemnt.id;
    });
  });

  return filteredQuestionToRemoveFromArray
}



export const checkQuestion = (array: any) => {
  if (array?.every(
    (answerQuestion: any) => answerQuestion.title.length > 3
  ) &&
    array.every((item: any) =>
      item?.answers?.every((answer: any) => answer.answer.length > 3)
    ) &&
    array.every((item: any) =>
      item.answers.some((answer: any) => answer.correct)
    )) {
    return true;
  } else {
    return false;
  }
}

export const watchOpen = (params: any) => {
  watch(params, (newValue: any) => {
    if (newValue == true) {
      document.body.style.overflow = "hidden";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.userSelect = "auto";
    }
  });
}

export const checkCompany = (values: any, error: boolean, company: any) => {
  if (
    error && (values.name !== company?.name ||
      values.nip !== company?.nip ||
      values.regon !== company?.regon ||
      values.city !== company?.address?.city ||
      values.postcode !== company?.address?.postcode ||
      values.street !== company?.address?.street ||
      values.building !== company?.address?.building_number ||
      values.house !== company?.address?.house_number
    )
  ) {
    return true;
  } else {
    return false;
  }
};


export const checkPersonal = (values: any, error: boolean, personal: any) => {
  if (
    error && (
      values.name !== personal?.name ||
      values.surname !== personal?.surname ||
      values.email !== personal?.email ||
      values.phone !== personal?.phone
    )
  ) {
    return true;
  } else {
    return false;
  }
};



export const checkFinancial = (values: any, error: boolean, financial: any) => {
  if (
    error && (values.bank_name == financial?.bank_name &&
      values.iban == financial?.iban &&
      values.swift == financial?.swift
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0 });
}

export const selectItemsByParams = (itemsList: any, params: any) => {
  if (params) {
    if (Array.isArray(params)) {
      params.forEach((param) => {
        itemsList.value.forEach((item: any) => {
          if (item.name === param || item.id === Number(param)) {
            item.selected = true;
          }
        });
      });
    } else {
      const paramValue = Array.isArray(params) ? params[0] : params;
      itemsList.value.forEach((item: any) => {
        if (item.name === paramValue || item.id === Number(paramValue)) {
          item.selected = true;
        }
      });
    }
  }
}

export const test = (payouts: any) => {
  return Object.values(payouts).map((single: any) => ({
    amount: single.points + " zł",
    date: new Date(single.created_at)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("."),
    statusName: changePayoutsStatus(single.status).name,
    statusClass: changePayoutsStatus(single.status).class,
  }));
}

export const mapInvitedUsers = (allInvited: any) => {
  return allInvited.data.map((user: any) => ({
    is_photo: user.avatar_path,
    photo: "https://powerofquizlogin.com.pl/storage/user-avatar/" + user.avatar_path,
    id: user.id,
    name: user.name,
    is_premium: user.plan_subscriptions[0] ? true : false,
  }));
}

export const changeDateFormat = (date: any) => {
  return new Date(date)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".")
}


export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  const timeout = ref<number | undefined>(undefined);
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout.value)
    timeout.value = window.setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const selectedAnswer = (questionIndex: number, answerIndex: number, array: any) => {
  array[questionIndex].answers.forEach((answer: any) => {
    answer.isCorrect = false;
  })
  array[questionIndex].answers[answerIndex].isCorrect = true;
}


export const validateQuestions = (array: any) => {

  const results = ({
    titleError: [] as Array<boolean>,
    answerErrors: [] as Array<boolean>,
    errors: false,
  })

  array.forEach((single: any) => {
    if (single.title.length < 3) {
      results.titleError.push(true);
      results.errors = true;
    }

    single.answers.forEach((answer: any) => {
      if (answer.answer.length < 3) {
        results.answerErrors.push(true);
        results.errors = true;
      }
      if (answer.answer.length > 150) {
        results.answerErrors.push(true);
        results.errors = true;
      }
    })

  })

  return results
}

export const checkAllAnswersFalse = (question: any) => {
  return question.answers.every((answer: any) => answer.isCorrect === false);
}

export const hasAtLeastOneCorrectAnswer = (questionsArray: any) => {
  return questionsArray.every((question: any) => {
    return question.answers.some((answer: any) => answer.isCorrect === true);
  })
}



export const resizeTextarea = (textareas: any, questionIndex: any, answerIndex: number) => {
  const key = `${questionIndex}-${answerIndex}`;
  const textarea = textareas[key] as any
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}
export const resizeTitleTextarea = (titleTextareas: any, questionIndex: any) => {
  const textarea = titleTextareas[questionIndex] as any
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export const mapDataQuizQuestions = (data: any) => {
  return data.map((question: any) => ({
    id: question.id,
    title: question.question,
    answers: question.answers.map((answer: any) => ({
      id: answer.id,
      answer: answer.text,
      isCorrect: answer.correct
    }))
  }))
}


export const updateQuizData = (quizState: any) => {
  if (process) {
    const quizData = JSON.parse(localStorage.getItem('quizData') as string);
    const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions') as string);

    quizState.updateQuizData({
      id: quizData.id,
      title: quizData.title,
      image: quizData.image,
      description: quizData.description,
      time: quizData.time,
      difficulty: quizData.difficulty_id,
      category_id: quizData.category_id,
      questionsArray: mapDataQuizQuestions(quizQuestions)
    })
  }
}

export const getModifiedQuestions = (questionsArray: any[], quizQuestions: any[]): any[] => {
  const modifiedQuestions: any[] = [];
  for (const newQuestion of questionsArray) {
    const originalQuestion = quizQuestions.find((q: any) => q.id === newQuestion.id);
    if (originalQuestion) {
      if (newQuestion.title !== originalQuestion.question) {
        modifiedQuestions.push(newQuestion); 
      }
    }
  }

  return modifiedQuestions
}

export const getModifiedAnswers = (questionsArray: any[], quizQuestions: any[]): any[] => {
  const modifiedAnswers: any[] = [];
  for (const newQuestion of questionsArray) {
    const originalQuestion = quizQuestions.find((q: any) => q.id === newQuestion.id);
    if (originalQuestion && newQuestion.answers && originalQuestion.answers) {
      for (const newAnswer of newQuestion.answers) {
        const originalAnswer = originalQuestion.answers.find((a: any) => a.id === newAnswer.id);
        if (originalAnswer) {
          if (newAnswer.answer !== originalAnswer.text || newAnswer.isCorrect !== originalAnswer.correct) {
            modifiedAnswers.push(newAnswer);
          }
        }
      }
    }
  }

  return modifiedAnswers;
}


export const getModifiedQuizData = (quizObject: any, quizState: any) => {
  const modifiedData: any = {};

  if (quizObject.title !== quizState.title) {
    modifiedData.title = quizState.title;
  }
  if (quizObject.description != quizState.description) {
    modifiedData.description = quizState.description;
  }
  if (quizObject.time != quizState.time) {
    modifiedData.time = quizState.time;
  }
  if (quizObject.difficulty_id != quizState.difficulty) {
    modifiedData.difficulty = quizState.difficulty;
  }
  if (quizObject.category_id != quizState.category_id) {
    modifiedData.category_id = quizState.category_id;
  }

  return modifiedData
}

