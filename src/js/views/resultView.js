import view from './view.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'


class resultView extends view{
    _parentEl = document.querySelector('.results')
    _errormessage = 'no recipe found for your query '
    _message = ''

    _renderMarkup() {

      return this._data.map(result=>previewView.render(result,false)).join('')


      
  }
}

export default new resultView()