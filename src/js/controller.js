import * as model from './model.js'
import recipeview from './views/recipeview.js';
import searchview from './views/searchview.js';
import resultView from './views/resultView.js';
import pagination from './views/paginationview.js';
import bookMarksView from './views/bookMarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE} from './config.js'




import 'core-js/stable';
import 'regenerator-runtime/runtime'
import paginationview from './views/paginationview.js';
import { arch } from 'os';
// console.log(icons);
// if(module.hot){
//   module.hot.accept()
// }

const { error } = require("console");
const { recip } = require("prelude-ls");
const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipie = async function(){

  try{
    

    const id = window.location.hash.slice(1)
    // console.log(id);
    if(!id) return;

    recipeview. renderSpinner()

    resultView.update(model.getSearchResultpage())

    bookMarksView.update(model.state.bookmarks)
    // loading recipe
    await model.loadrecipe(id)


    
   
// rendering recipe

recipeview.render(model.state.recipe)



    


  }catch(err){
    // alert(err)
    // console.log(err);
    recipeview.renderError()

  }
  


}


const controlSearchResults = async function(){
  try{
    // console.log(resultView);
    resultView.renderSpinner()

    const query = searchview.getQuery()
    // console.log(query);
    if(!query) return

   await model.loadSearchResult(query)
  //  console.log(model.state.search.results);
   resultView.render(model.getSearchResultpage())

   paginationview.render(model.state.search)




  }catch(err){
    console.error(err)

  }
}
// controlSearchResults()

const controlPagination = function(gotoPage){
  console.log(gotoPage);
  console.log('pag con');
  resultView.render(model.getSearchResultpage(gotoPage))

  paginationview.render(model.state.search)

}
const controlServing = function(newServing){

  model.updateServing(newServing)

recipeview.update(model.state.recipe)



}

const controlAddbookmark = function(){
  if(!model.state.recipe.bookmarked) model.addbookMark(model.state.recipe)
  else model.removeBookmark(model.state.recipe.id)
  recipeview.update(model.state.recipe)

  bookMarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookMarksView.render(model.state.bookmarks)
}

const controlAddRecipe=async function(newrecipe){
  try{
    addRecipeView.renderSpinner()

   await model.uploadRecipe(newrecipe)
  //  console.log(model.state.recipe);
   recipeview.render(model.state.recipe)
   addRecipeView.renderMessageSuccess()
   bookMarksView.render(model.state.bookmarks)

   window.history.pushState(null,'',`#${model.state.recipe.id}`)

   setTimeout(function(){
     addRecipeView.toggleWindow()

   },MODEL_CLOSE * 1000)
   


  }catch(err){

    console.error(err,`**`);
    addRecipeView.renderError(err.message)

  }
}

const init = function(){
  bookMarksView.addHandlerRender(controlBookmarks)
  recipeview.addHandlerRender(controlRecipie)
  recipeview.addHandlerServing(controlServing)
  recipeview.addHandlerBookmark(controlAddbookmark)
  searchview.addHandlerSearch(controlSearchResults)
  paginationview.addHandlerClick(controlPagination)
  addRecipeView._addHandlerUpload(controlAddRecipe)
}
init()

