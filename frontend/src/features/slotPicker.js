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

const createICS = (dateTime) => {
  const ics = require('ics')
  // console.log(dateTime)
  const { error, value } = ics.createEvent(
    {
      title: `Talk to BikeHouse Specialist`,
      start: setICSTime(dateTime),
      productId: 'BikeHouse',
      duration: {hours: 1},
      description: 
          `Ask your doubts to a BikeHouse specialist`,
      // url: 'http://www.bikehouse.com/',
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