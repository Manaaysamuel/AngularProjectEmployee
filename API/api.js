var Db  = require('./dboperations');
var Employee = require('./Employee');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/getEmployees').get((request,response)=>{

    dboperations.getEmployees().then(result => {
       response.json(result[0]);
    })

})

router.route('/getEmployee/:id').get((request,response)=>{

    dboperations.getEmployee(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.route('/addEmployee').post((request,response)=>{

    let employee = {...request.body}

    dboperations.addEmployee(employee).then(result => {
       response.status(201).json(result);
    })

})




var port = process.env.PORT || 3000;
app.listen(port);
console.log('Employee API is runnning at ' + port);



