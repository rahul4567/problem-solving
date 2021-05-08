/*  Input
[
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20,
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  },
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  }
]
Output:

[
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  },
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  }
]
*/

module.exports = function sortCategoriesForInsert (inputJson) {
  // Your code happens...
  ///   ... which calculates properJsonOutput
  let idMap = {};
  inputJson.forEach(function (value) {
    idMap[value.id] = value;
  });
  function sortByCat(idMapObj, parentId = null, result = []) {
    for(const property in idMapObj) {
      if (idMapObj[property].parent_id === parentId) {
        let idVal = idMapObj[property].id;
        result.push(idMapObj[property]);
        delete idMapObj[property];
        sortByCat(idMapObj, idVal, result);
      }
    }
    return result;
  }
  const properJsonOutput = sortByCat(idMap);
  return properJsonOutput
}
