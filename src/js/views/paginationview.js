import view from './view.js';
import icons from 'url:../../img/icons.svg'


class pagination extends view{
    _parentEl = document.querySelector('.pagination')

    addHandlerClick(handler){
      this._parentEl.addEventListener('click',function(e){
        e.preventDefault()
        const btn = e.target.closest('.btn--inline')
        if(!btn)return;
        // console.log(btn);
        const gotoPage = +btn.dataset.goto
        // console.log(gotoPage);
        handler(gotoPage)

      })



    }


    _renderMarkup(){
        const curPage=this._data.page
        // console.log(curPage);
        // console.log( this._data)

       const numpage =Math.ceil( this._data.results.length/this._data.resultsPerpage)
      //  console.log(numpage);
       if(curPage===1&&numpage>1){
           return`<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
       }
       if(curPage===numpage&&numpage>1){
           return`<button data-goto="${curPage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`
       }
       if(curPage<numpage){
           return`
         <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
         `
       }
       return``







    }

}
export default new pagination()