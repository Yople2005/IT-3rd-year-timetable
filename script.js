// Timetable Data
const timetable = [
  { day: 'Monday', time: '9:00 AM', subject: 'Eng', type: 'Lecture' },
  { day: 'Monday', time: '11:00 AM', subject: 'Java', type: 'Lab' },
  { day: 'Monday', time: '1:00 PM', subject: 'Java', type: 'Lab' },
  { day: 'Monday', time: '2:00 PM', subject: 'DS', type: 'Lecture' },

  { day: 'Tuesday', time: '9:00 AM', subject: 'CN', type: 'Lecture' },
  { day: 'Tuesday', time: '11:00 AM', subject: 'DBMS', type: 'Lecture' },
  { day: 'Tuesday', time: '1:00 PM', subject: 'Eng', type: 'Lecture' },
  { day: 'Tuesday', time: '2:00 PM', subject: 'Maths', type: 'Lecture' },

  { day: 'Wednesday', time: '9:00 AM', subject: 'DBMS', type: 'Lecture' },
  { day: 'Wednesday', time: '11:00 AM', subject: 'Maths', type: 'Lecture' },
  { day: 'Wednesday', time: '1:00 PM', subject: 'DBMS', type: 'Lecture' },
  { day: 'Wednesday', time: '2:00 PM', subject: 'Java', type: 'Lecture' },

  { day: 'Thursday', time: '9:00 AM', subject: 'Maths', type: 'Lecture' },
  { day: 'Thursday', time: '11:00 AM', subject: 'CN', type: 'Lecture' },
  { day: 'Thursday', time: '1:00 PM', subject: 'CN', type: 'Lecture' },
  { day: 'Thursday', time: '2:00 PM', subject: 'Web', type: 'Lab' },

  { day: 'Friday', time: '9:00 AM', subject: 'Web', type: 'Lab' },
  { day: 'Friday', time: '11:00 AM', subject: 'Library', type: '-' },
  { day: 'Friday', time: '1:00 PM', subject: 'Library', type: '-' },
  { day: 'Friday', time: '2:00 PM', subject: 'DS', type: 'Lecture' },
];


// Display Next Class or Day's Classes
const nextClassElement = document.getElementById("next-class");
const now = dayjs();
const todayIndex = now.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

let message = "";

// Helper function to get all classes for a specific day
function getClassesForDay(dayName) {
  const classes = timetable.filter(item => item.day === dayName);
  if (classes.length === 0) {
    return "No classes scheduled.";
  }
  return classes
    .map(item => `${item.time}: ${item.subject} (${item.type})`)
    .join("<br>");
}

// Weekend Logic
if (todayIndex === 6 || todayIndex === 0) {
  // Saturday or Sunday
  if (todayIndex === 6) {
    message = "It's the weekend! No classes today.";
  } else if (todayIndex === 0) {
    message = "It's Sunday! Here's your schedule for Monday:<br>" + getClassesForDay("Monday");
  }
} else {
  // Weekday Logic
  const todayName = now.format("dddd");
  const classesToday = timetable.filter(item => item.day === todayName);

  if (classesToday.length === 0) {
    // No classes scheduled today
    message = "No classes scheduled today.";
  } else {
    // Check if all classes for today are over
    const remainingClasses = classesToday.filter(item => {
      const classTime = dayjs(`${item.day} ${item.time}`, "dddd h:mm A");
      return classTime.isAfter(now);
    });

    if (remainingClasses.length > 0) {
      // Classes are still remaining for today
      message = "Classes for today:<br>" + classesToday
        .map(item => `${item.time}: ${item.subject} (${item.type})`)
        .join("<br>") + "<br><br>Remaining classes:<br>" + remainingClasses
        .map(item => `${item.time}: ${item.subject} (${item.type})`)
        .join("<br>");
    } else {
      // All classes are over, display all classes for today and the next day's classes
      message = "All classes are over for today.<br>Here's your schedule for tomorrow:<br>";
      const nextDayIndex = (todayIndex + 1) % 7; // Get the next day's index
      const nextDayName = dayjs().day(nextDayIndex).format("dddd");
      message += getClassesForDay(nextDayName);
    }
  }
}

// Display the message
nextClassElement.innerHTML = message;


    // Set Reminder
    function setReminder() {
      const reminderTime = document.getElementById('reminder-time').value;
      if (reminderTime) {
        const time = dayjs(reminderTime);
        const msg = `Reminder set for ${time.format('dddd, MMM D, h:mm A')}`;
        document.getElementById('reminder-msg').textContent = msg;
        alert(msg);
      } else {
        alert("Please select a time!");
      }
    }
