export enum PacketType {
  Literal,
  Operator
}

interface LiteralPacket {
  version: number;
  typeID: number;
  ptype: PacketType.Literal;
  v: number;
}

export function isLiteral(p: Packet): p is LiteralPacket {
  return p.ptype === PacketType.Literal;
}

export function isOperator(p: Packet): p is OperatorPacket {
  return p.ptype === PacketType.Operator;
}

interface OperatorPacket {
  version: number;
  typeID: number;
  ptype: PacketType.Operator;
  children: Packet[];
}

type Packet = LiteralPacket | OperatorPacket;

class Reader {
  s: string;
  pos: number;

  constructor(s: string) {
    this.s = s;
    this.pos = 0;
  }

  eof(): boolean {
    if (this.pos >= this.s.length) return true;

    for (let i = this.pos; i < this.s.length; i++)
      if (this.s[i] !== "0") return false;
    // all trailing zeros
    return true;
  }

  readBits(n: number): string {
    if (this.pos + n > this.s.length) throw "Unexpected EOF";

    let ss = this.s.slice(this.pos, this.pos + n);
    this.pos += n;
    return ss;
  }

  readBitsAsNumber(n: number): number {
    if (this.pos + n > this.s.length) throw "Unexpected EOF";

    let ss = this.s.slice(this.pos, this.pos + n);
    this.pos += n;
    return parseInt(ss, 2);
  }

  readPacket(): Packet {
    let version = this.readBitsAsNumber(3);
    let typeID = this.readBitsAsNumber(3);

    if (typeID === 4) {
      let bits: string = "";
      while (this.readBitsAsNumber(1) === 1) {
        bits += this.readBits(4);
      }
      bits += this.readBits(4);
      let v = parseInt(bits, 2);

      return { ptype: PacketType.Literal, version, typeID, v };
    } else {
      let lengthTypeID = this.readBitsAsNumber(1);
      let children: Packet[] = [];

      if (lengthTypeID === 0) {
        let length = this.readBitsAsNumber(15);
        let start = this.pos;
        while (this.pos < start + length) {
          children.push(this.readPacket());
        }
      } else if (lengthTypeID === 1) {
        let nsub = this.readBitsAsNumber(11);
        for (let n = 0; n < nsub; n++) {
          children.push(this.readPacket());
        }
      } else throw "Unexpected lengthTypeID";

      return { ptype: PacketType.Operator, version, typeID, children };
    }
  }
}

export function fromString(s: string): Reader {
  let ss = "";
  for (let i = 0; i < s.length; i++) {
    ss += parseInt(s[i], 16)
      .toString(2)
      .padStart(4, "0");
  }
  return new Reader(ss);
}

function walk(packet: Packet): number {
  let ans = packet.version;
  if (isOperator(packet)) {
    for (let child of packet.children) {
      ans += walk(child);
    }
  }

  return ans;
}

export function solvea(reader: Reader): number {
  let ans = 0;
  while (!reader.eof()) {
    let packet = reader.readPacket();
    ans += walk(packet);
  }
  return ans;
}
