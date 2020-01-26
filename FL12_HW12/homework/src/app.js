class Router {
  constructor(routes) {
    this.routes = routes;
    this.prevURL = '';
  }

  get path() {
    return window.location.hash.substring(1);
  }

  redirect(path) {
    window.location.hash = path;
  }

  getRoute(HashChangeEvent) {
    if (HashChangeEvent) {
      this.prevURL = HashChangeEvent.oldURL;
    }

    const currentPath = this.splitPath(this.path);

    const route = this.routes.find((route) => {
      const res = this.comparePaths(this.splitPath(route.path), currentPath);
      if (res) {
        route.params = res;
        return true;
      } else {
        return false;
      }
    });

    if (route) {
      if (route.redirect) {
        this.goTo(route.redirect);
      }
      return route;
    } else {
      this.redirect('/404');
    }
  }

  splitPath(path) {
    const min = 0;
    return path.split('/').filter((str) => str.trim().length > min);
  }

  comparePaths(routePath, currentPath) {
    if (routePath.length !== currentPath.length) {
      return null;
    }
    for (let k = 0; k < routePath.length; k++) {
      if (currentPath[k] === undefined) {
        return null;
      }
      if (routePath[k] === ':id') {
        const id = currentPath[k];
        return !isNaN(id) ? { id } : null;
      } else {
        if (routePath[k] !== currentPath[k]) {
          return null;
        }
      }
    }
    return {};
  }
}

class Page {
  constructor(className, headerText) {
    this.className = className;
    this.headerText = headerText;
  }

  createBox(tagName, tagClass, text = '') {
    const newTag = document.createElement(tagName);
    newTag.setAttribute('class', tagClass);
    if (text !== '') {
      newTag.appendChild(document.createTextNode(text));
    }
    return newTag;
  }

  createInput(type, name, value, placeholder) {
    const inputName = document.createElement('input');
    inputName.setAttribute('type', type);
    inputName.setAttribute('name', name);
    inputName.setAttribute('value', value);
    inputName.setAttribute('placeholder', placeholder);
    return inputName;
  }

  createButton(type, name, text, value = '') {
    const btn = document.createElement('button');
    btn.setAttribute('type', type);
    btn.setAttribute('name', name);
    if (value !== '') {
      btn.setAttribute('value', value);
    }
    btn.appendChild(document.createTextNode(text));
    return btn;
  }

  createForm(idName, onSubmit, onClick) {
    const newForm = document.createElement('form');
    newForm.setAttribute('name', idName);
    newForm.setAttribute('id', idName);
    newForm.addEventListener('submit', onSubmit);
    newForm.addEventListener('click', onClick);
    return newForm;
  }

  wrapper(content) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('class', this.className);

    const headerElement = document.createElement('h1');
    headerElement.appendChild(document.createTextNode(this.headerText));
    wrapperElement.appendChild(headerElement);

    const contentElement = document.createElement('div');
    contentElement.setAttribute('class', 'content');
    contentElement.appendChild(content);

    wrapperElement.appendChild(contentElement);
    return wrapperElement;
  }
}

class MainPage extends Page {
  constructor() {
    super('MainPage', 'List of items');
  }

  content() {
    const content = document.createElement('p');
    const blockText = document.createTextNode('Main Page');
    content.appendChild(blockText);
    return this.wrapper(content);
  }
}

class AddPage extends Page {
  constructor(rerender) {
    super('AddPage', 'Add new item');

    this.rerender = rerender;
    this.onFormClick = this.onFormClick.bind(this);

    this.data = {
      newsetname: '',
      counter: 0,
      terms: [],
      definitions: [],
      error: false,
      errorMessage: '* field is required'
    };
  }

  getV(arr, key) {
    return this.data[arr][key] ? this.data[arr][key] : '';
  }

  collectTerms(form) {
    const newTerms = [];
    const newDefinitions = [];

    const terms = form.elements['terms[]'];
    const definitions = form.elements['definitions[]'];

    if (terms && definitions) {
      if (!terms.length) {
        newTerms.push(terms.value);
        newDefinitions.push(definitions.value);
      } else {
        for (let i = 0; i < terms.length; i++) {
          newTerms.push(terms[i].value);
          newDefinitions.push(definitions[i].value);
        }
      }
    }

    return [newTerms, newDefinitions];
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onFormClick(event) {
    const isAdd = event.target.name === 'add';
    const isSave = event.target.name === 'save';
    const isDelTerm = event.target.name === 'delterm';

    if (!isAdd && !isSave && !isDelTerm) {
      return;
    }

    const form = document.getElementById('addform');
    this.data.newsetname = form.elements['newsetname'].value;

    const [terms, definitions] = this.collectTerms(form);
    this.data.terms = terms;
    this.data.definitions = definitions;

    if (isAdd) {
      this.data.counter = this.data.counter + 1;
    }

    if (isDelTerm) {
      this.data.terms.splice(event.target.value, 1);
      this.data.definitions.splice(event.target.value, 1);

      this.data.counter = this.data.counter - 1;
    }

    if (isSave) {
      if (!this.data.newsetname) {
        this.data.error = true;
      }
    }

    this.rerender();
  }

  content() {
    const form = this.createForm('addform', this.onFormSubmit, this.onFormClick);

    const newsetnameBlock = this.createBox('p', 'datain');
    newsetnameBlock.appendChild(this.createInput('text', 'newsetname', this.data.newsetname, 'name'));
    if (this.data.error) {
      newsetnameBlock.appendChild(this.createBox('span', 'message', ' ' + this.data.errorMessage));
    }
    form.appendChild(newsetnameBlock);

    const buttonsBlock = this.createBox('p', 'buttons');
    buttonsBlock.appendChild(this.createButton('button', 'add', 'Add terms'));
    buttonsBlock.appendChild(this.createButton('button', 'save', 'Save changes'));
    buttonsBlock.appendChild(this.createButton('button', 'cancel', 'Cancel'));
    form.appendChild(buttonsBlock);

    for (let i = 0; i < this.data.counter; i++) {
      const dl = this.createBox('div', 'card');
      dl.appendChild(this.createInput('text', 'terms[]', this.getV('terms', i), 'Enter term'));
      dl.appendChild(this.createInput('text', 'definitions[]', this.getV('definitions', i), 'Enter definition'));
      dl.appendChild(this.createButton('button', 'delterm', 'Remove', i));
      form.appendChild(dl);
    }

    return this.wrapper(form);
  }
}

class ModifyPage extends Page {
  constructor() {
    super('ModifyPage', 'Modify item');
  }

  content() {
    const content = document.createElement('p');
    const blockText = document.createTextNode('Modify Page');
    content.appendChild(blockText);
    return this.wrapper(content);
  }
}

class NotFoundPage extends Page {
  constructor() {
    super('NotFoundPage', '404');
  }

  content() {
    const content = document.createElement('p');
    const blockText = document.createTextNode('Not Found Page');
    content.appendChild(blockText);
    return this.wrapper(content);
  }
}

class App {
  constructor(root) {
    const routes = [
      {
        path: '',
        Page: MainPage,
        title: 'Main page'
      },
      {
        path: '/add',
        Page: AddPage,
        title: 'Add'
      },
      {
        path: '/modify/:id',
        Page: ModifyPage,
        title: 'Modify'
      },
      {
        path: '/404',
        Page: NotFoundPage,
        title: 'Page not found'
      }
    ];

    this.root = root;
    this.router = new Router(routes);
    this.currentPage = null;

    this.rerender = this.rerender.bind(this);
    window.addEventListener('hashchange', this.handlerHashchange.bind(this));
  }

  init() {
    this.handlerHashchange();
  }

  handlerHashchange(event) {
    const route = this.router.getRoute(event);
    if (route) {
      document.title = 'My App :: ' + route.title;
      if (!route.Page.content) {
        route.Page = new route.Page(this.rerender);
      }
      this.currentPage = route.Page;
      this.rerender();
    }
  }

  rerender() {
    const newNode = this.currentPage.content();
    if (!this.root.firstChild) {
      this.root.appendChild(newNode);
    } else {
      this.root.replaceChild(newNode, this.root.firstChild);
    }
  }
}

new App(document.getElementById('root')).init();
