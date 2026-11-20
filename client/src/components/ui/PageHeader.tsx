interface PageHeaderProps {
    title: string
    description: string
  }
  
  function PageHeader({ title, description }: PageHeaderProps) {
    return (
      <header className="bg-mint px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink/70">{description}</p>
      </header>
    )
  }
  
  export default PageHeader