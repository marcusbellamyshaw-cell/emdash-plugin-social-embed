function isPortableTextSpan(node) {
	return node._type === "span" && "text" in node && typeof node.text == "string" && (node.marks === void 0 || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark == "string"));
}
function isPortableTextBlock(node) {
	return typeof node._type == "string" && node._type[0] !== "@" && (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && node.markDefs.every((def) => typeof def._key == "string")) && "children" in node && Array.isArray(node.children) && node.children.every((child) => typeof child == "object" && "_type" in child);
}
function isPortableTextListItemBlock(block) {
	return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem == "string" && (block.level === void 0 || typeof block.level == "number");
}
function isPortableTextToolkitList(block) {
	return block._type === "@list";
}
function isPortableTextToolkitSpan(span) {
	return span._type === "@span";
}
function isPortableTextToolkitTextNode(node) {
	return node._type === "@text";
}
const knownDecorators = [
	"strong",
	"em",
	"code",
	"underline",
	"strike-through"
];
function sortMarksByOccurences(span, index, blockChildren) {
	if (!isPortableTextSpan(span) || !span.marks || !span.marks.length) return [];
	let marks = span.marks.slice(), occurences = {};
	return marks.forEach((mark) => {
		occurences[mark] = 1;
		for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
			let sibling = blockChildren[siblingIndex];
			if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) occurences[mark]++;
			else break;
		}
	}), marks.sort((markA, markB) => sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
	let aOccurences = occurences[markA], bOccurences = occurences[markB];
	if (aOccurences !== bOccurences) return bOccurences - aOccurences;
	let aKnownPos = knownDecorators.indexOf(markA), bKnownPos = knownDecorators.indexOf(markB);
	return aKnownPos === bKnownPos ? markA.localeCompare(markB) : aKnownPos - bKnownPos;
}
function buildMarksTree(block) {
	let { children } = block, markDefs = block.markDefs ?? [];
	if (!children || !children.length) return [];
	let sortedMarks = children.map(sortMarksByOccurences), rootNode = {
		_type: "@span",
		children: [],
		markType: "<unknown>"
	}, nodeStack = [rootNode];
	for (let i = 0; i < children.length; i++) {
		let span = children[i];
		if (!span) continue;
		let marksNeeded = sortedMarks[i] || [], pos = 1;
		if (nodeStack.length > 1) for (; pos < nodeStack.length; pos++) {
			let mark = nodeStack[pos]?.markKey || "", index = marksNeeded.indexOf(mark);
			if (index === -1) break;
			marksNeeded.splice(index, 1);
		}
		nodeStack = nodeStack.slice(0, pos);
		let currentNode = nodeStack[nodeStack.length - 1];
		if (currentNode) {
			for (let markKey of marksNeeded) {
				let markDef = markDefs?.find((def) => def._key === markKey), node = {
					_type: "@span",
					_key: span._key,
					children: [],
					markDef,
					markType: markDef ? markDef._type : markKey,
					markKey
				};
				currentNode.children.push(node), nodeStack.push(node), currentNode = node;
			}
			if (isPortableTextSpan(span)) {
				let lines = span.text.split("\n");
				for (let line = lines.length; line-- > 1;) lines.splice(line, 0, "\n");
				currentNode.children = currentNode.children.concat(lines.map((text) => ({
					_type: "@text",
					text
				})));
			} else currentNode.children = currentNode.children.concat(span);
		}
	}
	return rootNode.children;
}
function nestLists(blocks, mode) {
	let tree = [], currentList;
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		if (block) {
			if (!isPortableTextListItemBlock(block)) {
				tree.push(block), currentList = void 0;
				continue;
			}
			if (!currentList) {
				currentList = listFromBlock(block, i, mode), tree.push(currentList);
				continue;
			}
			if (blockMatchesList(block, currentList)) {
				currentList.children.push(block);
				continue;
			}
			if ((block.level || 1) > currentList.level) {
				let newList = listFromBlock(block, i, mode);
				if (mode === "html") {
					let lastListItem = currentList.children[currentList.children.length - 1], newLastChild = {
						...lastListItem,
						children: [...lastListItem.children, newList]
					};
					currentList.children[currentList.children.length - 1] = newLastChild;
				} else currentList.children.push(newList);
				currentList = newList;
				continue;
			}
			if ((block.level || 1) < currentList.level) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, block);
				if (match) {
					currentList = match, currentList.children.push(block);
					continue;
				}
				currentList = listFromBlock(block, i, mode), tree.push(currentList);
				continue;
			}
			if (block.listItem !== currentList.listItem) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, { level: block.level || 1 });
				if (match && match.listItem === block.listItem) {
					currentList = match, currentList.children.push(block);
					continue;
				} else {
					currentList = listFromBlock(block, i, mode), tree.push(currentList);
					continue;
				}
			}
			console.warn("Unknown state encountered for block", block), tree.push(block);
		}
	}
	return tree;
}
function blockMatchesList(block, list) {
	return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode) {
	return {
		_type: "@list",
		_key: `${block._key || `${index}`}-parent`,
		mode,
		level: block.level || 1,
		listItem: block.listItem,
		children: [block]
	};
}
function findListMatching(rootNode, matching) {
	let level = matching.level || 1, style = matching.listItem || "normal", filterOnType = typeof matching.listItem == "string";
	if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) return rootNode;
	if (!("children" in rootNode)) return;
	let node = rootNode.children[rootNode.children.length - 1];
	return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
function spanToPlainText(span) {
	let text = "";
	return span.children.forEach((current) => {
		isPortableTextToolkitTextNode(current) ? text += current.text : isPortableTextToolkitSpan(current) && (text += spanToPlainText(current));
	}), text;
}
const leadingSpace = /^\s/, trailingSpace = /\s$/;
function toPlainText(block) {
	let blocks = Array.isArray(block) ? block : [block], text = "";
	return blocks.forEach((current, index) => {
		if (!isPortableTextBlock(current)) return;
		let pad = !1;
		current.children.forEach((span) => {
			isPortableTextSpan(span) ? (text += pad && text && !trailingSpace.test(text) && !leadingSpace.test(span.text) ? " " : "", text += span.text, pad = !1) : pad = !0;
		}), index !== blocks.length - 1 && (text += "\n\n");
	}), text;
}
const LIST_NEST_MODE_HTML = "html", LIST_NEST_MODE_DIRECT = "direct";
export { LIST_NEST_MODE_DIRECT, LIST_NEST_MODE_HTML, buildMarksTree, isPortableTextBlock, isPortableTextListItemBlock, isPortableTextSpan, isPortableTextToolkitList, isPortableTextToolkitSpan, isPortableTextToolkitTextNode, nestLists, sortMarksByOccurences, spanToPlainText, toPlainText };

//# sourceMappingURL=index.js.map