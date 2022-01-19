import icons from 'url:../../img/icons.svg'

export default class view{
    
    _data

    /**
     * 
     * @param {*} data 
     * @param {*} render 
     * @returns 
     */
    render(data,render=true){
        if(!data||(Array.isArray(data)&& data.length===0) ) return this.renderError()
        this._data = data
        const mark = this._renderMarkup()
        if(!render) return mark
        this._parentEl.innerHTML=''
        this._parentEl.insertAdjacentHTML('afterbegin', mark)

    }

    update(data){
     
      this._data = data
      const newMark = this._renderMarkup()
      const newDom =document.createRange().createContextualFragment(newMark)
      const newElement=Array.from( newDom.querySelectorAll('*'));
      // console.log(newEl);
      const curElement =Array.from( this._parentEl.querySelectorAll('*'))

      // if(newEl.isEqualNode(curEl))
      newElement.forEach((newEl,i)=>{
        const curEl = curElement[i]
        // console.log(newEl.isEqualNode(curEl))

        if(!newEl.isEqualNode(curEl)&&newEl.firstChild?.nodeValue.trim()!==''){
          curEl.textContent = newEl.textContent
        }
        if(!newEl.isEqualNode(curEl)){
          Array.from(newEl.attributes).forEach(attr=>
           curEl.setAttribute(attr.name,attr.value))
   
   
   
         }

      })
      



    }
     renderSpinner (){
       const mark =`
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`
              this._parentEl.innerHTML=''
              this._parentEl.insertAdjacentHTML('afterbegin',mark)
      }

      renderError(message= this._errormessage){
       const mark = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`
         this._parentEl.innerHTML=''
         this._parentEl.insertAdjacentHTML('afterbegin',mark)

      }
      renderMessageSuccess(message= this._message){
        const mark = `
         <div class="error">
             <div>
               <svg>
                 <use href="${icons}#icon-smile"></use>
               </svg>
             </div>
             <p>${message}</p>
           </div>
 `
          this._parentEl.innerHTML=''
          this._parentEl.insertAdjacentHTML('afterbegin',mark)
 
       }
}