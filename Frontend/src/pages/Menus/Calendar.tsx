//TODO: Melhorar posteriormente o sombreamento da sidebar nessa página...
//TODO: Investigar o erro importunante do React sobre chave única no console.
import { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import MenuTitle from "../../components/MenuTitle";
import DarkButton from "../../components/DarkButton";
import { eventData } from "../../data";
import { Event } from "../../data/types";

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const [events] = useState(eventData);

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

  const selectEvent = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Cabeçalho */}
      <MenuTitle icon={<BsCalendar />} title="Calendário">
        <DarkButton
          icon={<AiOutlinePlus />}
          text="Novo evento"
          onClick={() => {}}
        />
      </MenuTitle>
      {/* Corpo */}
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-3/4 bg-white border-r">
          {/* Cabeçalho do calendário */}
          <div className="flex flex-row items-center justify-between p-4 border-b">
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
          {/* Corpo do calendário */}
          <div className="grid grid-cols-7 gap-1 p-4">
            {/* Renderizando os dias da semana */}
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
              <div key={day} className="text-center text-gray-500">
                {day}
              </div>
            ))}

            {/* Renderizando os dias do mês */}
            {/* Insere dias vazios no início do mês */}
            {Array(getFirstDayOfMonth(month, year))
              .fill(null)
              .map((_, i) => (
                <div key={i} className="h-16"></div>
              ))}

            {/* Insere os dias restantes */}
            {Array(getDaysInMonth(month, year))
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={`h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-all ${
                    selectedDate.getDate() === i + 1 &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year
                      ? "bg-blue-100 border border-blue-300 hover:bg-blue-200"
                      : ""
                  }`}
                  onClick={() => selectDate(new Date(year, month, i + 1))}
                >
                  {/* Número do dia */}
                  <span className="text-gray-700">{i + 1}</span>

                  {/* Renderiza um ponto para cada dia que possuí um evento */}
                  {/* Pode ser que haja um problema caso haja mais que 1 evento no mesmo dia */}
                  <div className="flex flex-row gap-1 mt-1">
                    {events
                      .filter(
                        (event) =>
                          event.date.getDate() === i + 1 &&
                          event.date.getMonth() === month &&
                          event.date.getFullYear() === year
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`w-2 h-2 rounded-full bg-${event.color}-500`}
                        ></div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Lista de eventos pra data selecionada */}
        <div className="flex flex-col w-1/4 bg-gray-50">
          {/* Cabeçalho */}
          <h3 className="text-lg font-semibold text-gray-700 p-4 border-b">
            {selectedDate.toLocaleDateString()}
          </h3>
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
                    className={`flex flex-row items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-blue-100 border transition-all ${ 
                      selectedEvent && selectedEvent.id === event.id
                        ? `border-blue-300 bg-blue-100 hover:bg-blue-200`
                        : ""
                    }`}
                    onClick={() => selectEvent(event)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${event.color}`}
                    ></div>
                    <span className="text-gray-700">
                      {/* Renderiza cor do evento */}
                      <div className={`w-2 h-2 rounded-full bg-${event.color}-500 inline-block mr-5`} />
                      {event.title}</span>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500">
                Nenhum evento
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal - Futuramente*/}
    </div>
  );
}

export default Calendar;
