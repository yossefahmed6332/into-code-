const DEFAULT_VALUES = {
  String: '"example"',
  int: '0',
  double: '0.0',
  boolean: 'false',
  long: '0L',
  float: '0.0f',
  char: "'a'",
};

function getDefaultValue(type) {
  return DEFAULT_VALUES[type] ?? 'null';
}

function generateJavaClass(className, attributes) {
  if (!className || !className.trim()) {
    throw new Error('Class name is required.');
  }

  const cleanAttributes = attributes.filter(
    (attribute) => attribute.name && attribute.type,
  );

  const fieldLines = cleanAttributes.map(
    ({ type, name }) => `    private ${type} ${name};`,
  );

  const constructorParams = cleanAttributes
    .map(({ type, name }) => `${type} ${name}`)
    .join(', ');

  const constructorAssignments = cleanAttributes.map(
    ({ name }) => `        this.${name} = ${name};`,
  );

  const summaryParts = cleanAttributes.map(({ name, type }) =>
    type === 'String'
      ? `"${name}='" + ${name} + "'"`
      : `"${name}=" + ${name}`,
  );

  const constructorCall = cleanAttributes
    .map(({ type }) => getDefaultValue(type))
    .join(', ');

  const constructorBody = constructorAssignments.length
    ? constructorAssignments.join('\n')
    : '        // no attributes';

  const toStringBody = summaryParts.length
    ? `        return "${className}{" + ${summaryParts.join(' + ", " + ')} + "}";`
    : `        return "${className}{}";`;

  const constructorDefinition = `    public ${className}(${constructorParams}) {\n${constructorBody}\n    }`;

  const mainBody = cleanAttributes.length
    ? `        ${className} object = new ${className}(${constructorCall});`
    : `        ${className} object = new ${className}();`;

  return [
    `public class ${className} {`,
    ...fieldLines,
    fieldLines.length ? '' : null,
    constructorDefinition,
    '',
    '    @Override',
    '    public String toString() {',
    toStringBody,
    '    }',
    '',
    '    public static void main(String[] args) {',
    mainBody,
    '        System.out.println(object);',
    '    }',
    '}',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

module.exports = {
  generateJavaClass,
};
