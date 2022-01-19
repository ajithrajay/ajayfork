import { async } from "regenerator-runtime";
import { API_URL,SEARCH_PER_PAGE,KEY } from './config.js';
// import { getJson, sendJson } from "./helper.js";
import { AJAX } from "./helper.js";



export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page: 1,
        resultsPerpage : SEARCH_PER_PAGE
    },
    bookmarks:[]
}
const createRecipeObject=function(data){
    const {recipe} = data.data
    return {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        image:recipe.image_url,
        servings:recipe.servings,
        cookingTime:recipe.cooking_time,
        ingredients:recipe.ingredients,
        ...(recipe.key&&{key:recipe.key})
    
        
    }
}

export const loadrecipe = async function(id){

    try{
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)

        state.recipe=createRecipeObject(data)


        
       
        if(state.bookmarks.some(bookmark=>bookmark.id===id))
        state.recipe.bookmarked=true
        else
        state.recipe.bookmarked=false
        // console.log(recipe);
    }catch(err){
        console.error(`${err}.....`);
        throw err

    }
        
}

export const loadSearchResult= async function(query){
    try{
        state.search.query = query

        const data = await AJAX(`${API_URL}?search=${query}&&key=${KEY}`)

         state.search.results= data.data.recipes.map(res=>{
             return { 
             id:res.id,
             title:res.title,
             publisher:res.publisher,
             image:res.image_url,
             ...(res.key&&{key:res.key})
    
            }
         })
        //  console.log(state.search.results);
        state.search.page=1



    }catch(err){
        console.error(`${err}.....`);

    }

}
loadSearchResult()


export const getSearchResultpage = function(page= state.search.page){
    state.search.page= page


    const start = (page -1)*state.search.resultsPerpage
    const end = page*state.search.resultsPerpage

   return state.search.results.slice(start,end)

}

export const updateServing = function(newServing){

    state.recipe.ingredients.forEach(ing=>{
        ing.quantity = (ing.quantity*newServing)/state.recipe.servings
    })
    
    state.recipe.servings = newServing
    
}


const presistData = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}


export const addbookMark = function(recipe){
    state.bookmarks.push(recipe);

    if(recipe.id===state.recipe.id) state.recipe.bookmarked=true
    presistData()

}

export const removeBookmark = function(id){
    const index = state.bookmarks.findIndex(el=>el.id===id)
    state.bookmarks.splice(index,1)
    if(id===state.recipe.id) state.recipe.bookmarked=false
presistData()

}

const init= function(){
   const Storage= localStorage.getItem('bookmarks')
   if(Storage) state.bookmarks =JSON.parse(Storage)

}
init()
console.log(state.bookmarks);


export const uploadRecipe = async function(newRecipe){
    try{

        const ingredients = Object.entries(newRecipe).filter(entry=>entry[0].startsWith('ingredient')&&entry[1]!=='').map(ing=>{
            const ingArr=ing[1].replaceAll(' ','').split(',')
            if(ingArr.length!==3)
            throw new Error('wrong formate PLS enter different')
            
            const[quantity,unit,description] =ingArr
            
            return{quantity:quantity?+quantity:null,unit,description}
        })
        const recipe ={
            title:newRecipe.title,
            source_url:newRecipe.sourceUrl,
            image_url:newRecipe.image,
            publisher:newRecipe.publisher,
            cooking_time:+newRecipe.cookingTime,
            servings:+newRecipe.servings,
            ingredients,
            
    
            
        }
        console.log(recipe);
       const data= await AJAX(`${API_URL}?key=${KEY}`,recipe)
       console.log(data);
    //    console.log(data);
    state.recipe =createRecipeObject(data)
    addbookMark(state.recipe)
    
    

    }catch(err){

        throw err
    }

   




}
