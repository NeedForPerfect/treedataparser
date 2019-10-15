import './style.css';

import treeGroups from './groups';


class treeDataParser {

  treeData: any[] = [];
  units: any[] = [];

  constructor() {
    this.treeData = treeGroups;
  }

  private isUnitsArray(items) {
  return items.some(i => {
    if (i.data.unitId) {
    return true;
    }
  });
 };

  parseTree(current, params = { deep: 0 }) {
    params.deep = params.deep + 1; // deep 1 When Parent
    current.forEach(treeItem => {
      if (treeItem.children && !this.isUnitsArray(treeItem.children)) {
        this.parseTree(treeItem.children);
      }
      if (treeItem.children && this.isUnitsArray(treeItem.children)) {
          this.units = [ ...this.units, ...treeItem.children ];
      }
    });
    params.deep = params.deep - 1;
}


parseAndShowUnits() {
  this.parseTree(this.treeData);
  console.log(this.units);
}


}

let parser = new treeDataParser();
parser.parseAndShowUnits();