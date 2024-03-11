

    export const quizesValue = (quiz:any, category1:any)=>{
        const Quiz:any = quiz.map((quiz: any) => ({
          id: quiz.id,
          title: quiz.title,
          image: quiz.image,
          questions_count: quiz.questions_count,
          difficulty: quiz.difficulty,
          description: quiz.description,
          time: quiz.time,
          category: category1.filter(
            (category: any) => category.id == quiz.category_id
            ),
            user_id: quiz.user_id,
          }));
          return Quiz
        }

    export const queryParams =(route:any)=>{
      let results:any = ''
      if(route ==  undefined || route == ''){
        results = undefined
      } 
      else{
        results = String(route).split(",")
      }
        return results
      } 


      export let difficulty =()=>{
        let difficult= reactive([
            {name: 'Łatwy', value: 'easy', selected: false},
            {name: 'Średni', value: 'medium', selected: false},
            {name: 'Trudny', value: 'hard', selected: false},
          ]) 
          return difficult; 
        } 

        export const handleChange = (category:any) => {
          return category;
        };

        export const handleChangeLevel = (difficulty:any) => {
          return difficulty;
        };

        export const changeDifficulty =(difficulty:any, routeName:any )=>{
         let  difficultyURL = difficulty.filter((single:any)=> routeName?.includes(  single.value) )
          // console.log(difficultyURL)
          return difficultyURL
        }
        
        export const listChange = ()=>{
          let results = {
            first: false,
            second: false,
            third: false,
          }
          let storge = localStorage.getItem('listView')
        if(storge == 'two'){
          results = {
            first: true,
            second: false,
            third: false,
          }
        }
        else if(storge == 'three'){
          results = {
            first: false,
            second: true,
            third: false,
          }
        }
        else if(storge == 'four'){
          results = {
            first: false,
            second: false,
            third: true,
          }
        }
        
        return results;
        }


        export const saveSort=async()=>{
          window.location.reload()
        }
        
        export const sortItems =()=>{
          let sorting = reactive([
          { name: "Czas rosnąco", value: "medium", selected:false, api: "sort[0]=time,asc",category: "time"   },
          { name: "Czas malejąco", value: "medium", selected:false,  api: "sort[0]=time,desc",category: "time" },
          { name: "Trudność", value: "easy", selected: false, des: "( łatwe, trudne )",api: "sort[1]=difficulty,asc", category: "difficulty" },
          { name: "Trudność", value: "easy", selected:false, des: "( trudne, łatwe )",api: "sort[1]=difficulty,desc", category: "difficulty" }
        ])
      return sorting
      }