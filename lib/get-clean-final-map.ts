'use strict';

import {NluMap, NluMapItem} from "./index";
import {getPath} from "./utils";

////////////////////////////////////////////////////////////////////////////

export const getCleanMap =  (mainDep: NluMapItem, map: NluMap, opts: any): NluMap => {
  
  const newMap: NluMap = {};
  
  const getRelevantItems =  (v: string) => {
    
    if (map[v] && !newMap[v]) {
      
      newMap[v] = map[v];
      const list = map[v].deps;
      
      if (!Array.isArray(list)) {
        throw new Error('list should be an array, but is not an array type: ' + JSON.stringify(map[v]));
      }
      
      const mapPath = getPath(map, newMap[v], opts);
      
      list.forEach(l => {
        getRelevantItems(mapPath(l));
      });
    }
    
  };
  
  getRelevantItems(mainDep.path);
  
  
  return newMap;
};

export const getCleanMap2 =  (rootPackageName: string, map: NluMap): NluMap => {
  
  const newMap: NluMap = {};
  
  const getRelevantItems =  (v: string) => {
    
    if (map[v] && !newMap[v]) {
      
      newMap[v] = map[v];
      
      const list = map[v].deps;
      
      if (!Array.isArray(list)) {
        throw new Error('list should be an array, but is not an array type: ' + JSON.stringify(map[v]));
      }
      
      list.forEach(function (l) {
        getRelevantItems(l);
      });
    }
    
  };
  
  getRelevantItems(rootPackageName);
  
  
  return newMap;
};


export const getCleanMapOfOnlyPackagesWithNluJSONFiles =  (rootPackageName: string, map: NluMap): NluMap => {

  return Object.keys(map).reduce((a,b) => {

    if(map[b].hasNLUJSONFile){
       a[b] = map[b];
    }
    return a;

  }, {} as NluMap)


};
