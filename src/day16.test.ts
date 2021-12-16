import * as day from "./day16";
import * as util from "./util";

test("should parse literal", () => {
  let packet = day.fromString("D2FE28").readPacket();
  if (!day.isLiteral(packet)) throw "Not literal";
  expect(packet.version).toBe(6);
  expect(packet.ptype).toBe(day.PacketType.Literal);
  expect(packet.v).toBe(2021);
});

test("should parse operator", () => {
  let packet = day.fromString("38006F45291200").readPacket();
  expect(packet.version).toBe(1);
  expect(packet.ptype).toBe(day.PacketType.Operator);
});

test("should parse another operator", () => {
  let packet = day.fromString("EE00D40C823060").readPacket();
  expect(packet.version).toBe(7);
  expect(packet.ptype).toBe(day.PacketType.Operator);
});

test("should answer demo", () => {
  let n = day.solvea(day.fromString("C0015000016115A2E0802F182340"));
  expect(n).toBe(23);
});

test("should answer", () => {
  let n = day.solvea(day.fromString(util.slurp("data/day16.txt")));
  expect(n).toBe(821);
});
