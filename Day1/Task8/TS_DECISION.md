# TypeScript Decisions

## Strict Options

- `noImplicitAny`: Prevents variables or parameters from becoming `any` automatically.
- `strictNullChecks`: Makes us check for `null` or `undefined` before using a value.
- `strictFunctionTypes`: Checks that function parameter types are compatible.
- `noUncheckedIndexedAccess`: Makes array access include `undefined`, so we check that the item exists.

## Why

These options help catch common bugs at compile time and make the code safer.
