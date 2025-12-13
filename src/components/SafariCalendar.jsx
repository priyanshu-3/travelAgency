import { useState } from 'react';
import './SafariCalendar.css';

const SafariCalendar = ({ selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const isDateAvailable = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Minimum 2 days advance booking
        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 2);

        // Maximum 90 days advance booking
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 90);

        return date >= minDate && date <= maxDate;
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDateClick = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (isDateAvailable(date)) {
            onDateSelect(date);
        }
    };

    const renderCalendar = () => {
        const days = daysInMonth(currentMonth, currentYear);
        const firstDay = firstDayOfMonth(currentMonth, currentYear);
        const calendarDays = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Actual days
        for (let day = 1; day <= days; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isAvailable = isDateAvailable(date);
            const isSelected = selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

            calendarDays.push(
                <div
                    key={day}
                    className={`calendar-day ${isAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="safari-calendar">
            <div className="calendar-header">
                <button className="calendar-nav" onClick={handlePrevMonth}>‹</button>
                <h3>{months[currentMonth]} {currentYear}</h3>
                <button className="calendar-nav" onClick={handleNextMonth}>›</button>
            </div>

            <div className="calendar-weekdays">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
            </div>

            <div className="calendar-grid">
                {renderCalendar()}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <span className="legend-color available"></span>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color unavailable"></span>
                    <span>Not Available</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color selected"></span>
                    <span>Selected</span>
                </div>
            </div>
        </div>
    );
};

export default SafariCalendar;
