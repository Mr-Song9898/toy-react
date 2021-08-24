import { createElement, render, Component } from './react';

class MyComponment extends Component {
  constructor (props) {
    super();

    this.state = {
      a: 1,
      b: 'b',
    }
  }

  render () {
    const { a, b } = this.state;
    return (
     <div>
        <div>my component</div>
        <button onClick={() => { this.setState({ a: a + 1 }) }}>add</button><br />
        <span>{a.toString()}</span>
        <span>{b}</span>
        {this.children}
     </div>
    )
  }
};

render(<MyComponment id="id" className="c">
  <h1>title</h1>
  <span>content</span>
  <div></div>
</MyComponment>, document.body);

