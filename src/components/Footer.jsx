export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto p-6 text-sm text-neutral-400 text-center">
        © {new Date().getFullYear()} Esteticcar Automotores
      </div>
    </footer>
  );
}
