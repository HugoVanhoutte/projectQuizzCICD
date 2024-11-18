const sum = require('../routes/testSum')

test('adds 1 to 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4)
})