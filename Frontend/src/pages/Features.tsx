import Navbar from "../components/Navbar";
import Calendar from "../assets/calendar.svg";

function FeatureItem(props: { Children: React.ReactNode; image: string; left: boolean }) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center">
        <img src={props.image} alt="feature" className="w-1/2" />
      </div>
      <div className="flex flex-col items-center justify-center">
        {props.Children}
      </div>
    </div>
  );
}

function Features() {

  const featureItems = [
    {
      image: Calendar,
      left: true,
      children: (
        <>Um calendário personalizado para organizar suas tarefas, provas e compromissos. 
        Além de poder marcar reuniões presenciais com seus colegas!</>
      ),
    },
  ];

  return (
    <div className="py-9">
      <Navbar activeItem="features" />
      <div className="px-6 md:px-40 py-15 md:py-15 text-center items-center">
        <div className="m-14">
          <h1 className="font-merriweather font-bold text-3xl md:text-4xl">
            Funcionalidades 
          </h1>
          <div className="pt-10">
            <span className="">
              <b>NomeTemp</b> oferece uma enorme variedade de funcionalidades para auxiliar nos seus estudos!
              Aqui estão alguma das funcionalidades oferecidas pela plataforma:
            </span>

            <div className="flex-col gap-10 pt-10">
              {featureItems.map((item) => (
                <FeatureItem
                  image={item.image}
                  left={item.left}
                  Children={item.children}
                />
              ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
