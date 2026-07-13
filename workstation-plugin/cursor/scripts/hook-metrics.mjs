export function extractPath(input) {
  const raw = input.tool_input ?? input.arguments ?? input;
  let ti = raw;
  if (typeof ti === "string") {
    try {
      ti = JSON.parse(ti);
    } catch {
      return undefined;
    }
  }
  if (!ti || typeof ti !== "object") return undefined;
  const path = ti.path ?? ti.file_path ?? ti.target_file ?? ti.filePath ?? ti.file;
  return path ? String(path).slice(0, 300) : undefined;
}

export function outputBytes(input) {
  const raw = input.result ?? input.output ?? input.tool_output ?? input;
  try {
    return Math.min(JSON.stringify(raw).length, 999999);
  } catch {
    return 0;
  }
}

export function enrichToolPayload(input) {
  return {
    ...input,
    path: extractPath(input),
    output_bytes: outputBytes(input),
  };
}
