const timeSlotValidator = (slotTime) => {
  const isValid = slotTime.getDay() > 0 &&
                slotTime.getDay() < 6 &&
                slotTime.getHours() > 8 && 
                slotTime.getHours() < 19;
return isValid;
};

const setICSTime = (slotTime) => {
  return [
    slotTime.getFullYear(),
    slotTime.getMonth() + 1 ,
    slotTime.getDate(),
    slotTime.getHours(),
    slotTime.getMinutes()
  ];
};

const createICS = (dateTime, user) => {
  const ics = require('ics')
  // console.log(dateTime)
  const { error, value } = ics.createEvent(
    {
      productId: 'BikeHouse',
      method: "REQUEST",
      start: setICSTime(dateTime),
      duration: {hours: 1},
      description: 
      `Ask your doubts to a BikeHouse specialist`,
      // url: 'http://www.bikehouse.com/',
      title: `Talk to BikeHouse Specialist`,
      organizer: { name: 'Specialist', email: 'bikehouse.feedback@gmail.com' },
      attendees: [
        { name: user.name, email: user.email, rsvp: true, partstat: 'NEED-ACTIONS', role: 'REQ-PARTICIPANT' },
        // { name: 'Brittany Seaton', email: 'brittany@example2.org', rsvp: true, partstat: 'NEED-ACTIONS', role: 'OPT-PARTICIPANT' }
      ],
    }
  )
  if (error) {
    console.log(error)
    return
  }
  console.log(value)
  return value;
};

export {timeSlotValidator, createICS};