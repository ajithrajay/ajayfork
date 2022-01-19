import view from './view.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'


class addRecipeview extends view{
    _parentEl = document.querySelector('.upload')
    _message ='recipe added'
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor(){
        super()
        this._addhanlerShowWindow()
        this._addHanlerHideWindow()


    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addhanlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }
    
    
    _addHanlerHideWindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))

    }


    _addHandlerUpload(hand){
        this._parentEl.addEventListener('submit',function(e){
            e.preventDefault()
            const dataArr= [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            hand(data)

            

        })
    }


    // 

    _renderMarkup() {



      
  }
}

export default new addRecipeview()