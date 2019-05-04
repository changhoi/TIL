const path = require('path');

const sep = path.sep,
  delimiter = path.delimiter,
  dirname = path.dirname(__filename),
  extname = path.extname(__filename),
  basename = path.basename(__filename, extname),
  parse = path.parse(__filename),
  format = path.format({
    dir: __dirname,
    name: 'path',
    ext: 'js'
  }),
  nomalize = path.normalize('//User//dev'),
  isAbsolute = path.isAbsolute(__dirname),
  relative = path.relative('/User/dev/TIL', '/User/dev/project'),
  join = path.join(__dirname, '..'),
  resolve = path.resolve(__dirname, '..');

console.log(sep); // '/'
console.log(delimiter); // ':'
console.log(dirname); // '/Users/changhoi/dev/TIL/Node.js'
console.log(extname); // '.js'
console.log(basename); // 'path'
console.log(parse);
/* { root: '/',
     dir: '/Users/changhoi/dev/TIL/Node.js',
     base: 'path.js',
     ext: 'js',
     name: 'path' } 
*/
console.log(format); // '/Users/changhoi/dev/TIL/Node.js/pathjs'
console.log(nomalize); // '/User/dev'
console.log(isAbsolute); // true
console.log(relative); // '../project'
console.log(join); // '/Users/changhoi/dev/TIL'
console.log(resolve); // '/Users/changhoi/dev/TIL'

/**
 * path.resolve()는 /를 만나면 절대 경로로 인식해서 앞의 경로를 무시하고
 * path.join()은 상대경로로 처리한다.
 *
 * path.resolve('/a', '/b', '/c') // '/c'
 * path.join('/a,'/b', /c) // '/a/b/c'
 */
