(function () {
  'use strict';

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const calGrid = document.getElementById('calGrid');
  const calMonthLabel = document.getElementById('calMonthLabel');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  const timesPanel = document.getElementById('timesPanel');
  const timesSlots = document.getElementById('timesSlots');
  const timesDateLabel = document.getElementById('timesDateLabel');
  const timesEmpty = document.getElementById('timesEmpty');
  const confirmPanel = document.getElementById('confirmPanel');
  const confirmBack = document.getElementById('confirmBack');
  const confirmSummary = document.getElementById('confirmSummary');
  const successPanel = document.getElementById('successPanel');
  const successText = document.getElementById('successText');
  const bookingForm = document.getElementById('bookingForm');
  const bookingStatus = document.getElementById('bookingStatus');
  const bookAgain = document.getElementById('bookAgain');
  const timezoneEl = document.getElementById('bookingTimezone');
  const format12h = document.getElementById('format12h');
  const format24h = document.getElementById('format24h');

  if (!calGrid) return;

  const today = startOfDay(new Date());
  let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDate = null;
  let selectedTime = null;
  let use24h = false;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneEl.textContent = tz.replace(/_/g, '/');
  } catch {
    timezoneEl.textContent = 'Local time';
  }

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function isWeekday(d) {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  function isAvailable(d) {
    if (d < today) return false;
    if (!isWeekday(d)) return false;
    return true;
  }

  function formatDateLong(d) {
    return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  }

  function formatDateShort(d) {
    const day = String(d.getDate()).padStart(2, '0');
    return `${DAYS_SHORT[d.getDay()]} ${day}`;
  }

  function formatTime12(t) {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'pm' : 'am';
    const hour = h % 12 || 12;
    const mins = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
    return `${hour}${mins}${ampm}`;
  }

  function formatTime24(t) {
    return t;
  }

  function formatTime(t) {
    return use24h ? formatTime24(t) : formatTime12(t);
  }

  function updateTimeFormat(is24h) {
    use24h = is24h;
    format12h.classList.toggle('time-format-btn--active', !is24h);
    format24h.classList.toggle('time-format-btn--active', is24h);
    if (selectedDate) renderTimeSlots();
  }

  format12h.addEventListener('click', () => updateTimeFormat(false));
  format24h.addEventListener('click', () => updateTimeFormat(true));

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    calMonthLabel.textContent = `${MONTHS[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    calPrev.disabled = viewDate <= minMonth;
    calNext.disabled = viewDate >= maxMonth;

    calGrid.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('span');
      empty.className = 'cal-day cal-day--empty';
      empty.setAttribute('aria-hidden', 'true');
      calGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = day;
      btn.setAttribute('role', 'gridcell');

      const isToday = date.getTime() === today.getTime();
      const available = isAvailable(date);

      if (isToday) btn.classList.add('cal-day--today');

      if (available) {
        btn.classList.add('cal-day--available');
        btn.setAttribute('aria-label', formatDateLong(date));
        btn.addEventListener('click', () => selectDate(date, btn));
      } else {
        btn.classList.add('cal-day--disabled');
        btn.disabled = true;
      }

      if (selectedDate && date.getTime() === selectedDate.getTime()) {
        btn.classList.add('cal-day--selected');
      }

      calGrid.appendChild(btn);
    }
  }

  function selectDate(date, btn) {
    selectedDate = date;
    selectedTime = null;

    calGrid.querySelectorAll('.cal-day--selected').forEach((el) => {
      el.classList.remove('cal-day--selected');
    });
    btn.classList.add('cal-day--selected');

    timesDateLabel.textContent = formatDateShort(date);
    renderTimeSlots();
    timesPanel.hidden = false;
    confirmPanel.hidden = true;
    successPanel.hidden = true;
    timesEmpty.hidden = true;
    timesSlots.hidden = false;
  }

  function renderTimeSlots() {
    timesSlots.innerHTML = '';

    TIME_SLOTS.forEach((time) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot';
      btn.textContent = formatTime(time);
      btn.setAttribute('role', 'option');
      btn.addEventListener('click', () => selectTime(time));
      timesSlots.appendChild(btn);
    });
  }

  function selectTime(time) {
    selectedTime = time;
    confirmSummary.textContent = `${formatDateLong(selectedDate)} · ${formatTime(time)}`;
    timesPanel.hidden = true;
    confirmPanel.hidden = false;
    successPanel.hidden = true;
    bookingStatus.textContent = '';
  }

  function showTimes() {
    timesPanel.hidden = false;
    confirmPanel.hidden = true;
    successPanel.hidden = true;
  }

  function findFirstAvailable() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (isAvailable(date)) return date;
    }
    return null;
  }

  calPrev.addEventListener('click', () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  confirmBack.addEventListener('click', showTimes);

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingStatus.className = 'form-status form-status--dark';
    bookingStatus.textContent = '';

    const name = bookingForm.name.value.trim();
    const email = bookingForm.email.value.trim();
    const notes = bookingForm.notes.value.trim();

    if (!name || !email) {
      bookingStatus.className = 'form-status form-status--dark error';
      bookingStatus.textContent = 'Please fill in your name and email.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      bookingStatus.className = 'form-status form-status--dark error';
      bookingStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    const subject = encodeURIComponent(`Discovery call — ${formatDateLong(selectedDate)} ${formatTime(selectedTime)}`);
    const body = encodeURIComponent(
      `Booking request\n\nName: ${name}\nEmail: ${email}\nDate: ${formatDateLong(selectedDate)}\nTime: ${formatTime(selectedTime)}\n\nNotes:\n${notes || '(none)'}`
    );
    window.location.href = `mailto:hello@ermili.dev?subject=${subject}&body=${body}`;

    confirmPanel.hidden = true;
    successPanel.hidden = false;
    successText.textContent = `Thanks, ${name}! Your call is set for ${formatDateLong(selectedDate)} at ${formatTime(selectedTime)}. Check your email for confirmation.`;
    bookingForm.reset();
  });

  bookAgain.addEventListener('click', () => {
    selectedDate = null;
    selectedTime = null;
    successPanel.hidden = true;
    confirmPanel.hidden = true;
    timesPanel.hidden = false;
    timesDateLabel.textContent = 'Select a date';
    timesSlots.innerHTML = '';
    timesSlots.hidden = true;
    timesEmpty.hidden = false;
    bookingForm.reset();
    renderCalendar();

    const first = findFirstAvailable();
    if (first) {
      const btn = [...calGrid.querySelectorAll('.cal-day--available')].find(
        (el) => Number(el.textContent) === first.getDate()
      );
      if (btn) selectDate(first, btn);
    }
  });

  renderCalendar();

  const firstAvailable = findFirstAvailable();
  if (firstAvailable) {
    const btn = [...calGrid.querySelectorAll('.cal-day--available')].find(
      (el) => Number(el.textContent) === firstAvailable.getDate()
    );
    if (btn) selectDate(firstAvailable, btn);
  } else {
    timesSlots.hidden = true;
    timesEmpty.hidden = false;
  }
})();
