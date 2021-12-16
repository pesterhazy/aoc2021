import * as day from "./day16";
import * as util from "./util";

test("should give demo answer", () => {
  let packet = day.fromString("D2FE28").readPacket();
  expect(packet.version).toBe(6);
});
