const common = `
    --require setup/assertions.js
    --require setup/hooks.js
    --require step-definitions/**/*.step
`

module.exports = {
    default: `${common} features/**/*.feature`
}