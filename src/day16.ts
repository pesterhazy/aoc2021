interface Packet {
  version: number;
  typeID: number;
  v: number;
}

class Reader {
  s: string;
  pos: number;

  constructor(s: string) {
    this.s = s;
    this.pos = 0;
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

      return { version, typeID, v };
    } else if (typeID === 6) {
      let lengthTypeID = this.readBitsAsNumber(1);

      if (lengthTypeID !== 0) throw "Unexpected lengthTypeID";

      let length = this.readBitsAsNumber(15);
      this.readBits(length); // skip

      return { version, typeID, v: -999 /*FIXME*/ };
    } else throw "Unexpected typeID";
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
