const TOP_PADDING = window.innerHeight / 20;
const LEFT_PADDING = window.innerWidth / 25;
const SQUARE_HEIGHT = window.innerHeight / 25;
const SQUARE_WIDTH = window.innerHeight / 25;

class AbstractNode {
  symbol: number;
  probability: number;
  col: number;
  row: number;
  parents: Array<AbstractNode>;
  encoding: string;
  type: string;
  ctx: any;

  constructor(symbol: number, probability: number, col: number, row: number, parents: Array<AbstractNode>=[]) {
    this.symbol = symbol;
    this.probability = probability;
    this.col = col;
    this.row = row;
    this.parents = parents;
    this.encoding = "";
    this.type = "";
  }

  get getX() {
    return LEFT_PADDING + this.col * SQUARE_WIDTH * 4;
  }

  get getY() {
    return TOP_PADDING + this.row * SQUARE_HEIGHT * 2;
  }

  set canvas(canvas: any) {
    this.ctx = canvas.getContext("2d");
  }

  writeSymbol() {
    this.ctx.strokeStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.fillText(`S${this.symbol}`, this.getX - SQUARE_HEIGHT / 2, this.getY + SQUARE_HEIGHT / 2);
  }

  tracePath(parentIndex: number) {
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    this.ctx.lineTo(this.parents[parentIndex].getX + SQUARE_WIDTH, this.parents[parentIndex].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();
  }

  draw() {

  }

  drawLink() {

  }
}

class SquareNode extends AbstractNode {
  constructor(symbol: number, probability: number, col: number, row: number, parents: Array<AbstractNode>=[]) {
    super(symbol, probability, col, row, parents);
    this.type = "SquareNode";
  }

  draw() {
    this.ctx.fillStyle = "#375a7f";
    this.ctx.fillRect(this.getX, this.getY, SQUARE_WIDTH, SQUARE_HEIGHT);

    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(`${this.probability}`,
      this.getX + SQUARE_WIDTH / 2,
      this.getY + SQUARE_HEIGHT / 2);
  }

  drawLink() {
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([5, 3]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    this.ctx.lineTo(this.parents[0].getX + SQUARE_WIDTH, this.parents[0].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();
    this.ctx.setLineDash([0]);
  }
}

class CircleNode extends AbstractNode {
  constructor(symbol: number, probability: number, col: number, row: number, parents: Array<AbstractNode>=[]) {
    super(symbol, probability, col, row, parents);
    this.type = "CircleNode";
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.getX + SQUARE_WIDTH / 2, this.getY + SQUARE_HEIGHT / 2, SQUARE_WIDTH / 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#375a7f";
    this.ctx.fill();

    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(`${this.probability}`,
      this.getX + SQUARE_WIDTH / 2,
      this.getY + SQUARE_HEIGHT / 2);
  }

  drawLink() {
    this.ctx.strokeStyle = "white";

    for (let i = 0; i <= 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
      this.ctx.lineTo(this.parents[i].getX + SQUARE_WIDTH, this.parents[i].getY + SQUARE_HEIGHT / 2);
      this.ctx.stroke();
    }

    this.ctx.font = "18px Arial";
    this.ctx.fillText(0, this.getX - 5, this.getY + SQUARE_HEIGHT * 0.3);
    this.ctx.fillText(1, this.getX - 5, this.getY + SQUARE_HEIGHT);
  }
}

export default AbstractNode;
export { SquareNode, CircleNode };