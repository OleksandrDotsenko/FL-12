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
        this.redirect(route.redirect);
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

  wrapper(content, className, headerText) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('class', className);

    const headerElement = document.createElement('h1');
    headerElement.appendChild(document.createTextNode(headerText));
    wrapperElement.appendChild(headerElement);

    const contentElement = document.createElement('div');
    contentElement.setAttribute('class', 'content');
    contentElement.appendChild(content);

    wrapperElement.appendChild(contentElement);
    return wrapperElement;
  }
}

class MainPage extends Page {
  content() {
    const content = document.createElement('p');
    const blockText = document.createTextNode('Main Page');
    content.appendChild(blockText);
    return this.wrapper(content, 'MainPage', 'List of items');
  }
}

class ModPage extends Page {
  constructor(options) {
    super();

    this.onFormClick = this.onFormClick.bind(this);

    this.ID = Number(options.params.id);
    this.rerender = options.rerender;
    this.storageAvailable = options.storageAvailable;
    this.redirect = options.redirect;

    this.pageClassName = 'page';
    this.headerText = 'Add new item';

    this.errorPage = false;
    this.errorForm = false;
    this.errorFormMessage = '* field is required';

    this.data = {
      kitname: '',
      terms: [],
      definitions: [],
      studied: false,
      counter: 0
    };

    if (this.ID) {
      const response = this.getDataFromStorage(this.ID);

      if (response) {
        this.data.kitname = response.name;
        const [terms, definitions] = this.getTermsFromCollection(response.collection);
        this.data.counter = response.collection.length;
        this.data.terms = terms;
        this.data.definitions = definitions;
        this.data.studied = response.studied;

        this.headerText = 'Modify item';
      } else {
        this.errorPage = true;
        this.pageClassName = 'error';
        this.headerText = '404';
      }
    }
  }

  getV(arr, key) {
    return this.data[arr][key] ? this.data[arr][key] : '';
  }

  getTermsFromForm(form) {
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

  getTermsFromCollection(collection) {
    const terms = [];
    const definitions = [];

    collection.forEach((el) => {
      terms.push(el.term);
      definitions.push(el.definition);
    });

    return [terms, definitions];
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
    this.data.kitname = form.elements['kitname'].value;

    const [terms, definitions] = this.getTermsFromForm(form);
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
      if (!this.data.kitname) {
        this.errorForm = true;
      } else if (this.storageAvailable) {
        this.saveDataToStorage(this.formatDataBeforeSave());
        this.redirect('/');
      }
    }

    this.rerender();
  }

  formatDataBeforeSave() {
    const data = {};
    const timestamp = new Date().getTime();

    data.id = timestamp;
    data.name = this.data.kitname;
    data.studied = this.data.studied;
    data.date = timestamp;
    data.collection = [];

    for (let i = 0; i < this.data.terms.length; i++) {
      data.collection.push({
        term: this.data.terms[i],
        definition: this.data.definitions[i]
      });
    }

    return data;
  }

  saveDataToStorage(data) {
    let appDB = localStorage.getItem('app-db');
    if (!appDB) {
      appDB = [data];
    } else {
      appDB = JSON.parse(appDB);
      appDB.push(data);
    }
    localStorage.setItem('app-db', JSON.stringify(appDB));
  }

  getDataFromStorage(id) {
    let appDB = localStorage.getItem('app-db');
    appDB = JSON.parse(appDB);
    return appDB && appDB.length ? appDB.find((el) => el.id === id) : undefined;
  }

  content() {
    if (this.errorPage) {
      const messageBlock = this.createBox('p', 'message', 'Set not found');
      return this.wrapper(messageBlock, this.pageClassName, this.headerText);
    }

    const form = this.createForm('addform', this.onFormSubmit, this.onFormClick);

    const kitnameBlock = this.createBox('p', 'datain');
    kitnameBlock.appendChild(this.createInput('text', 'kitname', this.data.kitname, 'name'));
    if (this.errorForm) {
      kitnameBlock.appendChild(this.createBox('span', 'message', ' ' + this.errorFormMessage));
    }
    form.appendChild(kitnameBlock);

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

    return this.wrapper(form, this.pageClassName, this.headerText);
  }
}

class NotFoundPage extends Page {
  content() {
    const messageBlock = this.createBox('p', 'message', 'Page not found');
    return this.wrapper(messageBlock, 'error', '404');
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
        Page: ModPage,
        title: 'Add new item'
      },
      {
        path: '/modify/:id',
        Page: ModPage,
        title: 'Modify item'
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

    if (this.storageAvailable('localStorage')) {
      this.storageAvailable = true;
    } else {
      this.storageAvailable = false;
      confirm('To use this application you must enable local storage support.');
    }

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

      this.currentPage = new route.Page({
        rerender: this.rerender,
        storageAvailable: this.storageAvailable,
        redirect: this.router.redirect,
        params: route.params
      });
    }

    this.rerender();
  }

  storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      let x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      const e22 = 22;
      const e1014 = 1014;
      const eZero = 0;
      const exp = e instanceof DOMException;
      const exc = e.name === 'QuotaExceededError';
      const stor = e.name === 'NS_ERROR_DOM_QUOTA_REACHED' && storage && storage.length !== eZero;
      return exp && (e.code === e22 || e.code === e1014 || exc || stor);
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
