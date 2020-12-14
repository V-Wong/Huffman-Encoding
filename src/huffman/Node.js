const TOP_PADDING = window.innerHeight / 20;
const LEFT_PADDING = window.innerWidth / 25;
const SQUARE_HEIGHT = window.innerHeight / 25;
const SQUARE_WIDTH = window.innerHeight / 25;

class Node {
  constructor(symbol, probability, col, row, parent) {
    this.symbol = symbol;
    this.probability = probability;
    this.col = col;
    this.row = row;
    this.parent = parent;
    this.encoding = "";
  }
  get getX() {
    return LEFT_PADDING + this.col * SQUARE_WIDTH * 4;
  }
  get getY() {
    return TOP_PADDING + this.row * SQUARE_HEIGHT * 2;
  }
  set canvas(canvas) {
    this._canvas = canvas;
    this.ctx = this._canvas.getContext("2d");
  }
  writeSymbol() {
    this.ctx.strokeStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.fillText(`S${this.symbol}`, this.getX - SQUARE_HEIGHT / 2, this.getY + SQUARE_HEIGHT / 2);
  }
  tracePath(parent) {
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    this.ctx.lineTo(this.parent[parent].getX + SQUARE_WIDTH, this.parent[parent].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();
  }
}

class SquareNode extends Node {
  constructor(symbol, probability, col, row, parent) {
    super(symbol, probability, col, row, parent);
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
    this.ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();
    this.ctx.setLineDash([0]);
  }
}

class CircleNode extends Node {
  constructor(symbol, probability, col, row, parent) {
    super(symbol, probability, col, row, parent);
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

    this.ctx.beginPath();
    this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    this.ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT / 2);
    this.ctx.lineTo(this.parent[1].getX + SQUARE_WIDTH, this.parent[1].getY + SQUARE_HEIGHT / 2);
    this.ctx.stroke();

    this.ctx.font = "18px Arial";
    this.ctx.fillText(0, this.getX - 5, this.getY + SQUARE_HEIGHT * 0.3);
    this.ctx.fillText(1, this.getX - 5, this.getY + SQUARE_HEIGHT);
  }
}

export default Node;
export { SquareNode, CircleNode };