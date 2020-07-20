import Award, { addActivity } from '~/ajax/activity';
import { List } from 'antd/lib/form/Form';

const createActivityEvent = document.getElementById('sendNow');



let awardList = new Array();




createActivityEvent.addEventListener('click', function () {
   
    const nameList = document.getElementsByClassName('awardName');
    const probabilityList = document.getElementsByClassName('mui-input-numbox');
    for (let i in nameList){
        if(nameList[i].value!=undefined&&probabilityList[i]!=undefined) {
            let award =new Award(nameList[i].value,probabilityList[i].value);
            awardList[i] = award;       
      }     
    }
    
    const title=localStorage.getItem('title');
    const details=localStorage.getItem('details');
    console.log(title);
    console.log(details);
    console.log(awardList);
    addActivity(title,details,awardList);

    
         

  

   

})

