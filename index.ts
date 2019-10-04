import './style.css';

import treeGroups from './groups';
// Write TypeScript code!

// console.log(treeGroups);

let searchQuery = 34511901;

document.getElementById('inputok').addEventListener('input', function(e: any) {
    searchQuery = e.target.value;
    searchTreeByUninName(treeGroups);
});


let isUnitExist = function(items) {
  return items.some(i => {
    if (i.data.physicalUnitId.startsWith(searchQuery)) {
    return true;
  } 
  });
}

let isUnitsArray = function(items) {
  return items.some(i => {
    if (i.data.unitId) {
    return true;
    }
  });
 };


let deep = 0;
let currentRoot = null;
let pathToCurrentResulItem = []; // From Parent to
let resutItems = [];
let searchTreeByUninName = function(current) {
    deep = deep + 1; // deep 1 When Parent
    current.forEach(treeItem => {
      if (deep === 1) {
        currentRoot = treeItem;
        pathToCurrentResulItem = [];
      }
      pathToCurrentResulItem[deep - 1] = treeItem.data.name;
      if (treeItem.children && !isUnitsArray(treeItem.children)) {
        searchTreeByUninName(treeItem.children);
      }
      if (treeItem.children && isUnitsArray(treeItem.children) && isUnitExist(treeItem.children)) {
          console.log('Exist', 'PathTOCurrentFindUnit', pathToCurrentResulItem);
          // here Each object from Path Expanded = true;
          resutItems.push(currentRoot);
      }
    });
    deep = deep - 1;
}
searchTreeByUninName(treeGroups);


  


