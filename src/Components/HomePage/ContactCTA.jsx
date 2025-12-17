const ContactCTA = () => {
  return (
    <section className="bg-indigo-700 text-white py-16 text-center">
      <h2 className="text-3xl font-semibold">Ready to Get Started?</h2>
      <p className="mt-3">Contact us or start managing your assets today.</p>
      <a
        href="/register-hr"
        className="btn bg-indigo-300 mt-6 hover:bg-indigo-400 transition"
      >
        Start Now
      </a>
    </section>
  );
};

export default ContactCTA;
