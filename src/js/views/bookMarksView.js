import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'


class BookMarkView extends view{
    _parentEl = document.querySelector('.bookmarks__list')
    _errormessage = 'no bookmarks yet,Find a nice recipe '
    _message = ''


    addHandlerRender(hand){
        window.addEventListener('load',hand())
    }

    _renderMarkup() {

        return this._data.map(book=>previewView.render(book,false)).join('')


        
    }
   
}

export default new BookMarkView()