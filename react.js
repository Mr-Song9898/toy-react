/**
 * 
 * @param {*} type 
 * @param {*} attributes 
 * @param  {...any} children 
 * @returns  真实DOM
 */
export function createElement(type, attributes, ...children) {
  let ele;

  if (typeof type === 'string') {
    ele = new ElementWrapper(type);
  } else {
    ele = new type();
  }

  for (let p in attributes) {
    ele.setAttribute(p, attributes[p]);
  }

  const insetChildren = (childs) => { 
    for (let child of childs) {
      if (typeof child === 'string') {
        child = new TextWrapper(child);
      }
  
      if (typeof child === 'object' && child instanceof Array) {
        insetChildren(child);
      } else {
        ele.appendChild(child);
      }
    }
  }

  insetChildren(children);

  return ele;
}

class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type); // 真实DOM
  }

  setAttribute (name, value) {
    if(name.match(/^on([\s\S]+)/)){
			this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c=>c.toLowerCase()), value);
		} else {
			this.root.setAttribute(name, value);
		}
  }

  appendChild(component) {
    // this.root.appendChild(component.root);
    const range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
  
    component._renderToDom(range);
  }

  _renderToDom(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content);
  }

  _renderToDom(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

export class Component {
  constructor () {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
    this._range = null;
  }

  setAttribute (name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  _renderToDom(range) {
    this._range = range;
    this.render()._renderToDom(range);
  }

  reRender(){
		this._range.deleteContents();
		this._renderToDom(this._range);
	}

  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.reRender();
      return;
    }

    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof oldState[p] !== 'object') {
          oldState[p] = newState[p];
        } else {
          merge(oldState[p], newState[p]);
        }
      }
    }

    merge(this.state, newState);

    this.reRender();
  }

  // get root () {
  //   if (!this._root) {
  //     this._root = this.render().root;
  //   }

  //   return this._root;
  // }
}

/**
 * 
 * @param {*} component  真实DOM --- VDOM
 * @param {*} parentNode 目标DOM
 */
export function render (component, parentNode) {
  const range = document.createRange();
  range.setStart(parentNode, 0);
  range.setEnd(parentNode, parentNode.childNodes.length);

  range.deleteContents();

  component._renderToDom(range);
}