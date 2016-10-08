//InvocationNode.js
import PaperNode from './Node';

class InvocationNode extends Node {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChildren([this.circle,this.text])
  }

  renderNode(){
    this.circle = new this.project.Path.Circle({
      center: [this.xPos, 20 + this.yPos],
      radius: 10,
      fillColor: '#749395'
    })
  }
}

export default InvocationNode;
