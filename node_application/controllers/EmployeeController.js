
class EmployeeController {
    async EmployeeInsert(params, token) {
        		try {
        			let request = dbc.pool.request()
        				.input(`FirstName`, params.FirstName)
        				.input(`LastName`, params.LastName)
        				.input(`Birthdate`, params.Birthdate)
        
        			let response = await request.execute('usp_api_EmployeeInsert');
        
        			if (global.GetLengthResponse(response) > 0) {
        				let res = global.resultparams(1, "Successfully Saved!", 200);
        				return res;
        			}
        			else
        				return global.resultparams(false, "Invalid.", 400);
        		}
        		catch (err) {
        			Log.error(err.message);
        			return global.resultparams(0, err.message, 500);
        		}
        	}
        
       
}

module.exports = {EmployeeController};



// const sql = require('mssql');
// const { param } = require('../routes/EmployeeRoute');


// class EmployeeController {
// 	constructor() { }


// 	//insert
// 	async EmployeeInsert(params, token) {
// 		try {
// 			let request = dbc.pool.request()
// 				.input(`FirstName`, params.FirstName)
// 				.input(`LastName`, params.LastName)
// 				.input(`Birthdate`, params.Birthdate)

// 			let response = await request.execute('usp_api_EmployeeInsert');

// 			if (global.GetLengthResponse(response) > 0) {
// 				let res = global.resultparams(1, "Successfully Saved!", 200);
// 				return res;
// 			}
// 			else
// 				return global.resultparams(false, "Invalid.", 400);
// 		}
// 		catch (err) {
// 			Log.error(err.message);
// 			return global.resultparams(0, err.message, 500);
// 		}
// 	}



	
// }

// module.exports = EmployeeController