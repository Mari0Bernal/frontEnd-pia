import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <Header />
      <main className="flex items-center justify-center flex-grow container mx-auto py-6 px-4 md:px-8 space-y-6">
        <section
          className={`py-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-lg mb-8`}
        >
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className={"text-3xl md:text-4xl font-bold mb-4 text-white"}>
              About PokéTCG Market
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:px-8 lg:px-12">
              Page made it exclusively for educational purposes, using the {""}
              <a
                href="https://pokemontcg.io/"
                className="text-yellow-300 hover:text-yellow-400 underline"
              >
                Pokémon TCG API
              </a>
              . <br />
              This project is not affiliated with or endorsed by The Pokémon
              Company.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
