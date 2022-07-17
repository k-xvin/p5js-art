// run `node json.js`
const fs = require('fs');

// json = {
//     one: 1,
//     two: 2
// }
json



output = JSON.stringify(json);

fs.writeFile('./foo.json', output, (err) => {
    if (!err) {
        console.log('done');
    }
});