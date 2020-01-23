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

function createElementsTreeByStructure(structure) {
  const rootElement = document.createElement('ul');

  for (const elem of structure) {
    if (elem.title) {
      const branchElement = document.createElement('li');

      const branchTitle = document.createElement('span');
      const branchTitleText = document.createTextNode(elem.title);
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

const fileTree = createElementsTreeByStructure(structure);
rootNode.appendChild(fileTree);
