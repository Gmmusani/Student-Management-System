#! /usr/bin/env node

import inquirer from "inquirer";

let randomNumber: number = Math.floor(10000 + Math.random() * 80000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "students",
    type: "input",
    message: "Please enter student name:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return `please enter a non empty value.`;
    },
  },
  {
    name: "courses",
    type: "list",
    message: "please select the course to enroll:",
    choices: ["HTML", "CSS", "Javascript", "Typescript"],
  },
]);

interface TutionInterface {
    [key: string]: number;
}
const tutionFees: TutionInterface = {
    "HTML": 2000,
    "CSS": 3000,
    "Javascript": 4000,
    "Typescript": 5000,
};

console.log(`\n Tution Fees: ${tutionFees[answer.courses]}/=\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt (
    [
        {
            name: "payment",
            type: "list",
            message: "Select payment method:",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
        },
        {
            name: "amount",
            type: "input",
            message: "Please enter your amount:",
            validate: function(value){
                if(value.trim() !== ""){
                    return true;
                }
                return `please enter non empty value.`
            },
        }
    ]
)

console.log(`\nYou select payment method ${paymentType.payment}.\n`);

const tutionFee = tutionFees[answer.courses];

// parsefloat k zarie hmne string type data kw number me convert krdia.
// qk inquirer.prompt se jw b data ata he wo string hota he.
const paymentAmount = parseFloat(paymentType.amount);

if(tutionFee === paymentAmount){
    console.log(`Congratulaions, You have successfully enrolled in ${answer.courses}.\n`);

    let ans = await inquirer.prompt (
        [
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["Show status", "Exit"]
            }
        ]
    );

    if(ans.select === "Show status"){
        console.log("\n*******Status*******\n");
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student Id: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    } else {
        console.log(`Exiting Student Management System.`);    
    }

} else {
    console.log(`Invalid amount due to course.`);
};

