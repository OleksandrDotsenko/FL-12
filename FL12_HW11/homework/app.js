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
  rootTag: 'ul',
  branchTag: 'li',
  titleTag: 'span',
  iconTag: 'i',
  titleClass: 'el-title',
  openClass: 'open',
  closeClass: 'close',
  classFolder: 'folder',
  classFile: 'file',
  iconSet: 'material-icons',
  iconFolderOpen: 'folder_open',
  iconFolderClose: 'folder',
  iconFile: 'insert_drive_file'
};

function createElementsTreeByStructure(structure) {
  const rootElement = document.createElement(options.rootTag);

  for (const elem of structure) {
    if (elem.title) {
      const branchElement = document.createElement(options.branchTag);
      const branchIcon = document.createElement(options.iconTag);
      const branchTitle = document.createElement(options.titleTag);

      const branchTitleText = document.createTextNode(elem.title);
      const branchIconText = document.createTextNode(elem.folder ? options.iconFolderClose : options.iconFile);

      const elementType = elem.folder ? options.classFolder : options.classFile;

      branchElement.setAttribute('class', options.closeClass);
      branchTitle.setAttribute('class', options.titleClass);
      branchIcon.setAttribute('class', `${options.iconSet} ${elementType}`);

      branchIcon.appendChild(branchIconText);
      branchTitle.appendChild(branchTitleText);
      branchElement.appendChild(branchIcon);
      branchElement.appendChild(branchTitle);

      if (elem.folder && elem.children) {
        const children = createElementsTreeByStructure(elem.children);
        branchElement.appendChild(children);
      }

      rootElement.appendChild(branchElement);
    }
  }

  return rootElement;
}

function onFileTreeClick(event) {
  const element = event.target.parentElement;
  const className = element.getAttribute('class');

  if (className) {
    if (className.indexOf(options.openClass) >= 0) {
      const newClass = className.replace(options.openClass, options.closeClass);
      element.setAttribute('class', newClass);
      const icon = element.firstElementChild;
      if (icon) {
        const iconClass = icon.getAttribute('class');
        if (iconClass && iconClass.indexOf(options.classFolder) >= 0) {
          icon.textContent = options.iconFolderClose;
        }
      }
    }
    if (className.indexOf(options.closeClass) >= 0) {
      const newClass = className.replace(options.closeClass, options.openClass);
      element.setAttribute('class', newClass);
      const icon = element.firstElementChild;
      if (icon) {
        const iconClass = icon.getAttribute('class');
        if (iconClass && iconClass.indexOf(options.classFolder) >= 0) {
          icon.textContent = options.iconFolderOpen;
        }
      }
    }
  }
}

const fileTree = createElementsTreeByStructure(structure);
fileTree.addEventListener('click', onFileTreeClick);
rootNode.appendChild(fileTree);
