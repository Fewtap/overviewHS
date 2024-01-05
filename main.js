const fs = require("fs");
const moment = require("moment");

const arrivalIndex = 5;
const departureIndex = 7;
const amountofnightsindex = 6;

let visits = [];

async function main() {
  const data = (await fs.promises.readFile("overview.txt", "utf8")).trim();

  let rows = data.split("\n");
  rows = rows.slice(1);
  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split("\t");
    let arrival = moment(columns[arrivalIndex], "DD-MM-YYYY").format(
      "DD/MM/YYYY"
    );
    let departure = moment(columns[departureIndex], "DD-MM-YYYY").format(
      "DD/MM/YYYY"
    );
    let amountofnights = columns[amountofnightsindex];

    visits.push({
      arrival,
      departure,
      amountofnights,
    });
  }

  let output = "Ankomst\tAvreise\tAntal netter\n";
  for (let i = 0; i < visits.length; i++) {
    const visit = visits[i];
    output += `${visit.arrival}\t${visit.departure}\t${visit.amountofnights}\n`;
  }

  await fs.promises.writeFile("output.txt", output);
}

main();
