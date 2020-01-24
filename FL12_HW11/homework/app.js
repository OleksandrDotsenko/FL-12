const structure = [
  {
    folder: true,
    title: 'Films',
    children: [
      {
        title: 'Iron Man.avi'
      },
      {
        folder: true,
        title: 'Fantasy',
        children: [
          {
            title: 'The Lord of the Rings.avi'
          },
          {
            folder: true,
            title: 'New folder 1',
            children: false
          }
        ]
      }
    ]
  },
  {
    folder: true,
    title: 'Documents',
    children: [
      {
        folder: true,
        title: 'EPAM Homework answers',
        children: null
      }
    ]
  }
];

const rootNode = document.getElementById('root');

const options = {
  iconSet: 'material-icons',
  icons: {
    open: 'folder_open',
    close: 'folder'
  }
};

function createElementWithClass(type, className) {
  const newElement = document.createElement(type);
  newElement.setAttribute('class', className);
  return newElement;
}

function createElementsTreeByStructure(structure) {
  const rootElement = document.createElement('ul');

  for (const elem of structure) {
    if (elem.title) {
      const elementType = elem.folder ? 'folder' : 'insert_drive_file';
      const branchElement = createElementWithClass('li', 'close');
      const branchTitle = createElementWithClass('div', 'tree-title clickable');
      const branchIcon = createElementWithClass('i', `${options.iconSet} ${elementType} clickable`);
      branchIcon.appendChild(document.createTextNode(elementType));
      branchTitle.appendChild(branchIcon);

      const branchText = createElementWithClass('span', 'clickable');
      branchText.appendChild(document.createTextNode(elem.title));
      branchTitle.appendChild(branchText);

      branchElement.appendChild(branchTitle);

      if (elem.folder) {
        if (elem.children) {
          const children = createElementsTreeByStructure(elem.children);
          branchElement.appendChild(children);
        } else {
          const placeholder = createElementWithClass('div', 'placeholder');
          placeholder.appendChild(document.createTextNode('Folder is empty'));
          branchElement.appendChild(placeholder);
        }
      }

      rootElement.appendChild(branchElement);
    }
  }

  return rootElement;
}

function changeDisplay(element, className, classA, classB) {
  element.setAttribute('class', className.replace(classA, classB));
  const icon = element.firstElementChild.firstElementChild;
  if (icon.getAttribute('class').indexOf('folder') >= 0) {
    icon.textContent = options.icons[classB];
  }
}

function findRootElement(currentElement, rootElement = 'LI') {
  if (currentElement.nodeName === rootElement) {
    return currentElement;
  } else {
    return findRootElement(currentElement.parentElement, rootElement);
  }
}

function onTreeClick(event) {
  const currentElement = event.target;
  const currentClass = currentElement.getAttribute('class');

  if (!currentClass || currentClass.indexOf('clickable') < 0) {
    return;
  }

  const element = findRootElement(currentElement);
  const className = element.getAttribute('class');

  if (className.indexOf('open') >= 0) {
    changeDisplay(element, className, 'open', 'close');
  }
  if (className.indexOf('close') >= 0) {
    changeDisplay(element, className, 'close', 'open');
  }
}

function createTreeMenu() {
  const tree = createElementsTreeByStructure(structure);
  tree.addEventListener('click', onTreeClick);
  const treeRoot = createElementWithClass('div', 'tree');
  treeRoot.appendChild(tree);
  return treeRoot;
}

rootNode.appendChild(createTreeMenu());
