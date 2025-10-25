import Card from "../components/shared/Card";

const page = () => {
  const cards = [
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
    {
      title: "Card Title",
      description:
        "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
      tag: "javascript",
    },
  ];

  return (
    <div className="container">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center py-5 md:py-10">
        {cards.map((item, index) => (
          <Card key={index} cardData={item} />
        ))}
      </section>
    </div>
  );
};

export default page;
