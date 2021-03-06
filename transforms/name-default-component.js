import { basename, extname } from 'path';

const camelCase = (value) => {
	const val = value.replace(/[-_\s.]+(.)?/g, (match, chr) =>
		(chr ? chr.toUpperCase() : ''));
	return val.substr(0, 1).toUpperCase() + val.substr(1);
};

const isValidIdentifier = (value) => /^[a-zA-ZÀ-ÿ][0-9a-zA-ZÀ-ÿ]+$/.test(value);

export default function transformer(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	let hasModifications;

	const returnsJSX = (node) =>
		node.type === 'JSXElement' ||
		(node.type === 'BlockStatement' &&
			j(node)
				.find(j.ReturnStatement)
				.some(
					(path) =>
						path.value.argument && path.value.argument.type === 'JSXElement'
				));

	const hasRootAsParent = (path) => {
		const program = path.parentPath.parentPath.parentPath.parentPath.parentPath;
		return !program || (program && program.value && program.value.type === 'Program');
	};

	const nameFunctionComponent = (path) => {
		const node = path.value;

		if (!node.declaration) {
			return;
		}

		const isArrowFunction =
			node.declaration.type === 'ArrowFunctionExpression' &&
			returnsJSX(node.declaration.body);
		const isAnonymousFunction =
			node.declaration.type === 'FunctionDeclaration' && !node.declaration.id;

		if (!(isArrowFunction || isAnonymousFunction)) {
			return;
		}

		const fileName = basename(file.path, extname(file.path));
		let name = camelCase(fileName);

		// If the generated name looks off, don't add a name
		if (!isValidIdentifier(name)) {
			return;
		}

		// Add `Component` to the end of the name if an identifier with the
		// same name already exists
		while (root.find(j.Identifier, { name }).some(hasRootAsParent)) {
			// If the name is still duplicated then don't add a name
			if (name.endsWith('Component')) {
				return;
			}
			name += 'Component';
		}

		hasModifications = true;

		if (isArrowFunction) {
			path.insertBefore(
				j.variableDeclaration('const', [
					j.variableDeclarator(j.identifier(name), node.declaration)
				])
			);

			node.declaration = j.identifier(name);
		} else {
			// Anonymous Function
			node.declaration.id = j.identifier(name);
		}
	};

	root.find(j.ExportDefaultDeclaration).forEach(nameFunctionComponent);

	return hasModifications ? root.toSource(options) : null;
}
