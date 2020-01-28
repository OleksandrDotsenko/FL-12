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
  createBox(tagName, tagClass, text = '', id = '') {
    const newTag = document.createElement(tagName);
    newTag.setAttribute('class', tagClass);
    if (text !== '') {
      newTag.appendChild(document.createTextNode(text));
    }
    if (id !== '') {
      newTag.setAttribute('id', id);
    }
    return newTag;
  }

  createInput(type, name, value, placeholder, tagClass = '') {
    const inputName = document.createElement('input');
    inputName.setAttribute('type', type);
    inputName.setAttribute('name', name);
    inputName.setAttribute('value', value);
    inputName.setAttribute('placeholder', placeholder);
    if (tagClass !== '') {
      inputName.setAttribute('class', tagClass);
    }
    return inputName;
  }

  createButton(type, name, text, value = '', tagClass = '') {
    const btn = document.createElement('button');
    btn.setAttribute('type', type);
    btn.setAttribute('name', name);
    if (value !== '') {
      btn.setAttribute('value', value);
    }
    if (tagClass !== '') {
      btn.setAttribute('class', tagClass);
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

  createInnerLink(path, text, tagClass = '', tagTitle = '') {
    const newLink = document.createElement('a');
    newLink.setAttribute('href', '#' + path);
    newLink.appendChild(document.createTextNode(text));
    if (tagClass !== '') {
      newLink.setAttribute('class', tagClass);
    }
    if (tagTitle !== '') {
      newLink.setAttribute('title', tagTitle);
    }
    return newLink;
  }

  createItem(id, index, titleClass, titleVal) {
    const newItem = document.createElement('li');
    newItem.appendChild(this.createBox('span', titleClass, titleVal, 'id-' + index));
    newItem.appendChild(this.createButton('button', 'modify', 'edit', id, 'modify'));
    newItem.appendChild(this.createButton('button', 'remove', 'remove', index, 'remove'));
    return newItem;
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
  constructor(options) {
    super();

    this.onListClick = this.onListClick.bind(this);

    this.redirect = options.redirect;
    this.rerender = options.rerender;
    this.storageName = options.storageName;

    this.pageClassName = 'page';
    this.headerText = 'List of sets';

    this.data = {
      list: []
    };

    const response = this.getDataFromStorage();
    if (response) {
      this.data.list = response;
    }

    window.addEventListener('unload', this.onWindowUnload.bind(this));
  }

  onWindowUnload() {
    this.saveDataToStorage();
  }

  closePage() {
    this.saveDataToStorage();
  }

  saveDataToStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.data.list));
  }

  getDataFromStorage() {
    let storage = localStorage.getItem(this.storageName);
    if (storage) {
      storage = JSON.parse(storage);
      if (storage.length) {
        return storage;
      }
    }
  }

  onListClick(event) {
    const onModify = event.target.className === 'modify';
    const onRemove = event.target.className === 'remove';
    const onCommon = event.target.className === 'common';
    const onStudied = event.target.className === 'studied';

    if (onRemove) {
      this.data.list.splice(event.target.value, 1);

      this.rerender();
    }

    if (onCommon || onStudied) {
      const numStart = 3;
      const id = event.target.id.substring(numStart);
      if (this.data.list[id]) {
        this.data.list[id].studied = !this.data.list[id].studied;
      }

      this.rerender();
    }

    if (onModify) {
      this.redirect('/modify/' + event.target.value);
    }
  }

  content() {
    const content = document.createElement('div');
    const addLink = this.createInnerLink('/add', '+', 'add', 'Add new');
    content.appendChild(addLink);

    if (!this.data.list.length) {
      return this.wrapper(content, this.pageClassName, this.headerText);
    }

    const list = [...this.data.list];
    list.sort((elX, elY) => elX.date - elY.date);

    const listBlock = this.createBox('ul', 'items');

    list.forEach((el, index) => {
      if (!el.studied) {
        listBlock.appendChild(this.createItem(el.id, index, 'common', el.kitname));
      }
    });

    list.forEach((el, index) => {
      if (el.studied) {
        listBlock.appendChild(this.createItem(el.id, index, 'studied', el.kitname));
      }
    });

    listBlock.addEventListener('click', this.onListClick);
    content.appendChild(listBlock);

    return this.wrapper(content, this.pageClassName, this.headerText);
  }
}

class ModPage extends Page {
  constructor(options) {
    super();

    this.onFormClick = this.onFormClick.bind(this);

    this.rerender = options.rerender;
    this.storageAvailable = options.storageAvailable;
    this.redirect = options.redirect;

    this.storageName = options.storageName;

    this.pageClassName = 'page';
    this.headerText = 'Add new set';

    this.errorPage = false;
    this.errorForm = false;
    this.errorFormMessage = '* field is required';

    this.termsCounter = 0;

    this.data = {
      id: Number(options.params.id),
      kitname: '',
      collection: [],
      studied: false,
      date: new Date().getTime()
    };

    if (this.data.id) {
      const response = this.getDataFromStorage(this.data.id);

      if (response) {
        this.data = Object.assign({}, response);
        this.termsCounter = this.data.collection.length;
        this.headerText = 'Modify set';
      } else {
        this.errorPage = true;
        this.pageClassName = 'error';
        this.headerText = '404';
      }
    }
  }

  valTerm(i) {
    return this.data.collection[i] ? this.data.collection[i].term : '';
  }

  valDefinition(i) {
    return this.data.collection[i] ? this.data.collection[i].definition : '';
  }

  collectionFromForm(form) {
    const collection = [];
    const formTerms = form.elements['terms[]'];
    const formDefinitions = form.elements['definitions[]'];

    if (formTerms && formDefinitions) {
      if (!formTerms.length) {
        if (formTerms.value || formDefinitions.value) {
          collection.push({
            term: formTerms.value,
            definition: formDefinitions.value
          });
        }
      } else {
        for (let i = 0; i < formTerms.length; i++) {
          if (formTerms[i].value || formDefinitions[i].value) {
            collection.push({
              term: formTerms[i].value,
              definition: formDefinitions[i].value
            });
          }
        }
      }
    }

    return collection;
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onFormClick(event) {
    const isAdd = event.target.name === 'add';
    const isSave = event.target.name === 'save';
    const isDelTerm = event.target.name === 'delterm';
    const isCancel = event.target.name === 'cancel';

    if (!isAdd && !isSave && !isDelTerm && !isCancel) {
      return;
    }

    if (isCancel) {
      this.redirect('/');
    }

    const form = document.getElementById('mainform');
    this.data.kitname = form.elements['kitname'].value;

    this.data.collection = this.collectionFromForm(form);

    if (isAdd) {
      this.termsCounter = this.termsCounter + 1;
    }

    if (isDelTerm) {
      this.data.collection.splice(event.target.value, 1);
      this.termsCounter = this.termsCounter - 1;
    }

    if (isSave) {
      if (!this.data.kitname) {
        this.errorForm = true;
      } else if (this.storageAvailable) {
        if (this.data.id) {
          this.updateDataInStorage();
        } else {
          this.saveDataToStorage();
        }
        this.redirect('/');
      }
    }

    this.rerender();
  }

  saveDataToStorage() {
    const data = Object.assign({}, this.data, { id: this.data.date });
    let storage = localStorage.getItem(this.storageName);
    if (!storage) {
      storage = [];
    } else {
      storage = JSON.parse(storage);
    }
    storage.push(data);
    localStorage.setItem(this.storageName, JSON.stringify(storage));
  }

  updateDataInStorage() {
    const data = Object.assign({}, this.data);
    let storage = localStorage.getItem(this.storageName);
    storage = JSON.parse(storage);
    storage.forEach((el, index, arr) => {
      if (el.id === data.id) {
        arr[index] = data;
      }
    });
    localStorage.setItem(this.storageName, JSON.stringify(storage));
  }

  getDataFromStorage(id) {
    let storage = localStorage.getItem(this.storageName);
    if (storage) {
      storage = JSON.parse(storage);
      if (storage.length) {
        return storage.find((el) => el.id === id);
      }
    }
  }

  content() {
    if (this.errorPage) {
      const messageBlock = this.createBox('p', 'message', 'Set not found');
      return this.wrapper(messageBlock, this.pageClassName, this.headerText);
    }

    const form = this.createForm('mainform', this.onFormSubmit, this.onFormClick);

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

    for (let i = 0; i < this.termsCounter; i++) {
      const dl = this.createBox('div', 'card');
      const termText = 'Enter term';
      const definitionText = 'Enter definition';
      dl.appendChild(this.createInput('text', 'terms[]', this.valTerm(i), termText, 'term'));
      dl.appendChild(this.createInput('text', 'definitions[]', this.valDefinition(i), definitionText, 'definition'));
      dl.appendChild(this.createButton('button', 'delterm', 'x remove', i, 'delterm'));
      form.appendChild(dl);
    }

    return this.wrapper(form, this.pageClassName, this.headerText);
  }
}

class NotFoundPage extends Page {
  content() {
    const messageBlock = this.createInnerLink('/', 'Main page');
    return this.wrapper(messageBlock, 'error', '404 Page not found');
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
        title: 'Add new set'
      },
      {
        path: '/modify/:id',
        Page: ModPage,
        title: 'Modify set'
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
    this.storageName = 'app-storage';

    if (this.storageAvailable('localStorage')) {
      this.storageAvailable = true;
    } else {
      this.storageAvailable = false;
      alert('To use this application you must enable local storage support.');
    }

    this.rerender = this.rerender.bind(this);
    window.addEventListener('hashchange', this.handlerHashchange.bind(this));
  }

  init() {
    this.handlerHashchange();
  }

  handlerHashchange(event) {
    if (!this.storageAvailable) {
      return;
    }

    const route = this.router.getRoute(event);

    if (this.currentPage) {
      if (this.currentPage.closePage) {
        this.currentPage.closePage();
      }
    }

    if (route) {
      document.title = 'App :: ' + route.title;

      this.currentPage = new route.Page({
        rerender: this.rerender,
        storageAvailable: this.storageAvailable,
        redirect: this.router.redirect,
        params: route.params,
        storageName: this.storageName
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
