import { Skill } from './Skill';

export const Skills = () =>{
    var ListOfSkills : Skill[] = [];
    let LocalStorageValue = window.localStorage.getItem("skilldata");
    if(typeof LocalStorageValue === "string"){
        ListOfSkills = JSON.parse(LocalStorageValue);
    }
    return ListOfSkills;
};