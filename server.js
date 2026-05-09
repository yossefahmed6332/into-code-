const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});



function generateCode(req) {

    const className = req.query.className || "MyClass";

    const classType = req.query.classType || "public class";

    const isExtended = req.query.isExtended === "true";

    const ParentClass = req.query.ParentClass || "";

    let code = "";



    if (isExtended && ParentClass) {

        code = `${classType} ${className} extends ${ParentClass} {\n`;

    } else {

        code = `${classType} ${className} {\n`;

    }



    code += getAttributes(req);



    code += `\n}`;

    return code;
}



function getAttributes(req) {

    const attributes = [].concat(req.query.attributes || []);

    const conditions = [].concat(req.query.condition || []);

    let text = "";



    for (let i = 0; i < attributes.length; i++) {

        text += `    ${conditions[i]} ${attributes[i]};\n`;

    }



    return text;
}



app.get('/class', (req, res) => {

    const generatedCode = generateCode(req);

    res.render('class', { code: generatedCode });

});



app.listen(3000, () => {

    console.log('server is running successfully');

    console.log('http://localhost:3000');

});