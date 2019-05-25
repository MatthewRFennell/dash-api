module.exports = {
  info: (string) => console.log(`\x1b[36m  [info]\x1b[0m ${string}`),
  warn: (string) => console.log(`\x1b[33m  [warn]\x1b[0m ${string}`),
  error: (string) => console.log(`\x1b[31m [error]\x1b[0m ${string}`),
}
