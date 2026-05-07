const test = require('node:test');
const assert = require('node:assert/strict');
const { generateJavaClass } = require('../src/generateJavaClass');

test('generates java class with fields and main method', () => {
  const code = generateJavaClass('Person', [
    { name: 'name', type: 'String' },
    { name: 'age', type: 'int' },
  ]);

  assert.match(code, /public class Person/);
  assert.match(code, /private String name;/);
  assert.match(code, /private int age;/);
  assert.match(code, /public Person\(String name, int age\)/);
  assert.match(
    code,
    /return "Person\{" \+ "name='" \+ name \+ "'" \+ ", " \+ "age=" \+ age \+ "\}";/,
  );
  assert.match(code, /Person object = new Person\("example", 0\);/);
  assert.match(code, /System\.out\.println\(object\);/);
});

test('throws when class name is empty', () => {
  assert.throws(() => generateJavaClass('', []), /Class name is required/);
});
