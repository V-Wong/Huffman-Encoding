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

  hasParent() {
    return this.parents.length !== 0;
  }

  writeSymbol(ctx: any) {
    ctx.strokeStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(`S${this.symbol}`, this.getX - SQUARE_HEIGHT / 2, this.getY + SQUARE_HEIGHT / 2);
  }

  tracePath(ctx: any, parentIndex: number) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    ctx.lineTo(this.parents[parentIndex].getX + SQUARE_WIDTH, this.parents[parentIndex].getY + SQUARE_HEIGHT / 2);
    ctx.stroke();
  }

  draw(ctx: any) {

  }

  drawLink(ctx: any) {

  }
}

class SquareNode extends AbstractNode {
  constructor(symbol: number, probability: number, col: number, row: number, parents: Array<AbstractNode>=[]) {
    super(symbol, probability, col, row, parents);
    this.type = "SquareNode";
  }

  draw(ctx: any) {
    ctx.fillStyle = "#375a7f";
    ctx.fillRect(this.getX, this.getY, SQUARE_WIDTH, SQUARE_HEIGHT);

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.probability}`,
      this.getX + SQUARE_WIDTH / 2,
      this.getY + SQUARE_HEIGHT / 2);
  }

  drawLink(ctx: any) {
    ctx.strokeStyle = "white";
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    ctx.lineTo(this.parents[0].getX + SQUARE_WIDTH, this.parents[0].getY + SQUARE_HEIGHT / 2);
    ctx.stroke();
    ctx.setLineDash([0]);
  }
}

class CircleNode extends AbstractNode {
  constructor(symbol: number, probability: number, col: number, row: number, parents: Array<AbstractNode>=[]) {
    super(symbol, probability, col, row, parents);
    this.type = "CircleNode";
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.arc(this.getX + SQUARE_WIDTH / 2, this.getY + SQUARE_HEIGHT / 2, SQUARE_WIDTH / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#375a7f";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.probability}`,
      this.getX + SQUARE_WIDTH / 2,
      this.getY + SQUARE_HEIGHT / 2);
  }

  drawLink(ctx: any) {
    ctx.strokeStyle = "white";

    for (let i = 0; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
      ctx.lineTo(this.parents[i].getX + SQUARE_WIDTH, this.parents[i].getY + SQUARE_HEIGHT / 2);
      ctx.stroke();
    }

    ctx.font = "18px Arial";
    ctx.fillText(0, this.getX - 5, this.getY + SQUARE_HEIGHT * 0.3);
    ctx.fillText(1, this.getX - 5, this.getY + SQUARE_HEIGHT);
  }
}

export default AbstractNode;
export { SquareNode, CircleNode };