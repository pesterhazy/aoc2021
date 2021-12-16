interface Packet {
  version: number;
}

class Reader {
  s: string;
  pos: number;

  constructor(s: string) {
    this.s = s;
    this.pos = 0;
  }

  readBitsAsNumber(n: number): number {
    let ss = this.s.slice(this.pos, this.pos + n);
    return parseInt(ss, 2);
  }

  readPacket(): Packet {
    let version = this.readBitsAsNumber(3);

    return { version };
  }
}

export function fromString(s: string): Reader {
  let ss = "";
  for (let i = 0; i < s.length; i++) {
    ss += parseInt(s[i], 16).toString(2);
  }
  return new Reader(ss);
}
