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

// Driver
class Driver {
  constructor(options) {
    console.log('[Driver constructor]');
  }
}

// Pages
class MainPage extends Driver {
  constructor(options) {
    super(options);

    console.log('[MainPage constructor]');
  }
}

class AddPage extends Driver {
  constructor(options) {
    super(options);

    console.log('[AddPage constructor]');
  }
}

class ModifyPage extends Driver {
  constructor(options) {
    super(options);

    console.log('[ModifyPage constructor]');
  }
}

class NotFoundPage extends Driver {
  constructor(options) {
    super(options);

    console.log('[NotFoundPage constructor]');
  }
}

// App
class App extends Driver {
  constructor(options) {
    super(options);

    window.addEventListener('hashchange', this.handlerHashchange.bind(this));
  }

  init() {
    this.handlerHashchange();
  }

  handlerHashchange(event) {
    const route = routerService.getRoute(event);
    if (route) {
      document.title = 'My App :: ' + route.title;
      console.log('[ROUTE]', route);
    }
  }
}

// Routes
const routerService = new Router([
  {
    path: '',
    route: MainPage,
    title: 'Main page'
  },
  {
    path: '/add',
    route: AddPage,
    title: 'Add'
  },
  {
    path: '/modify/:id',
    route: ModifyPage,
    title: 'Modify'
  },
  {
    path: '/404',
    route: NotFoundPage,
    title: 'Page not found'
  }
]);

new App({ container: document.getElementById('root') }).init();
