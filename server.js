'use strict';

const express = require('express');
const hbs = require('hbs');
const compression = require('compression');
const helmet = require('helmet');

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(compression());
app.use(helmet());

app.get('/widget/:uniId/:courseId/small', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/:uniId/:courseId/small/:optional1', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/:uniId/:courseId/small/:optional1/:optional2', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/:uniId/:courseId/:optional1/small/', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/:uniId/:courseId/:optional1/small/:optional2', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/:uniId/:courseId/:optional1/small/:optional2/:optional3', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/widget/embed-script', (req, res) => {
    res.sendFile('public/widget.js', { root: __dirname });
});

app.get('/widget/embed-script.js', (req, res) => {
    res.sendFile('public/widget.js', { root: __dirname });
});

app.get('/Widget/:uniId/:courseId/small', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/:uniId/:courseId/small/:optional1', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/:uniId/:courseId/small/:optional1/:optional2', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/:uniId/:courseId/:optional1/small/', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/:uniId/:courseId/:optional1/small/:optional2', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/:uniId/:courseId/:optional1/small/:optional2/:optional3', (req, res) => {
    res.render('iframe', processParams(req.params));
});

app.get('/Widget/embed-script', (req, res) => {
    res.sendFile('public/widget.js', { root: __dirname });
});

app.get('/Widget/embed-script.js', (req, res) => {
    res.sendFile('public/widget.js', { root: __dirname });
});

function processParams(params) {
    var optional_params = [params.optional1, params.optional2, params.optional3]
    var orientation = 'vertical';
    var language = 'en-GB';
    var kis_mode = 'FullTime';

    optional_params.forEach(function(param) {
        if (param) {
            if (param.toLowerCase() === 'horizontal' || param.toLowerCase() === 'vertical' || param.toLowerCase() === 'responsive') {
                orientation = param.toLowerCase();
            }
            if (param.toLowerCase() === 'en-gb' || param.toLowerCase() === 'cy-gb') {
                language = param;
            }
            if (param.toLowerCase() === 'fulltime' || param.toLowerCase() === 'parttime') {
                kis_mode = param
            }
        }
    });

    return { uni: params.uniId, course: params.courseId, mode: kis_mode, orientation: orientation, language: language };
}

app.listen(PORT, HOST);
