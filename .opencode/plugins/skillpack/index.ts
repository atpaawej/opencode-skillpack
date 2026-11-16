// Development harness: OpenCode loads local plugins from `.opencode/plugins/<name>/`, so this shim
// points at the real source. Consumers get the same entry through the package `exports` field.
export { default } from "../../../src/index.ts"
