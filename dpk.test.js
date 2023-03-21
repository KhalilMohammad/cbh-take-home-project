const { deterministicPartitionKey } = require("./dpk");
const { createHash } = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Small partitionKey should return stringify partitionKey", () => {
    const partitionKey = {
      id: 1,
    };
    const trivialKey = deterministicPartitionKey({
      partitionKey,
    });
    expect(trivialKey).toBe(JSON.stringify(partitionKey));
  });

  it("Small partitionKey with strignified partitionKey should return stringify partitionKey", () => {
    const partitionKey = {
      id: 1,
    };
    const trivialKey = deterministicPartitionKey({
      partitionKey: JSON.stringify(partitionKey),
    });
    expect(trivialKey).toBe(JSON.stringify(partitionKey));
  });

  it("Large partitionKey should return Sha3-512 hash of partitionKey", () => {
    const partitionKey = {
      id: "9RoIeVL8CmEojkd1zmnZTctOYdF33Ued7g339hcBbQ1ZbC44SiRmXGiIHDCYXaHSXlgoctuAiEXKYudeDJNgRaTjg5iCGEi4rCTR6brKHxsR5woiOE29jxlzbNUkLznlUJAy5XEYPE6mlRxhbRdZFiX3OtO9VJT5nyvpSVFvflID7fCZcSo1MgAf7HrIH5zXekHraEU1ux0C7AjmXyrCLa4UqeeJTVK6vyX1Zk7Z93rzeHEDoN3xZQiOYhwRAYfd",
    };
    const trivialKey = deterministicPartitionKey({
      partitionKey,
    });

    expect(trivialKey).toBe(
      createHash("sha3-512").update(JSON.stringify(partitionKey)).digest("hex")
    );
  });

  it("Large partitionKey with stringified partitionKey should return Sha3-512 hash of partitionKey", () => {
    const partitionKey = {
      id: "9RoIeVL8CmEojkd1zmnZTctOYdF33Ued7g339hcBbQ1ZbC44SiRmXGiIHDCYXaHSXlgoctuAiEXKYudeDJNgRaTjg5iCGEi4rCTR6brKHxsR5woiOE29jxlzbNUkLznlUJAy5XEYPE6mlRxhbRdZFiX3OtO9VJT5nyvpSVFvflID7fCZcSo1MgAf7HrIH5zXekHraEU1ux0C7AjmXyrCLa4UqeeJTVK6vyX1Zk7Z93rzeHEDoN3xZQiOYhwRAYfd",
    };
    const trivialKey = deterministicPartitionKey({
      partitionKey: JSON.stringify(partitionKey),
    });

    expect(trivialKey).toBe(
      createHash("sha3-512").update(JSON.stringify(partitionKey)).digest("hex")
    );
  });

  it("Event without partitionKey return Sha3-512 hash of event", () => {
    const event = {
      id: 1,
    };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(
      createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    );
  });

  it("Large Event without partitionKey return Sha3-512 hash of event", () => {
    const event = {
      id: "9RoIeVL8CmEojkd1zmnZTctOYdF33Ued7g339hcBbQ1ZbC44SiRmXGiIHDCYXaHSXlgoctuAiEXKYudeDJNgRaTjg5iCGEi4rCTR6brKHxsR5woiOE29jxlzbNUkLznlUJAy5XEYPE6mlRxhbRdZFiX3OtO9VJT5nyvpSVFvflID7fCZcSo1MgAf7HrIH5zXekHraEU1ux0C7AjmXyrCLa4UqeeJTVK6vyX1Zk7Z93rzeHEDoN3xZQiOYhwRAYfd",
    };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(
      createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    );
  });
});
