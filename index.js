const axios=require('axios');
function myGetRequest()
{
    axios
    .get("http://clist.by/get/events/")
    .then((response) => {
     findMyevents(response.data);
    }).catch((error)=>{
        if(error){
            console.log("Error occurred!!!",error.message);
        }
        console.log(error.config);
    });
}
function findMyevents(events){
    parseMyEvent(events);
    findArgs(process.argv);
}
function parseMyEvent(eventArr){
    for(event of eventArr){
        let startDate = new Date(event.start);
        let endDate = new Date(event.end);
        let currentDate = new Date();
        if(currentDate<endDate && currentDate >=startDate){
            myRunningEvents.push(event);
        }
        else if(currentDate >=endDate){
            myPastEvents.push(event);
        }
        else if(currentDate<startDate){
            myUpcomingEvents.push(event);
        }

    }
}
let myRunningEvents=[];
let myPastEvents=[];
let myUpcomingEvents=[];

function findArgs(argsArr){
    let x=argsArr[2];
    switch(x){
        case "past":
            console.log(`*****Past events count:***** ${myPastEvents.length}`);
            console.log(myPastEvents);
            break;

        case "present":
            console.log(`*****Present events count:***** ${myRunningEvents.length}`);
            console.log(myRunningEvents);
            break;
        case "future":
            console.log(`*****Future events count:*****${myUpcomingEvents.length}`);
            console.log(myUpcomingEvents);
            break;
        default:
            console.log("Error!!! Please type only past,present or future");
    }
}
myGetRequest();