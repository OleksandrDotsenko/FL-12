// Router
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

// Pages
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
  constructor() {
    super('AddPage', 'Add new item');
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  onFormClick(event) {
    console.log(event.target.name);
  }

  content() {
    const form = document.createElement('form');
    form.setAttribute('name', 'addform');
    form.addEventListener('submit', this.onFormSubmit);
    form.addEventListener('click', this.onFormClick);

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'item');
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

// App
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
        route.Page = new route.Page();
      }

      this.content(route.Page.content());
    }
  }

  content(newNode) {
    if (!this.root.firstChild) {
      this.root.appendChild(newNode);
    } else {
      this.root.replaceChild(newNode, this.root.firstChild);
    }
  }
}

new App(document.getElementById('root')).init();
