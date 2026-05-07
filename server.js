const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/class', (req, res) => {
    const className = req.query.className || "MyClass";
    const classType = req.query.classType || "public class";
    const isExtended = req.query.isExtended === "true";
    const ParentClass = req.query.ParentClass || "";

    let code = "";

    if (isExtended && ParentClass) {
        code = `${classType} ${className} extends ${ParentClass}\n {`;
    } else {
        code = `${classType} ${className} {\n`;
    }


    res.render('class', {code});
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});