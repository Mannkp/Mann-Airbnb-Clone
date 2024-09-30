function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 md:py-24">
      <h2 className="text-3xl font-semibold text-center font-mono text-red-400 pb-8">
        About Me
      </h2>
      <h3 className="text-2xl py-4 font-semibold">I am 'Mannkumar Pandya'.</h3>
      <p className="text-xl">
        This project is created to explore&nbsp;
        <span className="underline decoration-red-400">
          Next.js pages router
        </span>
        &nbsp;along with&nbsp;
        <span className="underline decoration-red-400">Tailwind CSS</span>&nbsp;
        and&nbsp;
        <span className="underline decoration-red-400">Typescript</span>.
      </p>
      <h4 className="pt-6 text-xl font-mono text-red-400">
        Packages/Libraries used:
      </h4>
      <ul>
        <li>Splide.js</li>
        <li>React Slick Slider</li>
        <li>react-date-range</li>
        <li>React Leaflet</li>
        <li>React-top-loading-bar</li>
        <li>react-hook-form</li>
        <li>tailwind-scrollbar-hide</li>
      </ul>
      <h5 className="pt-6 text-lg font-mono text-red-400">Hooks used:</h5>
      <ul>
        <li>useState</li>
        <li>useEffect</li>
        <li>useMemo</li>
        <li>useCallback</li>
        <li>useContext</li>
        <li>useRef</li>
        <li>useForm</li>
        <li>useRouter</li>
        <li>useSearchParams</li>
      </ul>
    </div>
  );
}

export default AboutPage;
