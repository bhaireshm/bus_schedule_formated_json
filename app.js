const fs = require("fs");
const path = require("path");

const filePath =
  // "C:\\Users\\bhair\\OneDrive - Aritha Consulting Services\\Projects\\Cargo-Flo\\BusScheduleData.json";
  "./BusScheduleData.json";

const busboardingdroppingtimes = require("./busboardingdroppingtimes.json");

var fileData = require(filePath); // fs.readFileSync(path.join(__dirname, filePath), "utf-8");
// fileData = JSON.parse(fileData);
const Schedule_Response = fileData.Schedule_Response;
const Boarding_DroppingTimes = fileData.Boarding_DroppingTimes;
const outputData = [];

// console.log(fileData);
// console.log(Schedule_Response);
// console.log(Boarding_DroppingTimes);

Schedule_Response.forEach((sr, i) => {
  // console.log(sr);
  const depTimes = sr.departureTimes.split("::");
  const dropTimes = sr.droppingTimes.split("::");
  sr.travelDate = new Date(sr.travelDate);
  sr.cargoWeight = +sr.cargoWeight;
  sr.cargoVolume = +sr.cargoVolume;
  sr.mode = "ROAD";
  sr.busFlightID = sr.busId;
  sr.src = sr.sourcePlace;
  sr.dest = sr.destinationPlace;

  delete sr.busId;
  delete sr.sourcePlace;
  delete sr.destinationPlace;

  sr.departureTimes = depTimes.map(
    (a) => Boarding_DroppingTimes.filter((bd) => bd.departureDropTimesId == a)[0]
  );
  sr.droppingTimes = dropTimes.map(
    (b) => Boarding_DroppingTimes.filter((bd) => bd.departureDropTimesId == b)[0]
  );

  // sr.departureTimes = [];
  // sr.droppingTimes = [];
  // depTimes.forEach((a) =>
  //   sr.departureTimes.push(
  //     busboardingdroppingtimes.filter((bd) => +bd.departureDropTimesId == +a)[0]._id.$oid
  //   )
  // );
  // dropTimes.forEach((b) =>
  //   sr.droppingTimes.push(
  //     busboardingdroppingtimes.filter((bd) => +bd.departureDropTimesId == +b)[0]._id.$oid
  //   )
  // );

  outputData.push(sr);
});
fs.writeFileSync("./busSchedule.json", JSON.stringify(outputData), "utf-8");
