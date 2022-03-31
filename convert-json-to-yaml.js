const fs = require('fs');
const YAML = require('json-to-pretty-yaml');
const json = require('./seed-data.json');
 
function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}

Object.values(json.nodes).forEach(node => {
  let node_content = node.content
  delete node.content

  if(!node.title) node.title = getNewID()
  const yaml = YAML.stringify(node)

  const new_stub = 
`---
${yaml}
---
${node_content}
`

fs.writeFile(`./stubs/${node.title}`, new_stub, function(e){
  console.log(e)
});


})


// 34.05, -118.25

