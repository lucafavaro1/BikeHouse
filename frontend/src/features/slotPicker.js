//functions for calendar functionality in specialist appointment

//function to set valid time slots
const timeSlotValidator = (slotTime) => {
  const isValid =
    slotTime.getDay() > 0 &&
    slotTime.getDay() < 6 &&
    slotTime.getHours() > 8 &&
    slotTime.getHours() < 19;
  return isValid;
};

//function to create ICS time from dateTime
const setICSTime = (slotTime) => {
  return [
    slotTime.getFullYear(),
    slotTime.getMonth() + 1,
    slotTime.getDate(),
    slotTime.getHours(),
    slotTime.getMinutes(),
  ];
};

//function to create a new ICS file
const createICS = (dateTime, user) => {
  const ics = require("ics");
  const { error, value } = ics.createEvent({
    productId: "BikeHouse",
    method: "REQUEST",
    start: setICSTime(dateTime),
    duration: { hours: 1 },
    description: `Ask your doubts to a BikeHouse specialist`,
    // url: 'http://www.bikehouse.com/',
    title: `Talk to BikeHouse Specialist`,
    organizer: { name: "Specialist", email: "bikehouse.feedback@gmail.com" },
    attendees: [
      {
        name: user.name,
        email: user.email,
        rsvp: true,
        partstat: "NEED-ACTIONS",
        role: "REQ-PARTICIPANT",
      },
      // { name: 'Brittany Seaton', email: 'brittany@example2.org', rsvp: true, partstat: 'NEED-ACTIONS', role: 'OPT-PARTICIPANT' }
    ],
  });
  if (error) {
    console.log(error);
    return;
  }
  return value;
};

export { timeSlotValidator, createICS };
