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

  generate(content) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('class', this.className);

    const headerElement = document.createElement('h1');
    const headerElementText = document.createTextNode(this.headerText);
    headerElement.appendChild(headerElementText);
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
    return this.generate(content);
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
      definitions: []
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onFormClick(event) {
    const isAdd = event.target.name === 'add';
    // const isSave = event.target.name === 'save';

    if (isAdd) {
      const form = document.getElementById('addform');

      const newsetname = form.elements['newsetname'];
      const terms = form.elements['terms[]'];
      const definitions = form.elements['definitions[]'];

      this.data.newsetname = newsetname.value;

      if (terms && definitions) {
        const newTerms = [];
        const newDefinitions = [];

        if (!terms.length) {
          newTerms.push(terms.value);
          newDefinitions.push(definitions.value);
        } else {
          for (let i = 0; i < terms.length; i++) {
            newTerms.push(terms[i].value);
            newDefinitions.push(definitions[i].value);
          }
        }

        this.data.terms = newTerms;
        this.data.definitions = newDefinitions;
      }

      this.data.counter = this.data.counter + 1;

      this.rerender();
    }
  }

  content() {
    const form = document.createElement('form');
    form.setAttribute('name', 'addform');
    form.setAttribute('id', 'addform');
    form.addEventListener('submit', this.onFormSubmit);
    form.addEventListener('click', this.onFormClick);

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'newsetname');
    inputName.setAttribute('value', this.data.newsetname ? this.data.newsetname : '');
    inputName.setAttribute('placeholder', 'name');
    form.appendChild(inputName);

    const buttonsBlock = document.createElement('p');
    buttonsBlock.setAttribute('class', 'buttons');

    const btnAdd = document.createElement('button');
    btnAdd.setAttribute('type', 'button');
    btnAdd.setAttribute('name', 'add');
    btnAdd.appendChild(document.createTextNode('Add terms'));
    buttonsBlock.appendChild(btnAdd);

    const btnSave = document.createElement('button');
    btnSave.setAttribute('type', 'button');
    btnSave.setAttribute('name', 'save');
    btnSave.appendChild(document.createTextNode('Save changes'));
    buttonsBlock.appendChild(btnSave);

    const btnCancel = document.createElement('button');
    btnCancel.setAttribute('type', 'button');
    btnCancel.setAttribute('name', 'cancel');
    btnCancel.appendChild(document.createTextNode('Cancel'));
    buttonsBlock.appendChild(btnCancel);

    form.appendChild(buttonsBlock);

    for (let i = 0; i < this.data.counter; i++) {
      const dl = document.createElement('div');
      dl.setAttribute('class', 'card');

      const dt = document.createElement('input');
      dt.setAttribute('type', 'text');
      dt.setAttribute('name', 'terms[]');
      dt.setAttribute('value', this.data.terms[i] ? this.data.terms[i] : '');
      dt.setAttribute('placeholder', 'Enter term');

      const dd = document.createElement('input');
      dd.setAttribute('type', 'text');
      dd.setAttribute('name', 'definitions[]');
      dd.setAttribute('value', this.data.definitions[i] ? this.data.definitions[i] : '');
      dd.setAttribute('placeholder', 'Enter definition');

      dl.appendChild(dt);
      dl.appendChild(dd);
      form.appendChild(dl);
    }

    return this.generate(form);
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
    return this.generate(content);
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
    return this.generate(content);
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
