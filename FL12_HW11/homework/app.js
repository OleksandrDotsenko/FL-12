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
  titleTag: 'div',
  titleClass: 'el-title',
  openClass: 'open',
  closeClass: 'close'
};

function createElementsTreeByStructure(structure) {
  const rootElement = document.createElement('ul');

  for (const elem of structure) {
    if (elem.title) {
      const branchElement = document.createElement('li');
      const branchTitle = document.createElement(options.titleTag);
      const branchTitleText = document.createTextNode(elem.title);
      branchElement.setAttribute('class', options.closeClass);
      branchTitle.setAttribute('class', options.titleClass);

      branchTitle.appendChild(branchTitleText);
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
  let className = element.getAttribute('class');
  if (className) {
    if (className.indexOf(options.openClass) >= 0) {
      const newClass = className.replace(options.openClass, options.closeClass);
      element.setAttribute('class', newClass);
    }
    if (className.indexOf(options.closeClass) >= 0) {
      const newClass = className.replace(options.closeClass, options.openClass);
      element.setAttribute('class', newClass);
    }
  }
}

const fileTree = createElementsTreeByStructure(structure);
fileTree.addEventListener('click', onFileTreeClick);
rootNode.appendChild(fileTree);
