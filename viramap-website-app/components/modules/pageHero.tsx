//components/modules/pageHero.tsx
type PageHeroProps = {
  title: string;
  description: string;
};

function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="container mt-6">
      <div className="card max-lg:p-6 lg:h-96 glassy-card f-center flex-col gap-6">
        <h1 className="heading">{title}</h1>
        <p className="text-center typhography lg:w-3/4">{description}</p>
      </div>
    </div>
  );
}

export default PageHero;

