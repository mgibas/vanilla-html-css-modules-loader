const fs = require('fs')
const classRegex = /<.*(class="[\w-\s]*").*>/gm

module.exports = function(content, map, meta) {
  let mapPath = this.resourcePath.replace('.html','.scss.json')
  let map = JSON.parse(fs.readFileSync(mapPath))
  let mapClasses = Object.keys(map) 

  let result = content
  let match = classRegex.exec(content)
  while (match != null) {
    let mapped = match[1]
    for(let c of mapClasses) {
      mapped = mapped.replace(c, map[c])  
    }
    result = result.replace(match[1], mapped)
    match = classRegex.exec(content);
  }
  return result
};
