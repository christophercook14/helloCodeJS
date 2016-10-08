const Node = require('./nodeConstructor');

// function that creates nodes for function declarations and expressions
const createDefinitionNode = function(id, node, parent, pathString, scope){
	var createdNode;

	// function declaration
	if (node.type === 'FunctionDeclaration') {
		createdNode = new Node(id, node.id ? node.id.name : '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
		if (parent && parent.type === 'ExportDefaultDeclaration') {
			createdNode.esmDefaultExport = true;
		}
	} 

	// function expression
	else if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
		// variable is declared then assigned to function definition
		if (parent && parent.type === 'VariableDeclarator') {
			createdNode = new Node(id, parent.id.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
		} 
		// function is defined as a parameter to another function's call, making it a callback function
		else if (parent && parent.type === 'CallExpression' || node.ancestor && node.ancestor.type === 'invocation') {
			createdNode = new Node(id, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
		} 
		// function is defined as a value inside an object literal
		else if (parent && parent.type === 'Property'){
			createdNode = new Node(id, parent.key.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
		}
		// function is assigned
		else if (parent && parent.type === 'AssignmentExpression') {
			// assigned to an object's property
			if (parent.left.type === 'MemberExpression') {
				createdNode = new Node(id, parent.left.property.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
				createdNode.object = parent.left.object.name;
			} 
			// assigned to a variable
			else if (parent.left.type === 'Identifier') {
				createdNode = new Node(id, parent.left.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
			}
		}
		// function is returned from another function 
		else if (parent && parent.type === 'ReturnStatement') {
			createdNode = new Node(id, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
		}
		else if (parent && parent.type === 'ExpressionStatement') {
			createdNode = new Node(id, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
		}
		// other
		else {
			// console.log('pathString', pathString);
			// console.log('node', node);
			// console.log('parent', parent)
		}
	}

	return createdNode;
	
};

// function that creates nodes for function invocations
const createInvocationNode = function(id, node, parent, pathString, scope){
	var createdNode;

	if (node.callee.type === 'Identifier') {
		createdNode = new Node(id, node.callee.name, 'invocation', pathString, node.loc.start, node.loc.end, scope);
		// console.log(chalk.red('a function named ' + node.callee.name + ' was invoked on line ' + node.callee.loc.start.line))
	} 
	
	else if (node.callee.type === 'MemberExpression') {
		createdNode = new Node(id, node.callee.property.name, 'invocation', pathString, node.loc.start, node.loc.end, scope);
		createdNode.object = node.callee.object.name;
		// console.log(chalk.red('a method named ' + node.callee.property.name + ' on object ' + node.callee.object.name + ' was invoked on line ' + node.callee.property.loc.start.line))
	} 

	else if (node.callee.type === 'CallExpression') {
		if (node.callee.callee.type === 'Identifier') {
			createdNode = new Node(id, 'function returned from ' + node.callee.callee.name, 'invocation', pathString, node.callee.callee.loc.start, node.callee.callee.loc.end, scope);
			// console.log(chalk.red('a function returned from a function named ' + node.callee.callee.name + ' was invoked on line ' + node.callee.callee.loc.start.line))
		} else if (node.callee.callee.type === 'MemberExpression') {
			createdNode = new Node(id, 'function returned from ' + node.callee.callee.property.name, 'invocation', pathString, node.loc.start, node.loc.end, scope);
			createdNode.object = node.callee.callee.object.name;
			// console.log(chalk.red('a function returned from a method named ' + node.callee.callee.property.name + ' on object ' + node.callee.callee.object.name + ' was invoked on line ' + node.callee.callee.property.loc.start.line))
		}	
	}		
	
	else {
		// console.log('pathString', pathString);
		// console.log('node', node);
		// console.log('parent', parent);
	}

	return createdNode;
};

module.exports = {createDefinitionNode, createInvocationNode};