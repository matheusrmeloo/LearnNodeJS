const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' }
]

router.get('/', (req, res) => {
    res.send(courses);
    console.log(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Id não encontrado');
    else res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    console.log(courses);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(200).send({ course });
});

router.put(`/:id`, (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Id não encontrado');

    const { error } = validateCourse(req.body);
    if (error) {
       return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
    console.log(courses);

});

router.delete(`/:id`, (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        return res.status(404).send('Id não encontrado');
    };

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
    console.log(course);
    console.log(courses);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(course, schema);

}

module.exports = router;