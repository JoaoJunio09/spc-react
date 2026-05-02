import useCalendary from "../hooks/useCalendary";

type CalendaryModalProps = {
  onClose: () => void;
  massesDates?: string[] | null;
  onSelectDate?: (date: string) => void;
};

function CalendaryModal({
  onClose,
  massesDates = [],
  onSelectDate,
}: CalendaryModalProps) {
  const {
    currentMonthLabel,
    daysOfMonth,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendary({ massesDates });

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleSelectDay(dateString: string | null) {
    if (!dateString) return;

    if (onSelectDate) {
      onSelectDate(dateString);
    }

    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{currentMonthLabel}</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="month-grid-header">
          <span>Dom</span>
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
        </div>

        <div className="month-grid">
          {daysOfMonth.map((day, index) => (
            <div
              key={day.dateString ?? `empty-${index}`}
              className={`month-day ${day.isMass ? "missa" : ""} ${day.day === null ? "empty-day" : ""}`}
              data-date={day.dateString ?? ""}
              style={{ cursor: day.day ? "pointer" : "default" }}
              onClick={() => handleSelectDay(day.dateString)}
            >
              {day.day && <p>{day.day}</p>}
            </div>
          ))}
        </div>

        <div className="nextAndPreviousMonth">
          <button className="btn-nav-month" onClick={goToPreviousMonth}>
            &lt; Anterior
          </button>
          <button className="btn-nav-month" onClick={goToNextMonth}>
            Próximo &gt;
          </button>
        </div>

        <div className="modal-footer">
          <div className="legend">
            <div className="legend-item">
              <span className="circle verde"></span>
              Missa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendaryModal;