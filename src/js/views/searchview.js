 class searchview {
     _parentEl = document.querySelector('.search')

     getQuery(){
         const query = this._parentEl.querySelector('.search__field').value
        //  this.#parentEl.
        this._clearInput()
        return query
         
     }
     _clearInput(){
        this._parentEl.querySelector('.search__field').value=''
     }

     addHandlerSearch(hand){
         this._parentEl.addEventListener('submit',function(e){
             e.preventDefault() 
             hand()
         })

     }



}
export default new searchview()