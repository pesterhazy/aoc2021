import * as day from "./day16";
import * as util from "./util";

test("should parse literal", () => {
  let packet = day.fromString("D2FE28").readPacket();
  expect(packet.version).toBe(6);
  expect(packet.typeID).toBe(day.PacketType.Literal);
  expect(packet.v).toBe(2021);
});

test("should parse operator", () => {
  let packet = day.fromString("38006F45291200").readPacket();
  expect(packet.version).toBe(1);
  expect(packet.typeID).toBe(day.PacketType.Operator);
});
