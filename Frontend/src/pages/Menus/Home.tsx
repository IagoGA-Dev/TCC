import Card from "../../components/Card";
import Chart from "../../components/Graph";
import { FaChartBar } from "react-icons/fa";
import { cardData, graphData } from "../../data";

function CardList() {
  return (
    <div className="flex flex-row gap-6">
      {cardData.map((card) => (
        <Card Icon={card.Icon} title={card.title} important={card.important}>
          {card.children}
        </Card>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col flex-1 bg-gray-100 p-6 gap-6">
      <CardList />
      <Card Icon={FaChartBar} title="Gráfico de interações">
        <Chart data={graphData} widthP={100} height={300} />
      </Card>
    </div>
  );
}

export default Home;
