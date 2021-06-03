import { Employee } from './employee';

export const Employees = () => {
    var EmployeesList : Employee[] = [];
    let LocalStorageValue = window.localStorage.getItem("data");
    
    if(typeof LocalStorageValue === "string"){
        EmployeesList = JSON.parse(LocalStorageValue);
    }

    return EmployeesList;

  
}