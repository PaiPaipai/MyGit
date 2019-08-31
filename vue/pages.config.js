function getEntry(name) {
    console.log(`src/${name}/main.js`)
    return {
        entry: `src/${name}/main.js`,
        chunk: name,
        template: 'public/index.html',
        filename: `${name}.html`,
        chunks: ['chunk-vendors', 'chunk-common', name]
    }
}
const pages = {
    index: getEntry('index'),
    test:getEntry('test'),
    teamManage:getEntry('teamManage'),
    vacationManage:getEntry('vacationManage'),
}
module.exports = pages