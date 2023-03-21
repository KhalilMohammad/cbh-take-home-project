const { createHash } = require("crypto");

const deterministicPartitionKey = (event) => {
  let candidate;

  // Check for empty event and simply return TRIVIAL_PARTITION_KEY if empty
  if (event) {
    // Check for partitionKey
    if (event.partitionKey) {
      candidate = handlePartitionKey(event.partitionKey);
    } else {
      // If there is no partitionKey, we are always creating hash of event so we simplify the logic
      const data = JSON.stringify(event);
      candidate = createHash("sha3-512").update(data).digest("hex");
    }

    return candidate;
  }

  // return TRIVIAL_PARTITION_KEY for empty events
  return "0";
};

// Extract PartitionKey Logic to seperate function
function handlePartitionKey(candidate) {
  const MAX_PARTITION_KEY_LENGTH = 256;

  // Canidate is always going to be non string for events without partitionKey
  // as we were creating hash first for non partitionKey events
  // so we can simplify logic by only checking this for partitionKey events
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // for events without partitionKey
  // as we are creating hash
  // Sha3-512 hex hash always has length of 128
  // so we can simplify logic by moving this check for partitionKey
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
}

exports.deterministicPartitionKey = deterministicPartitionKey;
