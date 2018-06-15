jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'transform-url', null, 'with-router-import');
defineTest(__dirname, 'transform-url', null, 'without-import');
defineTest(__dirname, 'transform-url', null, 'already-using-withrouter');
defineTest(__dirname, 'transform-url', null, 'using-inline-class');
defineTest(__dirname, 'transform-url', null, 'export-default-variable');
defineTest(__dirname, 'transform-url', null, 'export-default-variable-wrapping');
defineTest(__dirname, 'transform-url', null, 'no-transform');
defineTest(__dirname, 'transform-url', null, 'no-transform-method');
defineTest(__dirname, 'transform-url', null, 'wrapping-export');
defineTest(__dirname, 'transform-url', null, 'variable-export');
defineTest(__dirname, 'transform-url', null, 'arrow-function-component');
defineTest(__dirname, 'transform-url', null, 'destructuring-this');
defineTest(__dirname, 'transform-url', null, 'destructuring-this-class');
defineTest(__dirname, 'transform-url', null, 'destructuring-this-props');
defineTest(__dirname, 'transform-url', null, 'destructuring-this-props-nested');
defineTest(__dirname, 'transform-url', null, 'with-nested-arrow-function');
defineTest(__dirname, 'transform-url', null, 'componentdidupdate');
defineTest(__dirname, 'transform-url', null, 'componentwillreceiveprops');
defineTest(__dirname, 'transform-url', null, 'first-parameter-hoc');
