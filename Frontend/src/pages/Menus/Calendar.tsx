import { useState } from "react";
import { BsCalendar, BsPlusCircleDotted } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import MenuTitle from "../../components/MenuTitle";
import DarkButton from "../../components/DarkButton";
import { Event } from "../../data/types";

import { useSelector } from "react-redux";
// import { addEvent, deleteEvent } from "../../redux/calendarSlice";
import { RootState } from "../../redux/store";

function Calendar() {
  const events = useSelector((state: RootState) => state.calendar.events);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState({} as Event);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString("pt-BR", { month: "long" });
  };

  const changeMonth = (delta: number) => {
    if (month + delta < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (month + delta > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + delta);
    }
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent({} as Event);
  };

  const selectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen">
      <MenuTitle icon={<BsCalendar />} title="Calendário">
        {/* <DarkButton
          icon={<BsPlusCircleDotted className="w-6 h-6 text-gray-700" />}
          text="Novo Evento"
        /> */}
        <>
        </>
      </MenuTitle>
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-3/4 bg-white border-r">
          {/* Cabeçalho do calendário */}
          <div className="flex flex-row items-center justify-between p-4 border-b h-16">
            <button onClick={() => changeMonth(-1)}>
              <AiOutlineArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold text-gray-700">
              {getMonthName(month)} {year}
            </h2>

            <button onClick={() => changeMonth(1)}>
              <AiOutlineArrowRight className="w-6 h-6 text-gray-700 hover:text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 p-4">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
              <div key={index} className="text-center text-gray-500">
                {day}
              </div>
            ))}

            {Array(getFirstDayOfMonth(month, year))
              .fill(null)
              .map((_, i) => (
                <div key={i} className="h-16"></div>
              ))}

            {Array(getDaysInMonth(month, year))
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={`h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-all ${selectedDate.getDate() === i + 1 &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year
                    ? "bg-blue-100 border border-blue-300 hover:bg-blue-200"
                    : ""
                    }`}
                  onClick={() => selectDate(new Date(year, month, i + 1))}
                >
                  <span className="text-gray-700">{i + 1}</span>

                  <div className="flex flex-row gap-1 mt-1">
                    {events
                      .filter(
                        (event) =>
                          event.date.getDate() === i + 1 &&
                          event.date.getMonth() === month &&
                          event.date.getFullYear() === year
                      )
                      .map((event) => {
                        let colorClass = "";
                        // * Só essas cores são permitidas
                        // * Tenho que fazer isso pois o Tailwind não aceita variáveis no className
                        switch (event.color) {
                          case "blue":
                            colorClass = "bg-blue-500";
                            break;
                          case "green":
                            colorClass = "bg-green-500";
                            break;
                          case "yellow":
                            colorClass = "bg-yellow-500";
                            break;
                          default:
                            colorClass = "bg-red-500";
                        }
                        return (
                          <div
                            key={`${event.id}-${event.date}`}
                            className={`w-2 h-2 rounded-full ${colorClass}`}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Lista de eventos pra data selecionada */}
        <div className="flex flex-col w-1/4 bg-gray-50">
          {/* Cabeçalho */}
          <div className="flex flex-row items-center justify-between p-4 border-b h-16">
            <h3 className="text-lg font-semibold text-gray-700">
              {selectedDate.toLocaleDateString()}
            </h3>
              <DarkButton
                className="hidden lg:inline-flex"
                icon={<BsPlusCircleDotted className="w-6 h-6 p-0 m-0 text-gray-700" />}
                text="Novo Evento"
              />
          </div>
          {/* Corpo */}
          <div className="flex flex-col gap-2 p-4 overflow-y-auto">
            {events.length > 0 ? (
              events
                .filter(
                  (event) =>
                    event.date.getDate() === selectedDate.getDate() &&
                    event.date.getMonth() === selectedDate.getMonth() &&
                    event.date.getFullYear() === selectedDate.getFullYear()
                )
                .map((event) => (
                  // Evento renderizado dentro da lista
                  <div
                    key={event.id}
                    className={`flex flex-row items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-blue-100 border transition-all ${selectedEvent && selectedEvent.id === event.id
                        ? `border-blue-300 bg-blue-100 hover:bg-blue-200`
                        : ""
                      }`}
                    onClick={() => selectEvent(event)}
                  >
                    <span className="text-gray-700">
                      {/* Renderiza cor do evento */}
                      <div
                        className={`w-2 h-2 ml-1 rounded-full bg-${(() => {
                            switch (event.color) {
                              case "blue":
                                return "blue-500";
                              case "green":
                                return "green-500";
                              case "yellow":
                                return "yellow-500";
                              default:
                                return "red-500";
                            }
                          })()
                          } inline-block mr-5`}
                      />
                      {event.title}
                    </span>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500">Nenhum evento</div>
            )}
          </div>
        </div>
      </div>
      {/* Modal - Futuramente*/}
    </div>
  );
}

export default Calendar;
